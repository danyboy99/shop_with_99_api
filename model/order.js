// Import mongoose for database operations
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define order schema for completed purchases
const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" }, // Reference to user who placed the order
    cart: Object, // Cart data at time of order placement
    address: { type: String, required: true }, // Delivery address
    name: { type: String, required: true }, // Customer name for delivery
    paymentId: { type: String, required: true }, // Payment gateway transaction ID
    paymentFlw_ref: { type: String, required: true }, // Flutterwave reference
    paymentTx_ref: { type: String, required: true }, // Transaction reference
    paymentConfirmed: { type: Boolean, default: false }, // Whether payment has been verified
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export order model
const order = mongoose.model("order", orderSchema);

module.exports = order;
