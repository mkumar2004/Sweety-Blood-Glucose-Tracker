
const { pool } = require('../config/db');

// Validate reading input
const validateReading = (date, timeSlot, value) => {
    const validSlots = [
        'morning',
        'after_breakfast',
        'after_lunch',
        'after_dinner'
    ];

    if (!date || !timeSlot || value === undefined || value === null || value === '') {
        return 'Date, time slot and glucose value are required.';
    }

    // Validate date format and actual calendar date
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return 'Invalid date format. Use YYYY-MM-DD.';
    }

    const [year, month, day] = date.split('-').map(Number);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    if (
        parsedDate.getUTCFullYear() !== year ||
        parsedDate.getUTCMonth() !== month - 1 ||
        parsedDate.getUTCDate() !== day
    ) {
        return 'Invalid date.';
    }

    // Prevent future dates using local date
    const now = new Date();
    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0')
    ].join('-');

    if (date > today) {
        return 'Date cannot be in the future.';
    }

    if (!validSlots.includes(timeSlot)) {
        return 'Invalid time slot.';
    }

    if (!Number.isInteger(value) || value < 40 || value > 600) {
        return 'Value must be between 40 and 600 mg/dl.';
    }

    return null;
};

// CREATE READING
const createReading = async (req, res) => {
    try {
        const { date, timeSlot, value } = req.body;
        const userId = req.user.userId;

        const validationError = validateReading(date, timeSlot, value);

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        const result = await pool.query(
            `INSERT INTO glucose_readings
             (user_id, reading_date, time_slot, value)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [userId, date, timeSlot, value]
        );

        return res.status(201).json({
            success: true,
            message: 'Glucose reading added successfully.',
            reading: result.rows[0]
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: `You already have an ${req.body.timeSlot} reading for this date.`
            });
        }

        console.error('Create Reading Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

// GET ALL READINGS (with optional pagination ?page=1&limit=20)
const getReadings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { page, limit } = req.query;

        // Base query with user filtering
        const baseQuery = `FROM glucose_readings WHERE user_id = $1`;

        // If pagination parameters are provided, apply LIMIT and OFFSET
        if (page !== undefined || limit !== undefined) {
            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
            const offset = (pageNum - 1) * limitNum;

            // Get total count for pagination metadata
            const countResult = await pool.query(
                `SELECT COUNT(*) AS total ${baseQuery}`,
                [userId]
            );
            const totalCount = parseInt(countResult.rows[0].total, 10);
            const totalPages = Math.max(1, Math.ceil(totalCount / limitNum));

            const result = await pool.query(
                `SELECT *
                 ${baseQuery}
                 ORDER BY reading_date DESC,
                          CASE time_slot
                              WHEN 'morning' THEN 1
                              WHEN 'after_breakfast' THEN 2
                              WHEN 'after_lunch' THEN 3
                              WHEN 'after_dinner' THEN 4
                          END
                 LIMIT $2 OFFSET $3`,
                [userId, limitNum, offset]
            );

            return res.status(200).json({
                success: true,
                count: result.rows.length,
                total: totalCount,
                page: pageNum,
                limit: limitNum,
                totalPages,
                readings: result.rows
            });
        }

        // Default: return all readings when no pagination params are sent
        const result = await pool.query(
            `SELECT *
             ${baseQuery}
             ORDER BY reading_date DESC,
                      CASE time_slot
                          WHEN 'morning' THEN 1
                          WHEN 'after_breakfast' THEN 2
                          WHEN 'after_lunch' THEN 3
                          WHEN 'after_dinner' THEN 4
                      END`,
            [userId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            readings: result.rows
        });

    } catch (error) {
        console.error('Get Readings Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

// UPDATE READING
const updateReading = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, timeSlot, value } = req.body;
        const userId = req.user.userId;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid reading ID.'
            });
        }

        const validationError = validateReading(date, timeSlot, value);

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            });
        }

        const result = await pool.query(
            `UPDATE glucose_readings
             SET reading_date = $1,
                 time_slot = $2,
                 value = $3,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $4 AND user_id = $5
             RETURNING *`,
            [date, timeSlot, value, Number(id), userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Reading not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Reading updated successfully.',
            reading: result.rows[0]
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: `You already have an ${req.body.timeSlot} reading for this date.`
            });
        }

        console.error('Update Reading Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

// DELETE READING
const deleteReading = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid reading ID.'
            });
        }

        const result = await pool.query(
            `DELETE FROM glucose_readings
             WHERE id = $1 AND user_id = $2
             RETURNING id`,
            [Number(id), userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Reading not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Reading deleted successfully.'
        });

    } catch (error) {
        console.error('Delete Reading Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = {
    createReading,
    getReadings,
    updateReading,
    deleteReading
};
