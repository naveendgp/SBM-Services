const express = require("express");
const router = express.Router();
const adminController = require("../Controller/AdminController");
const authController = require("../Controller/authController");
const loanController = require("../Controller/LoanController");

// Admin authentication routes
router.post("/auth/login", authController.adminLogin);
router.get("/auth/verify", authController.protect, authController.verifyToken);

// These routes require admin authentication
router.use(authController.protect);
router.use(authController.restrictTo("admin"));

// Dashboard routes
router.get("/dashboard/stats", adminController.getDashboardStats);

// Application routes
router.get("/applications", adminController.getApplications);
router.get("/applications/:id", loanController.getApplicationById);
router.put("/applications/:id/status", adminController.updateApplicationStatus);
router.post("/applications/:id/notes", adminController.addApplicationNote);

// Document routes
router.get(
  "/applications/:applicationId/documents/:documentId",
  adminController.getDocument
);
router.put(
  "/applications/:applicationId/documents/:documentId",
  adminController.updateDocumentStatus
);

// User management routes
router.get("/users", adminController.getUsers);
router.get("/users/:id", adminController.getUserById);

module.exports = router;
