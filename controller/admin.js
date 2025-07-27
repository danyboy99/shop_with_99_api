const Admin = require("../model/admin.js");
const jwt = require("jsonwebtoken");
// const { jwt_secret } = require("../config/keys.js");
const jwt_secret = process.env.jwt_secret;
// Helper function to generate JWT token for admin authentication
const signToken = (user) => {
  return jwt.sign(
    {
      iss: "Danilo",
      sub: user._id,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time plus 1 day ahead
    },
    jwt_secret
  );
};
// Test route for admin endpoints
const indexRoute = (req, res) => {
  res.json("admin index route");
};
// Register a new admin
const createAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    await Admin.create({
      fullname,
      email,
      password,
    }).then((user) => {
      const token = signToken(user);
      res.json({
        status: "success",
        message: "admin created successfully !!",
        token: "Bearer " + token,
      });
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};
// Login admin (called after passport authentication)
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await Admin.findOne({ email: email });

    if (foundUser) {
      const token = signToken(foundUser);
      return res.json({
        status: "success",
        token: "Bearer " + token,
      });
    } else {
      return res.json({
        status: "failed",
        message: "user not found!!",
      });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};
// Get admin profile information
const adminProfile = (req, res) => {
  try {
    return res.json({
      currentUser: req.user,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};
module.exports = {
  indexRoute,
  createAdmin,
  adminProfile,
  loginAdmin,
};
