// Import required models
const Cart = require("../model/cart.js");
const product = require("../model/product.js");
const Product = require("../model/product.js");

// Test/seed function for cart operations
const seeds = async (req, res) => {
  try {
    const item = req.params.productId;

    // Create a test cart with placed order status
    await Cart.create({
      user: req.user,
      placedOrderStatus: true,
    }).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

// Add a product to user's shopping cart
const addToShoppingCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product to add to cart
    const productCollection = await Product.findOne({ _id: productId });
    if (!productCollection) {
      return res.json({ error: "sorry no product with this id was found." });
    }

    const user = req.user._id;

    // Find user's active cart (not yet placed as order)
    const userCart = await Cart.findOne({
      user: user,
      placedOrderStatus: false,
    });

    // If no cart exists, create a new one
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

    // Check if product already exists in cart
    let foundProduct = "";
    userCart.items.map((item) => {
      if (item.product._id.toString() == productId) {
        foundProduct = item.product._id.toString();
      } else {
        foundProduct = "";
      }
      return;
    });

    // If product exists in cart, update quantity and price
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
      // If product doesn't exist in cart, add as new item
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
// Reduce quantity of a product in cart by one
const reduceByOneFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product to reduce from cart
    const productCollection = await Product.findOne({ _id: productId });
    if (!productCollection) {
      return res.json({ error: "sorry no product with this id was found." });
    }

    const user = req.user._id;

    // Find user's active cart
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

    // Check if product exists in cart
    let foundProduct = "";
    userCart.items.map((item) => {
      if (item.product._id.toString() === productId) {
        foundProduct = item.product._id.toString();
      }
    });

    if (foundProduct !== "") {
      // Reduce quantity and price, remove if quantity becomes 0
      userCart.items.map((item) => {
        if (item.product._id.toString() == foundProduct) {
          item.price -= productCollection.price;
          item.quantity--;

          // Remove item if quantity is 0 or less
          if (item.quantity <= 0) {
            const index = userCart.items.findIndex(
              (item) => item.product._id.toString() === foundProduct
            );
            userCart.items.splice(index, 1);
          }
        }
        return;
      });

      // Update cart totals
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

// Remove a product completely from cart
const removeProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product to remove from cart
    const productCollection = await Product.findOne({ _id: productId });
    if (!productCollection) {
      return res.json({ error: "sorry no product with this id was found." });
    }

    const user = req.user._id;

    // Find user's active cart
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

    // Find product in cart and get its total price and quantity
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
      // Remove product from cart completely
      const index = userCart.items.findIndex(
        (item) => item.product._id.toString() === foundProduct
      );
      userCart.items.splice(index, 1);

      // Update cart totals
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

// Get user's current shopping cart
const shoppingCart = async (req, res) => {
  const user = req.user;

  // Find user's active cart
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

// Export all controller functions
module.exports = {
  seeds,
  addToShoppingCart,
  shoppingCart,
  reduceByOneFromCart,
  removeProductFromCart,
};
