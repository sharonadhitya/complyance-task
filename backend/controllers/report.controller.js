const ROIService = require('../services/roi.service');

class ReportController {
  static async generateReport(req, res, next) {
    try {
      const { email, scenario_data } = req.body;
      
      const results = ROIService.calculateROI(scenario_data);
      const htmlReport = ROIService.generateHTMLReport(scenario_data, results, email);
      
      // TODO: Save email to database for lead tracking in production
      
      res.json({ 
        success: true, 
        report: htmlReport,
        message: 'Report generated successfully',
        lead_captured: email
      });
    } catch (error) {
      next(error);
    }
  }

  static async getReportHistory(req, res, next) {
    try {
      // In a real application, you'd fetch from a reports table
      // For now, return empty array
      res.json({ 
        success: true, 
        reports: [],
        message: 'Report history feature coming soon'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;