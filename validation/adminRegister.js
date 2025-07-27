const validator = require("validator");
const isEmpty = require("./isEmpty.js");
// Validate admin registration input data
const validateRegisterInput = (data) => {
  let error = {};
  // Convert undefined/null values to empty strings for validation
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  // Validate fullname
  if (validator.isEmpty(data.fullname)) {
    error.fullname = "fullname field is Required";
  }
  // Validate fullname length
  if (!validator.isLength(data.fullname, { min: 2, max: 35 })) {
    error.fullname = "fullname must be between 2 to 35 characters.";
  }
  // Validate email
  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }
  // Validate email format
  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }
  // Validate password
  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }
  // Validate password length
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    error.password = "password must be at least 6 characters.";
  }
  // Validate password confirmation
  if (validator.isEmpty(data.password2)) {
    error.password2 = "confirm password field is Required";
  }
  // Validate if password match
  if (!validator.equals(data.password, data.password2)) {
    error.password2 = "password must match";
  }
  return {
    error,
    isValid: isEmpty(error),
  };
};

module.exports = validateRegisterInput;
