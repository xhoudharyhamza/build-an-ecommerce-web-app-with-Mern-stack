let Product = require("../models/productsModel");
let ProductCategories = require("../models/categoriesModel");
let User = require("../models/usersModel");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
//Add products to database collection
let postProducts = async (req, res) => {
  try {
    let product = new Product(req.body);
    let data = await product.save();
    res.status(200).json({ product: data });
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
};
//fetch products from database collection
let fetchProducts = async (req, res) => {
  try {
    let products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
};
//fetch feature products from database collection
let fetchFeatureProducts = async (req, res) => {
  try {
    let featureProducts = await Product.find({ "rating.rate": { $gte: 4 } });
    res.status(200).json({ featureProducts });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};
//fetch single product details from database
let fetchSingleProduct = async (req, res) => {
  let _id = req.params.id;
  try {
    let product = await Product.findOne({ _id });
    res.status(200).json({ product });
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
};
// add categories to database collection
let postCategories = async (req, res) => {
  try {
    let category = await new ProductCategories(req.body);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
};
//fetch all products categories from database collection
let fetchProductsCategories = async (req, res) => {
  try {
    let categories = await ProductCategories.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(401).json({ message: "something went wrong" });
  }
};
//filter products by different categories
let filterProductsCategory = async (req, res) => {
  try {
    let category = req.params.category;
    let products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(200).json({ message: "something went wrong" });
  }
};
//register the new user
let signupUser = async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({ error: "user exists" });
    } else {
      let user = await new User({ name, email, password });
      user.password = await bcrypt.hash(user.password, 9);
      let token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      user.token = token;
      await user.save();
      res.status(200).json({ message: "registered" });
    }
  } catch (error) {
    res.status(404).json({ error: "error" });
  }
};
//login user
let loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      let comparePassword = await bcrypt.compare(password, user.password);
      if (comparePassword) {
        let token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.cookie("jwt", token, { expire: 24 * 60 * 60, httpOnly: true });
        res.status(200).json({ user });
      } else {
        res.status(401).json({ error: "invalid password" });
      }
    } else {
      res.status(403).json({ error: "email does bot exists" });
    }
  } catch (error) {
    res.status(404).json({ error: "error" });
  }
};
//authenticate the user if user is logged in or not
let authentication = (req, res) => {};
//logout the user
let logoutUser = (req, res) => {
  res.cookie("jwt", "");
  res.status(200).json({ message: "user logout" });
};
//export all the functions
module.exports = {
  postProducts,
  fetchProducts,
  fetchSingleProduct,
  postCategories,
  fetchProductsCategories,
  fetchFeatureProducts,
  filterProductsCategory,
  signupUser,
  loginUser,
  authentication,
  logoutUser,
};
