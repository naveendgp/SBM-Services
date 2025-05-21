const express = require("express");
const router = express.Router();
const loanController = require("../Controller/LoanController");
const authController = require("../Controller/authController");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // limit to 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF, JPG, and PNG files are allowed."
        )
      );
    }
  },
});

// Define document upload fields
const documentFields = [
  { name: "identityProof", maxCount: 1 },
  { name: "addressProof", maxCount: 1 },
  { name: "incomeProof", maxCount: 1 },
  { name: "bankStatements", maxCount: 1 },
  { name: "propertyDocs", maxCount: 1 },
];

// Public routes
router.post(
  "/apply",
  upload.fields(documentFields),
  loanController.createLoanApplication
);

// Add this route for document uploads
router.post(
  "/:id/documents",
  upload.fields(documentFields),
  loanController.uploadDocuments
);

// Add a debug route to test file uploads
router.post("/test-upload", upload.single("testFile"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File received:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer ? "Buffer exists" : "No buffer",
    });

    res.status(200).json({
      status: "success",
      message: "File uploaded successfully for testing",
      file: {
        name: req.file.originalname,
        type: req.file.mimetype,
        size: `${(req.file.size / 1024 / 1024).toFixed(2)} MB`,
      },
    });
  } catch (error) {
    console.error("Test upload error:", error);
    res.status(500).json({
      status: "error",
      message: "Test upload failed",
      error: error.message,
    });
  }
});

// Protected routes requiring authentication
router.use(authController.protect);
router.get("/my-applications", loanController.getUserApplications);
router.get("/reference/:reference", loanController.getApplicationByReference);

// Admin only routes
router.use(authController.restrictTo("admin"));
router.get("/", loanController.getAllLoanApplications);
router.patch("/:id/status", loanController.updateApplicationStatus);

module.exports = router;
