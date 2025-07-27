const express = require("express");
const checkOutController = require("../controller/checkout.js");
const router = express.Router();
const passport = require("passport");
// initiate payment
router.post(
  "/initiate",
  passport.authenticate("userSign", { session: false }),
  checkOutController.initiatePayment
);
// validate payment
router.post(
  "/validatepayment",
  passport.authenticate("userSign", { session: false }),
  checkOutController.validatePayment
);
// verify payment
router.post("/verifypayment", checkOutController.verifyPayment);

module.exports = router;
