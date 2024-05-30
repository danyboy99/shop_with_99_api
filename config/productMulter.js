const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;
