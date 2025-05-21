const LoanApplication = require("../Models/LoanApplication");
const path = require("path");
const fs = require("fs");

// Fix the document upload function
const uploadDocuments = async (files, applicationId) => {
  // Make sure we have a string application ID
  const appId = applicationId.toString();

  // Create upload directory path
  const uploadDir = path.join(__dirname, "..", "uploads", appId);

  // Create directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const documentInfo = {};

  // Process each file
  for (const [field, file] of Object.entries(files)) {
    if (file && file.buffer) {
      // Make sure file has buffer data
      const fileName = `${field}-${Date.now()}${path.extname(
        file.originalname || ""
      )}`;
      const filePath = path.join(uploadDir, fileName);

      // Save file to disk
      await fs.promises.writeFile(filePath, file.buffer);

      // Store file information
      documentInfo[field] = {
        fileName: file.originalname,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileType: file.mimetype,
        filePath: filePath,
        uploadDate: new Date(),
      };
    }
  }

  return documentInfo;
};

// Create new loan application
exports.createLoanApplication = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      employmentStatus,
      employer,
      monthlyIncome,
      loanType,
      loanAmount,
      loanTerm,
    } = req.body;

    // Create new application
    const loanApplication = new LoanApplication({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      employmentStatus,
      employer,
      monthlyIncome: parseFloat(monthlyIncome),
      loanType,
      loanAmount: parseFloat(loanAmount),
      loanTerm: parseInt(loanTerm),
    });

    // Associate with user if authenticated
    if (req.user) {
      loanApplication.user = req.user._id;
    }

    // Save application to get ID
    await loanApplication.save();

    // Process file uploads if available
    if (req.files && Object.keys(req.files).length > 0) {
      const documentInfo = await uploadDocuments(
        req.files,
        loanApplication._id.toString()
      );

      // Update application with document info
      loanApplication.documents = documentInfo;
      await loanApplication.save();
    }

    res.status(201).json({
      status: "success",
      data: {
        loanApplication,
        message: "Your loan application has been submitted successfully!",
        referenceNumber: loanApplication.referenceNumber,
      },
    });
  } catch (error) {
    console.error("Error creating loan application:", error);
    res.status(500).json({
      status: "error",
      message:
        "Failed to submit your loan application. Please try again later.",
      error: error.message,
    });
  }
};

// Get all loan applications (admin only)
exports.getAllLoanApplications = async (req, res) => {
  try {
    // Implement pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Apply filters if provided
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.loanType) filter.loanType = req.query.loanType;

    // Get applications
    const applications = await LoanApplication.find(filter)
      .sort({ applicationDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await LoanApplication.countDocuments(filter);

    res.status(200).json({
      status: "success",
      results: applications.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: {
        applications,
      },
    });
  } catch (error) {
    console.error("Error fetching loan applications:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch loan applications.",
      error: error.message,
    });
  }
};

// Get user's loan applications
exports.getUserApplications = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await LoanApplication.find({ user: userId }).sort({
      applicationDate: -1,
    });

    res.status(200).json({
      status: "success",
      results: applications.length,
      data: {
        applications,
      },
    });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch your loan applications.",
      error: error.message,
    });
  }
};

// Get application by reference number or ID
exports.getApplicationByReference = async (req, res) => {
  try {
    const { reference } = req.params;

    // Search by reference number or ID
    const application = await LoanApplication.findOne({
      $or: [{ referenceNumber: reference }, { _id: reference }],
    });

    if (!application) {
      return res.status(404).json({
        status: "fail",
        message: "No loan application found with that reference.",
      });
    }

    // Check if user is authorized (admin or application owner)
    const isAdmin = req.user && req.user.role === "admin";
    const isOwner =
      req.user &&
      application.user &&
      application.user.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to access this application.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        application,
      },
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch loan application details.",
      error: error.message,
    });
  }
};

// Update application status (admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await LoanApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        status: "fail",
        message: "No loan application found with that ID.",
      });
    }

    // Update fields
    application.status = status || application.status;
    if (notes) application.notes = notes;

    await application.save();

    res.status(200).json({
      status: "success",
      data: {
        application,
      },
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update loan application status.",
      error: error.message,
    });
  }
};

// Update the uploadDocuments controller method
exports.uploadDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    // Log what files were received
    console.log("Files received:", req.files ? Object.keys(req.files) : "none");

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No files were uploaded.",
      });
    }

    const application = await LoanApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        status: "fail",
        message: "No loan application found with that ID.",
      });
    }

    // Process file uploads
    const documentInfo = await uploadDocuments(req.files, id);

    // Update application with document info
    application.documents = {
      ...application.documents,
      ...documentInfo,
    };

    await application.save();

    res.status(200).json({
      status: "success",
      message: "Documents uploaded successfully",
      data: {
        documents: documentInfo,
      },
    });
  } catch (error) {
    console.error("Error uploading documents:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to upload documents. Please try again later.",
      error: error.message,
    });
  }
};
