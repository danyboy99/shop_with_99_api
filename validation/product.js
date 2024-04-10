const validator = require("validator");
const isEmpty = require("./isEmpty.js");

const validateProductInput = (data) => {
  let error = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.about = !isEmpty(data.about) ? data.about : "";

  if (validator.isEmpty(data.name)) {
    error.name = "name field is Required";
  }

  if (!validator.isLength(data.name, { min: 2, max: 35 })) {
    error.name = "name must be between 2 to 35 characters.";
  }

  if (validator.isEmpty(data.category)) {
    error.category = "category field is Required";
  }
  if (validator.isEmpty(data.price)) {
    error.price = "price field is Required";
  }
  if (validator.isEmpty(data.about)) {
    error.about = "about field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

module.exports = validateProductInput;
