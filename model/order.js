const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    cart: Object,
    address: { type: String, required: true },
    name: { type: String, required: true },
    paymentId: { type: String, required: true },
    paymentFlw_ref: { type: String, required: true },
    paymentTx_ref: { type: String, required: true },
    paymentConfirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("order", orderSchema);

module.exports = order;
