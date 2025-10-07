const pool = require('../config/database');
const ROIService = require('../services/roi.service');

class ScenarioController {
  static async createScenario(req, res, next) {
    try {
      const results = ROIService.calculateROI(req.body);
      
      const query = `
        INSERT INTO scenarios (
          scenario_name, monthly_invoice_volume, num_ap_staff, avg_hours_per_invoice,
          hourly_wage, error_rate_manual, error_cost, time_horizon_months,
          one_time_implementation_cost, results
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `;
      
      const values = [
        req.body.scenario_name,
        req.body.monthly_invoice_volume,
        req.body.num_ap_staff,
        req.body.avg_hours_per_invoice,
        req.body.hourly_wage,
        req.body.error_rate_manual,
        req.body.error_cost,
        req.body.time_horizon_months,
        req.body.one_time_implementation_cost || 0,
        JSON.stringify(results)
      ];
      
      const result = await pool.query(query, values);
      
      res.status(201).json({ 
        success: true, 
        id: result.rows[0].id, 
        results 
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllScenarios(req, res, next) {
    try {
      const result = await pool.query('SELECT * FROM scenarios ORDER BY created_at DESC');
      
      res.json({ 
        success: true, 
        scenarios: result.rows 
      });
    } catch (error) {
      next(error);
    }
  }

  static async getScenarioById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM scenarios WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Scenario not found' 
        });
      }
      
      res.json({ 
        success: true, 
        scenario: result.rows[0] 
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteScenario(req, res, next) {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM scenarios WHERE id = $1 RETURNING id', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Scenario not found' 
        });
      }
      
      res.json({ 
        success: true, 
        message: 'Scenario deleted successfully' 
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateScenario(req, res, next) {
    try {
      const { id } = req.params;
      const results = ROIService.calculateROI(req.body);
      
      const query = `
        UPDATE scenarios SET
          scenario_name = $1,
          monthly_invoice_volume = $2,
          num_ap_staff = $3,
          avg_hours_per_invoice = $4,
          hourly_wage = $5,
          error_rate_manual = $6,
          error_cost = $7,
          time_horizon_months = $8,
          one_time_implementation_cost = $9,
          results = $10
        WHERE id = $11
        RETURNING *
      `;
      
      const values = [
        req.body.scenario_name,
        req.body.monthly_invoice_volume,
        req.body.num_ap_staff,
        req.body.avg_hours_per_invoice,
        req.body.hourly_wage,
        req.body.error_rate_manual,
        req.body.error_cost,
        req.body.time_horizon_months,
        req.body.one_time_implementation_cost || 0,
        JSON.stringify(results),
        id
      ];
      
      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Scenario not found' 
        });
      }
      
      res.json({ 
        success: true, 
        scenario: result.rows[0],
        results 
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ScenarioController;