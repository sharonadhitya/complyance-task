const express = require('express');
const ScenarioController = require('../controllers/scenario.controller');
const { validateScenario } = require('../middlewares/validation.middleware');

const router = express.Router();

// GET /api/scenarios - Get all scenarios
router.get('/scenarios', ScenarioController.getAllScenarios);

// GET /api/scenarios/:id - Get scenario by ID
router.get('/scenarios/:id', ScenarioController.getScenarioById);

// POST /api/scenarios - Create new scenario
router.post('/scenarios', validateScenario, ScenarioController.createScenario);

// PUT /api/scenarios/:id - Update scenario
router.put('/scenarios/:id', validateScenario, ScenarioController.updateScenario);

// DELETE /api/scenarios/:id - Delete scenario
router.delete('/scenarios/:id', ScenarioController.deleteScenario);

module.exports = router;