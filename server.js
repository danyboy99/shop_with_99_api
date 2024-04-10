const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./route/product.js");
const userRoutes = require("./route/user.js");
const adminRoutes = require("./route/admin.js");
const cartRoutes = require("./route/cart.js");
const { DB_url } = require("./config/keys.js");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./passport.js");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const checkOutRoutes = require("./route/checkout.js");
const app = express();
//connect to mongoDB with mongoose
mongoose
  .connect(DB_url)
  .then(() => {
    console.log("connected to database!!!");
  })
  .catch((err) => {
    console.log("error:", err.message);
  });
// set middleware
// set cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());

passportConfig(passport);
// app.use(
//   formidableMiddleware({
//     encoding: "utf-8",
//     multiples: true, // req.files to be arrays of files
//   })
// );

//index route
// get route for displaying product
app.get("/", (req, res) => {
  res.json("product app is running");
});
// product route
app.use("/product", productRoutes);

//user route
app.use("/user", userRoutes);

//admin route
app.use("/admin", adminRoutes);

// cart route
app.use("/cart", cartRoutes);

//checkout route
app.use("/checkout", checkOutRoutes);

//setup port and listen

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
