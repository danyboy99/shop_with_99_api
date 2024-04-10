const DB_url = "mongodb://127.0.0.1:27017/shopwith99_api";
jwt_secret = "omotehinse";
const firebaseConfig = {
  apiKey: "AIzaSyD0vEmBbDpomUQAr_FbqfGHNhBbQ36LtbY",
  authDomain: "shopwith99-3a459.firebaseapp.com",
  projectId: "shopwith99-3a459",
  storageBucket: "shopwith99-3a459.appspot.com",
  messagingSenderId: "722722154743",
  appId: "1:722722154743:web:5492b11522b219c1010bf2",
  measurementId: "G-THZQRNCG16",
};
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmtfr247c",
  api_key: "916295955767192",
  api_secret: "Dh25wiYQXFM9On9y7VusV02H0dU",
});
module.exports = {
  DB_url,
  jwt_secret,
  firebaseConfig,
  cloudinary,
};
