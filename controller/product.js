// Import required modules and models
const Product = require("../model/product.js");
const validateProductInput = require("../validation/product.js");
const { cloudinary } = require("../config/keys.js");

// Test route for product endpoints
const indexRoute = (req, res) => {
  res.json("product route");
};

// Create a new product with image upload
const createProduct = async (req, res) => {
  try {
    // Validate input data
    const { error, isValid } = validateProductInput(req.body);
    if (!isValid) {
      if (!req.file) {
        error.image = "product image is required";
      }
      return res.status(400).json(error);
    }

    // Upload image to Cloudinary
    let imageUrl = "";
    await cloudinary.uploader.upload(req.file.path).then((data) => {
      console.log("cloudinary upload resp:", data);
      imageUrl = data.url;
    });

    // Create product with uploaded image URL
    const { name, category, price, about } = req.body;
    Product.create({
      name,
      category,
      price,
      imagePath: imageUrl,
      about,
    }).then((data) => {
      res.json({
        status: "success",
        Product: data,
      });
    });
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

// Update an existing product
const updateProduct = (req, res) => {
  try {
    const id = req.params.id;
    const { name, category, price, about } = req.body;

    // Find product by ID and update with new data
    Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price,
        about,
      },
      { new: true } // Return updated document
    ).then((data) => {
      res.json({
        status: "success",
        Product: data,
      });
    });
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

// Delete a product
const deleteProduct = (req, res) => {
  try {
    const id = req.params.id;

    // Find product by ID and delete
    Product.findByIdAndDelete(id).then((data) => {
      res.json({
        status: "success",
        message: "product deleted successfully",
      });
    });
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

// Export all controller functions
module.exports = {
  indexRoute,
  createProduct,
  updateProduct,
  deleteProduct,
};
