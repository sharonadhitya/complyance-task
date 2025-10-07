const express = require('express');
const simulationRoutes = require('./simulationRoutes');
const scenarioRoutes = require('./scenarioRoutes');
const reportRoutes = require('./reportRoutes');
const healthRoutes = require('./healthRoutes');

const router = express.Router();

// Mount all routes
router.use('/', simulationRoutes);
router.use('/', scenarioRoutes);
router.use('/', reportRoutes);
router.use('/', healthRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ROI Calculator API',
    version: '1.0.0',
    endpoints: {
      simulation: 'POST /api/simulate',
      scenarios: {
        list: 'GET /api/scenarios',
        get: 'GET /api/scenarios/:id',
        create: 'POST /api/scenarios',
        update: 'PUT /api/scenarios/:id',
        delete: 'DELETE /api/scenarios/:id'
      },
      reports: {
        generate: 'POST /api/report/generate',
        history: 'GET /api/report/history'
      },
      health: {
        check: 'GET /api/health',
        system: 'GET /api/system'
      }
    }
  });
});

module.exports = router;