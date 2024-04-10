const express = require("express");
const userController = require("../controller/user.js");
const passport = require("passport");
const { validationLoginText } = require("../validation/validationText.js");

const router = express.Router();

router.get("/", userController.indexRoute);

router.post("/signup", userController.createUser);

router.post(
  "/login",
  validationLoginText,
  passport.authenticate("userLogin", { session: false }),
  userController.loginUser
);

router.get(
  "/profile",
  passport.authenticate("userSign", { session: false }),
  userController.userProfile
);

module.exports = router;
