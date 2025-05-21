const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },

    // Loan Details
    employmentStatus: {
      type: String,
      required: [true, "Employment status is required"],
      enum: [
        "Full-time",
        "Part-time",
        "Self-employed",
        "Unemployed",
        "Retired",
      ],
    },
    employer: {
      type: String,
      trim: true,
    },
    monthlyIncome: {
      type: Number,
      required: [true, "Monthly income is required"],
    },
    loanType: {
      type: String,
      required: [true, "Loan type is required"],
      enum: ["Home Loan", "Refinance", "Home Equity", "Investment Property"],
    },
    loanAmount: {
      type: Number,
      required: [true, "Loan amount is required"],
    },
    loanTerm: {
      type: Number,
      required: [true, "Loan term is required"],
      enum: [10, 15, 20, 30],
    },

    // Document References
    documents: {
      identityProof: {
        fileName: String,
        fileSize: String,
        fileType: String,
        filePath: String,
        uploadDate: Date,
      },
      addressProof: {
        fileName: String,
        fileSize: String,
        fileType: String,
        filePath: String,
        uploadDate: Date,
      },
      incomeProof: {
        fileName: String,
        fileSize: String,
        fileType: String,
        filePath: String,
        uploadDate: Date,
      },
      bankStatements: {
        fileName: String,
        fileSize: String,
        fileType: String,
        filePath: String,
        uploadDate: Date,
      },
      propertyDocs: {
        fileName: String,
        fileSize: String,
        fileType: String,
        filePath: String,
        uploadDate: Date,
      },
    },

    // Application Status
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Under Review", "Approved", "Rejected"],
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },

    // Reference to User if authenticated
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Application tracking
    referenceNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate a unique reference number before saving
loanApplicationSchema.pre("save", async function (next) {
  if (!this.referenceNumber) {
    // Format: SBM-YYYY-MMDD-XXXX (where XXXX is a random number)
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

    this.referenceNumber = `SBM-${year}-${month}${day}-${random}`;
  }
  next();
});

const LoanApplication = mongoose.model(
  "LoanApplication",
  loanApplicationSchema
);

module.exports = LoanApplication;
