const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Internal constants for ROI calculations
  CONSTANTS: {
    AUTOMATED_COST_PER_INVOICE: 0.20,
    ERROR_RATE_AUTO: 0.001, // 0.1%
    TIME_SAVED_PER_INVOICE: 8, // minutes
    MIN_ROI_BOOST_FACTOR: 1.1
  }
};