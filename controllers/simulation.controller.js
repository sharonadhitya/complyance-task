const ROIService = require('../services/roi.service');

class SimulationController {
  static async simulate(req, res, next) {
    try {
      const results = ROIService.calculateROI(req.body);
      
      res.json({ 
        success: true, 
        results 
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SimulationController;