const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const pool = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (production-ready)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api', routes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Initialize database
async function initDatabase() {
  try {
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
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await pool.end();
  process.exit(0);
});

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 ROI Calculator API running on port ${PORT}`);
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔗 API Documentation: http://localhost:${PORT}/api`);
    }
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});