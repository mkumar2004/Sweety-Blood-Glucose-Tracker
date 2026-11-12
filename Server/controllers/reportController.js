
const { pool } = require('../config/db');

// Validate selected date
const validateDate = (date) => {
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }

    const [year, month, day] = date.split('-').map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));

    return (
        parsed.getUTCFullYear() === year &&
        parsed.getUTCMonth() === month - 1 &&
        parsed.getUTCDate() === day
    );
};

// Add days to a date
const addDays = (date, days) => {
    const result = new Date(`${date}T00:00:00.000Z`);
    result.setUTCDate(result.getUTCDate() + days);
    return result.toISOString().slice(0, 10);
};

// Common report function
const generateReport = async (
    userId,
    startDate,
    endDate,
    includeReadings = false
) => {
    const statsResult = await pool.query(
        `SELECT
            MAX(value) AS highest,
            MIN(value) AS lowest,
            ROUND(AVG(value), 1) AS average,
            COUNT(*) AS total_readings
         FROM glucose_readings
         WHERE user_id = $1
         AND reading_date >= $2::date
         AND reading_date < $3::date`,
        [userId, startDate, endDate]
    );

    const stats = statsResult.rows[0];

    // Query readings list (ordered chronologically by date and slot)
    const readingsResult = await pool.query(
        `SELECT id, reading_date, time_slot, value, created_at
         FROM glucose_readings
         WHERE user_id = $1
         AND reading_date >= $2::date
         AND reading_date < $3::date
         ORDER BY reading_date ASC,
            CASE time_slot
                WHEN 'morning' THEN 1
                WHEN 'after_breakfast' THEN 2
                WHEN 'after_lunch' THEN 3
                WHEN 'after_dinner' THEN 4
            END`,
        [userId, startDate, endDate]
    );

    return {
        highest: stats.highest,
        lowest: stats.lowest,
        average: stats.average,
        totalReadings: Number(stats.total_readings),
        readings: readingsResult.rows
    };
};

// DAILY REPORT
const getDailyReport = async (req, res) => {
    try {
        const { date } = req.query;

        if (!validateDate(date)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid date (YYYY-MM-DD).'
            });
        }

        const report = await generateReport(
            req.user.userId,
            date,
            addDays(date, 1),
            true
        );

        return res.status(200).json({
            success: true,
            reportType: 'daily',
            date,
            ...report
        });

    } catch (error) {
        console.error('Daily Report Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to generate daily report.'
        });
    }
};

// MONTH-TO-DATE REPORT
const getMonthToDateReport = async (req, res) => {
    try {
        const { date } = req.query;

        if (!validateDate(date)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid date (YYYY-MM-DD).'
            });
        }

        const startDate = `${date.slice(0, 7)}-01`;
        const endDate = addDays(date, 1);

        const report = await generateReport(
            req.user.userId,
            startDate,
            endDate
        );

        return res.status(200).json({
            success: true,
            reportType: 'month-to-date',
            startDate,
            endDate: date,
            ...report
        });

    } catch (error) {
        console.error('Month-to-date Report Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to generate month-to-date report.'
        });
    }
};

// PREVIOUS MONTH REPORT
const getMonthlyReport = async (req, res) => {
    try {
        const { date } = req.query;

        if (!validateDate(date)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid date (YYYY-MM-DD).'
            });
        }

        const selectedDate = new Date(`${date}T00:00:00.000Z`);

        const previousMonthEnd = new Date(Date.UTC(
            selectedDate.getUTCFullYear(),
            selectedDate.getUTCMonth(),
            1
        ));

        const previousMonthStart = new Date(Date.UTC(
            selectedDate.getUTCFullYear(),
            selectedDate.getUTCMonth() - 1,
            1
        ));

        const startDate = previousMonthStart.toISOString().slice(0, 10);
        const endDate = previousMonthEnd.toISOString().slice(0, 10);

        const report = await generateReport(
            req.user.userId,
            startDate,
            endDate
        );

        return res.status(200).json({
            success: true,
            reportType: 'monthly',
            startDate,
            endDate: addDays(endDate, -1),
            ...report
        });

    } catch (error) {
        console.error('Monthly Report Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Unable to generate monthly report.'
        });
    }
};

module.exports = {
    getDailyReport,
    getMonthToDateReport,
    getMonthlyReport
};
