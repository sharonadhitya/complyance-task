const express = require('express');
const SimulationController = require('../controllers/simulation.controller');
const { validateSimulation } = require('../middlewares/validation.middleware');

const router = express.Router();

// POST /api/simulate - Run ROI simulation
router.post('/simulate', validateSimulation, SimulationController.simulate);

module.exports = router;