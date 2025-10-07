const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = { ...err };
  error.message = err.message;

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  // Database errors
  if (err.code === '23505') { // Duplicate key
    error = { message: 'Duplicate resource', statusCode: 400 };
  }

  if (err.code === '23503') { // Foreign key violation
    error = { message: 'Resource not found', statusCode: 404 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;