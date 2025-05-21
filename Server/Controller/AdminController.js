const LoanApplication = require("../Models/LoanApplication");
const User = require("../Models/User");
const mongoose = require("mongoose");

exports.getDashboardStats = async (req, res) => {
  try {
    // Get total applications count
    const totalApplications = await LoanApplication.countDocuments();

    // Get pending applications count
    const pendingReview = await LoanApplication.countDocuments({
      status: "pending",
    });

    // Get approved applications count
    const approved = await LoanApplication.countDocuments({
      status: "approved",
    });

    // Get rejected applications count
    const rejected = await LoanApplication.countDocuments({
      status: "rejected",
    });

    // Get total users count
    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });

    // Get total loan amount (for approved loans)
    const totalAmountResult = await LoanApplication.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, total: { $sum: "$loanInfo.loanAmount" } } },
    ]);

    const totalAmount =
      totalAmountResult.length > 0 ? totalAmountResult[0].total : 0;

    res.status(200).json({
      success: true,
      data: {
        totalApplications,
        pendingReview,
        approved,
        rejected,
        totalUsers,
        totalAmount,
      },
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status,
      sortBy = "applicationDate",
      sortOrder = "desc",
    } = req.query;

    // Build filter object
    const filter = {};

    // Add status filter if provided
    if (status) {
      filter.status = status;
    }

    // Add search functionality
    if (search) {
      // Search in applicant name, email, or ID
      filter.$or = [
        { "personalInfo.firstName": { $regex: search, $options: "i" } },
        { "personalInfo.lastName": { $regex: search, $options: "i" } },
        { "personalInfo.email": { $regex: search, $options: "i" } },
        { referenceNumber: { $regex: search, $options: "i" } },
        { id: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Execute query with pagination and sorting
    const applications = await LoanApplication.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalApplications = await LoanApplication.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        applications,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalApplications / parseInt(limit)),
        totalApplications,
      },
    });
  } catch (error) {
    console.error("Error getting applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comment } = req.body;
    console.log("status",req.body)

    

    // Find the application
    const application = await LoanApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Update the status
    application.status = status.status;
    console.log('value',status.status)

    // Add a timeline event
    application.timeline.push({
      date: new Date(),
      event: `Application ${status}`,
      status: "completed",
      by: `Admin (${req.user.name || req.user.email})`,
    });

    // Add a note if comment is provided
    if (comment) {
      application.notes.push({
        date: new Date(),
        author: req.user.name || req.user.email,
        text: comment,
      });
    }

    // Save the updated application
    await application.save();

    // Return the updated application
    res.status(200).json({
      success: true,
      message: `Application status updated to ${status}`,
      data: {
        application,
      },
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
      error: error.message,
    });
  }
};

exports.addApplicationNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text === "") {
      return res.status(400).json({
        success: false,
        message: "Note text is required",
      });
    }

    // Find the application
    const application = await LoanApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Add the note
    const newNote = {
      date: new Date(),
      author: req.user.name || req.user.email,
      text,
    };

    application.notes.push(newNote);

    // Save the updated application
    await application.save();

    // Return the updated notes array
    res.status(200).json({
      success: true,
      message: "Note added successfully",
      data: {
        notes: application.notes,
      },
    });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add note",
      error: error.message,
    });
  }
};

exports.getDocument = async (req, res) => {
  try {
    const { applicationId, documentId } = req.params;

    // Find the application
    const application = await LoanApplication.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Find the document in the application
    let documentUrl;
    for (const [key, docs] of Object.entries(application.documents)) {
      if (docs._id.toString() === documentId) {
        documentUrl = docs.documentUrl;
        break;
      }
    }

    if (!documentUrl) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Redirect to the document URL (assuming cloudinary URLs)
    res.redirect(documentUrl);
  } catch (error) {
    console.error("Error getting document:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get document",
      error: error.message,
    });
  }
};

exports.updateDocumentStatus = async (req, res) => {
  try {
    const { applicationId, documentId } = req.params;
    const { verificationStatus } = req.body;

    if (!["pending", "verified", "rejected"].includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid verification status. Must be 'pending', 'verified', or 'rejected'.",
      });
    }

    // Find the application
    const application = await LoanApplication.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Find and update the document status
    let documentUpdated = false;

    for (const [key, docs] of Object.entries(application.documents)) {
      if (docs._id.toString() === documentId) {
        application.documents[key].verificationStatus = verificationStatus;
        documentUpdated = true;
        break;
      }
    }

    if (!documentUpdated) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    // Add a note about the verification
    application.notes.push({
      date: new Date(),
      author: req.user.name || req.user.email,
      text: `Document status updated to "${verificationStatus}"`,
    });

    // Save the updated application
    await application.save();

    // Return success
    res.status(200).json({
      success: true,
      message: "Document verification status updated",
      data: {
        application,
      },
    });
  } catch (error) {
    console.error("Error updating document status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update document status",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    // Build filter object
    const filter = { role: { $ne: "admin" } }; // Exclude admin users

    // Add search functionality
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password"); // Exclude password field

    // Get total count for pagination
    const totalUsers = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        users,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalUsers / parseInt(limit)),
        totalUsers,
      },
    });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID, excluding password
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get user's applications
    const applications = await LoanApplication.find({ userId: user._id });

    res.status(200).json({
      success: true,
      data: {
        user,
        applications,
      },
    });
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};
