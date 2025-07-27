const validator = require("validator");
const isEmpty = require("./isEmpty.js");
// Validate product input data
const validateProductInput = (data) => {
  let error = {};
  // Convert undefined/null values to empty strings for validation
  data.name = !isEmpty(data.name) ? data.name : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.about = !isEmpty(data.about) ? data.about : "";
  // Validate name
  if (validator.isEmpty(data.name)) {
    error.name = "name field is Required";
  }
  // Validate name length
  if (!validator.isLength(data.name, { min: 2, max: 35 })) {
    error.name = "name must be between 2 to 35 characters.";
  }
  // Validate category
  if (validator.isEmpty(data.category)) {
    error.category = "category field is Required";
  }
  // Validate price
  if (validator.isEmpty(data.price)) {
    error.price = "price field is Required";
  }
  // Validate about
  if (validator.isEmpty(data.about)) {
    error.about = "about field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

module.exports = validateProductInput;
