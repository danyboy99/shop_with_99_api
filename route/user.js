// Import required modules
const express = require("express");
const userController = require("../controller/user.js");
const passport = require("passport");
const { validationLoginText } = require("../validation/validationText.js");

const router = express.Router();

// Test route for user endpoints
router.get("/", userController.indexRoute);

// User registration route
router.post("/signup", userController.createUser);

// User login route with validation and authentication
router.post(
  "/login",
  validationLoginText,
  passport.authenticate("userLogin", { session: false }),
  userController.loginUser
);

// Get user profile (protected route)
router.get(
  "/profile",
  passport.authenticate("userSign", { session: false }),
  userController.userProfile
);

module.exports = router;
