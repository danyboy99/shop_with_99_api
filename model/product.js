// Import mongoose for database operations
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define product schema with all required fields
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    numOfReviews: {
      type: Number,
      default: 0, // Default to 0 reviews for new products
    },
    imagePath: {
      type: String,
      required: true, // URL path to product image
    },
    about: {
      type: String,
      required: true, // Product description
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export product model
const product = mongoose.model("product", productSchema);

module.exports = product;
