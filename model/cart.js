const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    items: [
      {
        product: Object,
        price: Number,
        quantity: Number,
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalQty: {
      type: Number,
      default: 0,
    },
    placedOrderStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
