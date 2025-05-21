const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Sign up new user
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "Email already in use. Please use a different email or login.",
      });
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Generate JWT token
    const token = newUser.generateToken();

    // Remove password from output
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to create user account.",
      error: error.message,
    });
  }
};

// Log in user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password were provided
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password.",
      });
    }

    // Find user and select password
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists and password is correct
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password.",
      });
    }

    // Generate JWT token
    const token = user.generateToken();

    // Remove password from output
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      status: "error",
      message: "Login failed. Please try again.",
      error: error.message,
    });
  }
};

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  try {
    // Get token from header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in. Please log in to get access.",
      });
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      status: "fail",
      message: "Invalid token or session expired. Please log in again.",
      error: error.message,
    });
  }
};

// Middleware to restrict routes to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if user role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action.",
      });
    }
    next();
  };
};

// Get current user
exports.getMe = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

// Create and send JWT token
const createSendToken = (user, statusCode, res) => {
  // Generate token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "your-secret-key",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "24h",
    }
  );

  return token;
};

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const admin = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is an admin
    if (admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    // Check if password is correct - Fix this to actually check the password
    const isPasswordCorrect = await admin.correctPassword(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = createSendToken(admin, 200, res);

    // Remove password from output
    admin.password = undefined;

    res.status(200).json({
      success: true,
      token,
      data: {
        user: admin,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// Verify token
exports.verifyToken = (req, res) => {
  // If this middleware is reached, it means the token is valid
  // as the authenticate middleware has already verified it
  res.status(200).json({
    success: true,
    message: "Token is valid",
    data: {
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    },
  });
};
