const flutterWave = require("flutterwave-node-v3");
const flw = new flutterWave(
  "FLWPUBK_TEST-d8a5d2c77fd8d4ecfcfca5d95161e06b-X",
  "FLWSECK_TEST-42c6b907b1087f5d1a51e8602cabe713-X"
);
const initiatePaymentInput = require("../validation/initiatePayment.js");
const validatePaymentInput = require("../validation/validatePayment.js");
const Order = require("../model/order.js");
const Cart = require("../model/cart.js");
const initiatePayment = async (req, res) => {
  try {
    const { error, isValid } = initiatePaymentInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

    const {
      card_number,
      card_cvv,
      card_exp_month,
      card_exp_year,
      email,
      name,
      card_pin,
    } = req.body;

    const tx_ref = "02" + Math.floor(Math.random() * 1000000000 + 1);
    const userCart = await Cart.findOne({
      user: req.user,
      placedOrderStatus: false,
    });
    if (!userCart) {
      return res.json({
        status: "failed",
        msg: "cart not found!!",
      });
    }
    console.log(name);
    const amount = userCart.totalPrice;
    const payload = {
      card_number: card_number,
      cvv: card_cvv,
      expiry_month: card_exp_month,
      expiry_year: card_exp_year,
      currency: "NGN",
      amount,
      fullname: name,
      email: email,
      phone_number: "09000000000",
      enckey: "FLWSECK_TEST251672747cae",
      redirect_url: "http://localhost:8000/",
      tx_ref,
    };

    const initiateCardCharge = await flw.Charge.card(payload);

    if (initiateCardCharge.meta.authorization.mode === "pin") {
      let payload2 = payload;
      payload2.authorization = {
        mode: "pin",
        pin: card_pin,
      };

      const reCallCharge = await flw.Charge.card(payload2);
      const order = await Order.create({
        user: req.user,
        cart: userCart,
        name: req.body.name,
        address: req.body.address,
        paymentId: reCallCharge.data.id,
        paymentTx_ref: reCallCharge.data.tx_ref,
        paymentFlw_ref: reCallCharge.data.flw_ref,
      });

      userCart.placedOrderStatus = true;
      await userCart.save();
      return res.json({
        status: "pending",
        msg: `${reCallCharge.data.processor_response}`,
        flutterWaveRes: reCallCharge,
      });
    }
    if (initiateCardCharge.meta.authorization.mode === "redirect") {
      return res.json({
        status: "pending",
        msg: "need to redirect to back url",
        url: initiateCardCharge.meta.authorization.redirect,
      });
    } else {
      res.json({
        status: "failed",
        msg: "card not authorized!!",
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

const validatePayment = async (req, res) => {
  try {
    const { error, isValid } = validatePaymentInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
    const { otp, flw_ref } = req.body;
    const callValidate = await flw.Charge.validate({
      otp: otp,
      flw_ref: flw_ref,
    });

    res.json({
      status: `${callValidate.status}`,
      msg: `${callValidate.message}`,
      flutterWaveRes: callValidate,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};
const verifyPayment = async (req, res) => {
  try {
    if (!req.body.transaction_id) {
      return res.json({
        status: "failed!!",
        msg: "transaction id is needed !!",
      });
    }
    const { transaction_id } = req.body;
    const verifytransaction = await flw.Transaction.verify({
      id: req.body.transaction_id,
    });
    return res.json({
      status: verifytransaction.status,
      msg: verifytransaction.message,
      flutterWaveRes: verifytransaction,
    });
  } catch (err) {
    res.json({
      status: "failed!!",
      msg: err.message,
    });
  }
};
module.exports = {
  initiatePayment,
  validatePayment,
  verifyPayment,
};
