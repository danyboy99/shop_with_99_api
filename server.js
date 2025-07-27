// Import required packages and modules
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./route/product.js");
const userRoutes = require("./route/user.js");
const adminRoutes = require("./route/admin.js");
const cartRoutes = require("./route/cart.js");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./passport.js");
const cors = require("cors");
const checkOutRoutes = require("./route/checkout.js");
const dotenv = require("dotenv");

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB database
let DB_url = process.env.DB_url;
mongoose
  .connect(DB_url)
  .then(() => {
    console.log("connected to database!!!");
  })
  .catch((err) => {
    console.log("error:", err.message);
  });

// Configure middleware
// Enable CORS for cross-origin requests
app.use(cors());

// Parse URL-encoded data from forms
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON data from requests
app.use(bodyParser.json());

// Initialize Passport for authentication
app.use(passport.initialize());
passportConfig(passport);

// Root route - API health check
app.get("/", (req, res) => {
  res.json("product app is running");
});

// Configure API routes
app.use("/product", productRoutes); // Product management routes
app.use("/user", userRoutes); // User authentication and profile routes
app.use("/admin", adminRoutes); // Admin authentication and management routes
app.use("/cart", cartRoutes); // Shopping cart routes
app.use("/checkout", checkOutRoutes); // Payment and checkout routes

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
