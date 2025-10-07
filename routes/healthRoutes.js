const express = require('express');
const HealthController = require('../controllers/health.controller');

const router = express.Router();

// GET /api/health - Health check
router.get('/health', HealthController.checkHealth);

// GET /api/system - System information
router.get('/system', HealthController.getSystemInfo);

module.exports = router;