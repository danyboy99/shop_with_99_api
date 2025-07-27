const express = require("express");
const adminController = require("../controller/admin.js");
const passport = require("passport");
const productController = require("../controller/product.js");
const {
  validationLoginText,
  validationRegisterText,
} = require("../validation/validationText.js");

const router = express.Router();
// Test route for admin endpoints
router.get("/", adminController.indexRoute);
// Admin registration route
router.post("/signup", validationRegisterText, adminController.createAdmin);
// Admin login route with validation and authentication
router.post(
  "/login",
  validationLoginText,
  passport.authenticate("adminLogin", { session: false }),
  adminController.loginAdmin
);
// Product management routes
// create product
router.post(
  "/createproduct",
  passport.authenticate("adminSign", { session: false }),
  productController.createProduct
);
// update product
router.post(
  "/updateproduct",
  passport.authenticate("adminSign", { session: false }),
  productController.updateProduct
);
// delete product
router.post(
  "/deleteproduct",
  passport.authenticate("adminSign", { session: false }),
  productController.deleteProduct
);
// Get admin profile information
router.get(
  "/profile",
  passport.authenticate("adminSign", { session: false }),
  adminController.adminProfile
);

module.exports = router;
