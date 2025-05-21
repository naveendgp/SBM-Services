// filepath: /home/naveendgp/Desktop/Naveen/WebDev/Projects/SBM Services/Server/src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error("Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let status = err.status || "error";

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    status = "fail";
    const errors = Object.values(err.errors).map((val) => val.message);
    message = `Invalid input data: ${errors.join(", ")}`;
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    statusCode = 409;
    status = "fail";
    message = "Duplicate field value. Please use another value.";
  }

  // Handle JSON Web Token errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    status = "fail";
    message = "Invalid token. Please log in again.";
  }

  // Handle expired JWT
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    status = "fail";
    message = "Your session has expired. Please log in again.";
  }

  // Handle multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    status = "fail";
    message = "File too large. Maximum size is 10MB.";
  }

  res.status(statusCode).json({
    status,
    message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};

module.exports = errorHandler;
