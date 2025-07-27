// Import required packages
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

// Define user schema with required fields
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to validate password during login
userSchema.method("isPasswordValid", async function (Password) {
  try {
    return await bcrypt.compare(Password, this.password);
  } catch (err) {
    throw new Error(err);
  }
});

// Create and export user model
const user = mongoose.model("user", userSchema);

module.exports = user;
