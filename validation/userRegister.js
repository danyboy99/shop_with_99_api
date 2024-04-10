const validator = require("validator");
const isEmpty = require("./isEmpty.js");

const validateRegisterInput = (data) => {
  let error = {};

  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.fullname)) {
    error.fullname = "fullname field is Required";
  }

  if (!validator.isLength(data.fullname, { min: 2, max: 35 })) {
    error.fullname = "fullname must be between 2 to 35 characters.";
  }

  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }
  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.username)) {
    error.username = "password field is Required";
  }
  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    error.password = "password must be at least 6 characters.";
  }
  if (validator.isEmpty(data.password2)) {
    error.password2 = "confirm password field is Required";
  }
  if (!validator.equals(data.password, data.password2)) {
    error.password2 = "password must match";
  }
  return {
    error,
    isValid: isEmpty(error),
  };
};

module.exports = validateRegisterInput;
