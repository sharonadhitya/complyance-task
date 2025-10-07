const pool = require('../config/database');

class HealthController {
  static async checkHealth(req, res, next) {
    try {
      // Check database connection
      await pool.query('SELECT 1');
      
      res.json({
        success: true,
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: 'Connected',
        environment: process.env.NODE_ENV || 'development'
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        status: 'Service Unavailable',
        timestamp: new Date().toISOString(),
        database: 'Disconnected',
        error: error.message
      });
    }
  }

  static async getSystemInfo(req, res, next) {
    try {
      const dbResult = await pool.query('SELECT version()');
      
      res.json({
        success: true,
        system: {
          node_version: process.version,
          platform: process.platform,
          uptime: process.uptime(),
          memory_usage: process.memoryUsage(),
          database_version: dbResult.rows[0].version
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HealthController;