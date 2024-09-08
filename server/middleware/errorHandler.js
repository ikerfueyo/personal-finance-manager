function errorHandler(err, req, res, next) {
    // Default error status and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    // Send error response
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
      }
    });
 }
 
  module.exports = errorHandler;
  