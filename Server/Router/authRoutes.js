const express = require("express");
const router = express.Router();
const authController = require("../Controller/authController");

// Authentication routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected routes
router.use(authController.protect);
router.get("/me", authController.getMe);

module.exports = router;
