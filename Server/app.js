const express = require("express");
const cors = require("cors");
const path = require("path");
const loanRoutes = require("./Router/LoanRoutes");
const authRoutes = require("./Router/authRoutes");
const adminRoutes = require("./Router/AdminRoutes");
const errorHandler = require("./middleware/errorHandler");

// Initialize app
const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/loans", loanRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "success", message: "Server is running" });
});

// Error handling middleware
app.use(errorHandler);

// Handle unhandled routes
app.use("/*w", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
