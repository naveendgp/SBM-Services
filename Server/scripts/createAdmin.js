const mongoose = require("mongoose");
const User = require("../Models/User");
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sbmservices");
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (adminExists) {
      console.log("Admin user already exists");
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const admin = new User({
      name: "Admin User",
      email: "admin@gmail.com",
      password: "admin", // Change this to a secure password
      role: "admin",
    });

    await admin.save();

    console.log("Admin user created successfully");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdmin();
