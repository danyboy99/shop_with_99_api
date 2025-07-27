// Import mongoose for database operations
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define cart schema for user shopping carts
const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" }, // Reference to user who owns the cart
    items: [
      {
        product: Object, // Product details
        price: Number, // Price at time of adding to cart
        quantity: Number, // Quantity of this product in cart
      },
    ],
    totalPrice: {
      type: Number,
      default: 0, // Total price of all items in cart
    },
    totalQty: {
      type: Number,
      default: 0, // Total quantity of all items in cart
    },
    placedOrderStatus: {
      type: Boolean,
      default: false, // Whether this cart has been converted to an order
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export cart model
const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
