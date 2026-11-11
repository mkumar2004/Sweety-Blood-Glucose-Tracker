
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    createReading,
    getReadings,
    updateReading,
    deleteReading
} = require('../controllers/readingsController');


router.use(authMiddleware);

// Add glucose reading
router.post('/', createReading);

// Get all user readings
router.get('/', getReadings);

// Edit existing reading
router.put('/:id', updateReading);

// Remove reading
router.delete('/:id', deleteReading);

module.exports = router;