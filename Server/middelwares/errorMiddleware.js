const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let Err = { ...err };
  err.message = err.message;

  // mongoose cast Error
  if (Err.name === "castError") {
    const message = "Resources Not Found";
    error = new errorResponse(message, 404);
  }

  // duplicate key error
  if (Err.code === 11000) {
    const message = "Duplicate field value enterd";
    error = new errorResponse(message, 404);
  }

  // mongoose validation
  if (Err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  }
};

module.exports = errorHandler;
