const express = require("express");
const adminController = require("../controller/admin.js");
const passport = require("passport");
const productController = require("../controller/product.js");
const {
  validationLoginText,
  validationRegisterText,
} = require("../validation/validationText.js");

const router = express.Router();

router.get("/", adminController.indexRoute);

router.post("/signup", validationRegisterText, adminController.createAdmin);

router.post(
  "/login",
  validationLoginText,
  passport.authenticate("adminLogin", { session: false }),
  adminController.loginAdmin
);

router.post(
  "/createproduct",
  passport.authenticate("adminSign", { session: false }),
  productController.createProduct
);

router.post(
  "/updateproduct",
  passport.authenticate("adminSign", { session: false }),
  productController.updateProduct
);

router.post(
  "/deleteproduct",
  passport.authenticate("adminSign", { session: false }),
  productController.deleteProduct
);

router.get(
  "/profile",
  passport.authenticate("adminSign", { session: false }),
  adminController.adminProfile
);

module.exports = router;
