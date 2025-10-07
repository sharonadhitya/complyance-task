const express = require('express');
const ReportController = require('../controllers/report.controller');
const { validateReport } = require('../middlewares/validation.middleware');

const router = express.Router();

// POST /api/report/generate - Generate report with email
router.post('/report/generate', validateReport, ReportController.generateReport);

// GET /api/report/history - Get report generation history
router.get('/report/history', ReportController.getReportHistory);

module.exports = router;