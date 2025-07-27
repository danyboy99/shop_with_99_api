// Import required modules and models
const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const validateRegisterInput = require("../validation/userRegister.js");
const bcrypt = require("bcrypt");

// Helper function to generate JWT token for user authentication
const signToken = (user) => {
  return jwt.sign(
    {
      iss: "Danilo",
      sub: user._id,
      iat: new Date().getTime(), // Current time
      exp: new Date().setDate(new Date().getDate() + 1), // Expires in 1 day
    },
    jwt_secret
  );
};

// Test route for user endpoints
const indexRoute = (req, res) => {
  res.json("user index route !");
};

// Register a new user
const createUser = async (req, res) => {
  try {
    // Validate input data
    const { error, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(error);
    }

    const { fullname, username, email, password, address } = req.body;

    // Check if user already exists
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(403).json({ error: "user already exist...." });
    }

    // Create new user and generate token
    await User.create({
      fullname,
      username,
      email,
      password, // Password will be hashed by the pre-save middleware
      address,
    }).then((data) => {
      const token = signToken(data);
      res.json({
        status: "success",
        message: "user created successfully !!",
        token: "Bearer " + token,
      });
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Login user (called after passport authentication)
const loginUser = async (req, res, next) => {
  try {
    // Generate token for authenticated user
    const token = signToken(req.user);
    return res.json({
      status: "success",
      token: "Bearer " + token,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Get user profile information
const userProfile = (req, res) => {
  try {
    return res.json({
      currentUser: req.user,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// Export all controller functions
module.exports = {
  indexRoute,
  createUser,
  userProfile,
  loginUser,
};
