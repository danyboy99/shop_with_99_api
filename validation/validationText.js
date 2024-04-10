const validateLoginInput = require("./login.js");
const validateRegisterInput = require("./adminRegister.js");

const validationLoginText = (req, res, next) => {
  const { error, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(error);
  } else {
    next();
  }
};

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
