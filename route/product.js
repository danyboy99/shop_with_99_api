// Import required modules
const express = require("express");
const productRoute = require("../controller/product.js");
const uploadImage = require("../config/productMulter.js");

const router = express.Router();

// Test route for product endpoints
router.get("/", productRoute.indexRoute);

// Create new product with image upload
router.post("/create", uploadImage.single("image"), productRoute.createProduct);

// Update existing product by ID
router.put("/update/:id", productRoute.updateProduct);

// Delete product by ID
router.delete("/delete/:id", productRoute.deleteProduct);

module.exports = router;
