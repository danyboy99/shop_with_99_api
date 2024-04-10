const Cart = require("../model/cart.js");
const product = require("../model/product.js");
const Product = require("../model/product.js");

const seeds = async (req, res) => {
  try {
    const item = req.params.productId;

    await Cart.create({
      user: req.user,
      placedOrderStatus: true,
    }).then((data) => {
      res.json(data);
    });
    // const sample = {
    //   sum: {
    //     items: {
    //       id: "65af53c33d8c0f395131d097",
    //       imagePath:
    //         "https://en.wikipedia.org/wiki/Baldur%27s_Gate_3#/media/File:Baldur's_Gate_3_cover_art.jpg",
    //       title: "baldur's game 3",
    //       discription: "action game!!",
    //       price: 30,
    //       __v: 0,
    //     },
    //   },
    // };

    // const result = sample["show"];

    // if (result) {
    //   res.json("found");
    // } else {
    //   res.json("not found!!");
    // }
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

const addToShoppingCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productCollection = await Product.findOne({ _id: productId });
    if (!productCollection) {
      return res.json({ error: "sorry no product with this id was found." });
    }
    const user = req.user._id;
    const userCart = await Cart.findOne({
      user: user,
      placedOrderStatus: false,
    });
    if (!userCart) {
      const newCart = await Cart.create({
        user: user,
        items: [
          {
            product: productCollection,
            price: productCollection.price,
            quantity: 1,
          },
        ],
        totalPrice: productCollection.price,
        totalQty: 1,
      });

      return res.json(newCart);
    }
    let foundProduct = "";
    userCart.items.map((item) => {
      if (item.product._id.toString() == productId) {
        foundProduct = item.product._id.toString();
      } else {
        foundProduct = "";
      }
      return;
    });

    if (foundProduct !== "") {
      userCart.items.map((item) => {
        if (item.product._id.toString() == foundProduct) {
          item.price += productCollection.price;
          item.quantity++;
        }
        return;
      });
      userCart.totalPrice += productCollection.price;
      userCart.totalQty++;
      console.log(`updated userCart : ${userCart}`);
      userCart.save().then((data) => {
        return res.json(data);
      });
    } else {
      const newProduct = {
        product: productCollection,
        price: productCollection.price,
        quantity: 1,
      };

      userCart.items.push(newProduct);
      userCart.totalPrice += productCollection.price;
      userCart.totalQty++;
      console.log(` new updated userCart : ${userCart}`);
      userCart.save().then((data) => {
        return res.json(data);
      });
    }
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};
const reduceByOneFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productCollection = await Product.findOne({ _id: productId });
    if (!productCollection) {
      return res.json({ error: "sorry no product with this id was found." });
    }
    const user = req.user._id;
    const userCart = await Cart.findOne({
      user: user,
      placedOrderStatus: false,
    });

    if (!userCart) {
      return res.json({
        status: "failed",
        message: "no active Cart for this user",
      });
    }

    let foundProduct = "";

    userCart.items.map((item) => {
      if (item.product._id.toString() === productId) {
        foundProduct = item.product._id.toString();
      }
    });
    if (foundProduct !== "") {
      userCart.items.map((item) => {
        if (item.product._id.toString() == foundProduct) {
          item.price -= productCollection.price;
          item.quantity--;

          if (item.quantity <= 0) {
            const index = userCart.items.findIndex(
              (item) => item.product._id.toString() === foundProduct
            );
            userCart.items.splice(index, 1);
          }
        }
        return;
      });
      userCart.totalPrice -= productCollection.price;
      userCart.totalQty--;
      console.log(`updated userCart : ${userCart}`);
      userCart.save().then((data) => {
        return res.json(data);
      });
    } else {
      return res.json({
        status: "failed",
        message: "product not in cart",
      });
    }
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

const removeProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productCollection = await Product.findOne({ _id: productId });
    if (!productCollection) {
      return res.json({ error: "sorry no product with this id was found." });
    }
    const user = req.user._id;
    const userCart = await Cart.findOne({
      user: user,
      placedOrderStatus: false,
    });

    if (!userCart) {
      return res.json({
        status: "failed",
        message: "no active Cart for this user",
      });
    }

    let foundProduct = "";
    let productTotalPrice = 0;
    let productTotalQty = 0;
    userCart.items.map((item) => {
      if (item.product._id.toString() === productId) {
        foundProduct = item.product._id.toString();
        productTotalPrice = item.price;
        productTotalQty = item.quantity;
      }
      return;
    });
    if (foundProduct !== "") {
      const index = userCart.items.findIndex(
        (item) => item.product._id.toString() === foundProduct
      );
      userCart.items.splice(index, 1);
      userCart.totalQty -= productTotalQty;
      userCart.totalPrice -= productTotalPrice;
      userCart.save().then((data) => {
        return res.json(data);
      });
    } else {
      return res.json({
        status: "failed",
        message: "product not in cart",
      });
    }
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

const shoppingCart = async (req, res) => {
  const user = req.user;

  const userCart = await Cart.findOne({
    user: user._id,
    placedOrderStatus: false,
  });

  if (userCart) {
    return res.json({
      status: "success",
      message: "active cart found",
      cart: userCart,
    });
  } else {
    return res.json({
      status: "unsuccessful",
      message: "no active Cart for this user",
    });
  }
};

module.exports = {
  seeds,
  addToShoppingCart,
  shoppingCart,
  reduceByOneFromCart,
  removeProductFromCart,
};
