const multer = require("multer");
const path = require("path");
// Configure multer storage to save images in the 'productimage' directory
const storage = multer.diskStorage({
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;
