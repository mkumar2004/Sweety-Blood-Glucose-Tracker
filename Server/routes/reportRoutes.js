
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    getDailyReport,
    getMonthToDateReport,
    getMonthlyReport
} = require('../controllers/reportController');

router.use(authMiddleware);

// Daily report
router.get('/daily', getDailyReport);

// Month-to-date report
router.get('/month-to-date', getMonthToDateReport);

// Previous month report
router.get('/monthly', getMonthlyReport);

module.exports = router;
