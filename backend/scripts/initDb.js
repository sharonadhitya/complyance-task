const pool = require('../config/database');
const ROIService = require('../services/roi.service');

async function initDatabase() {
    try {
        if (!process.env.DATABASE_URL) {
            console.error('❌ DATABASE_URL environment variable is not set!');
            return;
        }

        // Create scenarios table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS scenarios (
        id SERIAL PRIMARY KEY,
        scenario_name VARCHAR(255) NOT NULL,
        monthly_invoice_volume INTEGER NOT NULL,
        num_ap_staff INTEGER NOT NULL,
        avg_hours_per_invoice DECIMAL(4,3) NOT NULL,
        hourly_wage DECIMAL(8,2) NOT NULL,
        error_rate_manual DECIMAL(5,4) NOT NULL,
        error_cost DECIMAL(8,2) NOT NULL,
        time_horizon_months INTEGER NOT NULL,
        one_time_implementation_cost DECIMAL(10,2) DEFAULT 0,
        results JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

        console.log('Database initialized successfully!');

    } catch (error) {
        console.error('Database initialization error:', error);
    } finally {
        await pool.end();
    }
}



initDatabase();