let Product = require("../models/productsModel");
let ProductCategories = require("../models/categoriesModel");
let postProducts = async (req, res) => {
  try {
    let product = new Product(req.body);
    let data = await product.save();
    res.status(200).json({ product: data });
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
};
let fetchProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
};
let fetchFeatureProducts = async (req, res) => {
  try {
    let featureProducts = await Product.find({ "rating.rate": { $gte: 4 } });
    res.status(200).json({ featureProducts });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};
let fetchSingleProduct = async (req, res) => {
  let _id = req.params.id;
  try {
    let product = await Product.findOne({ _id });
    res.status(200).json({ product });
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
};
let postCategories = async (req, res) => {
  try {
    let category = await new ProductCategories(req.body);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
};
let fetchProductsCategories = async (req, res) => {
  try {
    let categories = await ProductCategories.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
};
let filterProductsCategory = async (req, res) => {
  try {
    let category = req.params.category;
    let products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(200).json({ message: "something went wrong" });
  }
};

module.exports = {
  postProducts,
  fetchProducts,
  fetchSingleProduct,
  postCategories,
  fetchProductsCategories,
  fetchFeatureProducts,
  filterProductsCategory,
};
