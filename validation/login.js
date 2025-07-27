const validator = require("validator");
const isEmpty = require("./isEmpty.js");
// Validate login input data
const validateLoginInput = (data) => {
  let error = {};
  // Convert undefined/null values to empty strings for validation
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Validate email
  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }
  // Validate password
  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }
  // Validate password
  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

module.exports = validateLoginInput;
