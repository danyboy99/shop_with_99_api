const express = require("express");
const productRoute = require("../controller/product.js");
const uploadImage = require("../config/productMulter.js");

const router = express.Router();

router.get("/", productRoute.indexRoute);

// post route for creating new product
router.post("/create", uploadImage.single("image"), productRoute.createProduct);

//put route to edit product

router.put("/update/:id", productRoute.updateProduct);

//delete route for deleting product

router.delete("/delete/:id", productRoute.deleteProduct);

module.exports = router;
