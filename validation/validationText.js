const validateLoginInput = require("./login.js");
const validateRegisterInput = require("./adminRegister.js");
// validate login input
const validationLoginText = (req, res, next) => {
  const { error, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(error);
  } else {
    next();
  }
};
// validate register input
const validationRegisterText = (req, res, next) => {
  const { error, isValid } = validateRegisterInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(error);
  } else {
    next();
  }
};

module.exports = {
  validationLoginText,
  validationRegisterText,
};
