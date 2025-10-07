const Joi = require('joi');

// Validation schemas
const simulationSchema = Joi.object({
  scenario_name: Joi.string().optional().allow(''),
  monthly_invoice_volume: Joi.number().integer().min(1).required(),
  num_ap_staff: Joi.number().integer().min(1).required(),
  avg_hours_per_invoice: Joi.number().min(0).required(),
  hourly_wage: Joi.number().min(0).required(),
  error_rate_manual: Joi.number().min(0).max(1).required(),
  error_cost: Joi.number().min(0).required(),
  time_horizon_months: Joi.number().integer().min(1).required(),
  one_time_implementation_cost: Joi.number().min(0).optional().default(0)
});

const scenarioSchema = simulationSchema.keys({
  scenario_name: Joi.string().required().min(1).max(255)
});

const reportSchema = Joi.object({
  email: Joi.string().email().required(),
  scenario_data: simulationSchema.required()
});

// Middleware functions
const validateSimulation = (req, res, next) => {
  const { error } = simulationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

const validateScenario = (req, res, next) => {
  const { error } = scenarioSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

const validateReport = (req, res, next) => {
  const { error } = reportSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  next();
};

module.exports = {
  validateSimulation,
  validateScenario,
  validateReport
};