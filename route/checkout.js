const express = require("express");
const checkOutController = require("../controller/checkout.js");
const router = express.Router();
const passport = require("passport");

router.post(
  "/initiate",
  passport.authenticate("userSign", { session: false }),
  checkOutController.initiatePayment
);

router.post(
  "/validatepayment",
  passport.authenticate("userSign", { session: false }),
  checkOutController.validatePayment
);

router.post("/verifypayment", checkOutController.verifyPayment);

module.exports = router;
