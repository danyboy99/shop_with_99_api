const User = require("../model/user.js");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const validateRegisterInput = require("../validation/userRegister.js");
const bcrypt = require("bcrypt");
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

const indexRoute = (req, res) => {
  res.json("user index route !");
};

const createUser = async (req, res) => {
  try {
    const { error, isValid } = validateRegisterInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
    const { fullname, username, email, password, address } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(403).json({ error: "user already exist...." });
    }

    await User.create({
      fullname,
      username,
      email,
      password,
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

const loginUser = async (req, res, next) => {
  try {
    const token = signToken(req.user);
    return res.json({
      status: "success",
      token: "Bearer " + token,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const userProfile = (req, res) => {
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
  createUser,
  userProfile,
  loginUser,
};
