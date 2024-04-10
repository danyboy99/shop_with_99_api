const express = require("express");
const cartController = require("../controller/cart.js");
const passport = require("passport");

const router = express.Router();

//get request to get all list in cart collection
// router.get("/");

// cart seeds
router.get(
  "/seed",
  passport.authenticate("userSign", { session: false }),
  cartController.seeds
);

router.get(
  "/shoppingcart/",
  passport.authenticate("userSign", { session: false }),
  cartController.shoppingCart
);

router.post(
  "/addToCart/:productId",
  passport.authenticate("userSign", { session: false }),
  cartController.addToShoppingCart
);

router.post(
  "/reduceByOneFromCart/:productId",
  passport.authenticate("userSign", { session: false }),
  cartController.reduceByOneFromCart
);

router.post(
  "/removeProductFromCart/:productId",
  passport.authenticate("userSign", { session: false }),
  cartController.removeProductFromCart
);

module.exports = router;
