const validator = require("validator");
const isEmpty = require("./isEmpty.js");
// Validate payment input data
const validatePaymentInput = (data) => {
  let error = {};
  // Convert undefined/null values to empty strings for validation
  data.otp = !isEmpty(data.otp) ? data.otp : "";
  data.flw_ref = !isEmpty(data.flw_ref) ? data.flw_ref : "";
  // Validate otp
  if (validator.isEmpty(data.otp)) {
    error.otp = "otp field is Required";
  }
  // Validate flw_ref
  if (validator.isEmpty(data.flw_ref)) {
    error.flw_ref = "flw_fre field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

module.exports = validatePaymentInput;
