const Product = require("../model/product.js");
const validateProductInput = require("../validation/product.js");
const { cloudinary } = require("../config/keys.js");

const indexRoute = (req, res) => {
  res.json("product route");
};

const createProduct = async (req, res) => {
  try {
    const { error, isValid } = validateProductInput(req.body);
    // check validation
    if (!isValid) {
      if (!req.file) {
        error.image = "product image is required";
      }
      return res.status(400).json(error);
    }
    let imageUrl = "";
    await cloudinary.uploader.upload(req.file.path).then((data) => {
      console.log("cloudinary upload resp:", data);
      imageUrl = data.url;
    });
    const { name, category, price, about } = req.body;
    Product.create({
      name,
      category,
      price,
      imagePath: imageUrl,
      about,
    }).then((data) => {
      res.json({
        status: "success",
        Product: data,
      });
    });
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

const updateProduct = (req, res) => {
  try {
    const id = req.params.id;
    const { name, category, price, about } = req.body;

    Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price,
        about,
      },
      { new: true }
    ).then((data) => {
      res.json({
        status: "success",
        Product: data,
      });
    });
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};

const deleteProduct = (req, res) => {
  try {
    const id = req.params.id;

    Product.findByIdAndDelete(id).then((data) => {
      res.json({
        status: "success",
        message: "product deleted successfully",
      });
    });
  } catch (err) {
    console.log("err", err.message);
    res.json({ error: err.message });
  }
};
module.exports = {
  indexRoute,
  createProduct,
  updateProduct,
  deleteProduct,
};
