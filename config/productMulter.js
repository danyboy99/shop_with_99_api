const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmtfr247c",
  api_key: "916295955767192",
  api_secret: "Dh25wiYQXFM9On9y7VusV02H0dU",
});

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//       folder: 'CloudinaryDemo',
//       allowedFormats: ['jpeg', 'png', 'jpg'],
//   }
// });

const storage = multer.diskStorage({
  filename: (req, file, cd) => {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});
module.exports = upload;
