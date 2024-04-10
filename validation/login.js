const validator = require("validator");
const isEmpty = require("./isEmpty.js");

const validateLoginInput = (data) => {
  let error = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }
  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

module.exports = validateLoginInput;
