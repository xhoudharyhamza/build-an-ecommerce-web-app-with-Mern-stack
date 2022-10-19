let express = require("express");
let router = express.Router();
let ProductCategories = require("../models/categoriesModel");
let authenticateUser= require('../middlewares/authMiddleware')
let {
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
} = require("../controllers/index");
router.get("/products", fetchProducts);
router.post("/products", postProducts);
router.post("/products/categories", postCategories);
router.get("/products/categories", fetchProductsCategories);
router.get("/products/feature", fetchFeatureProducts);
router.get("/products/:id", fetchSingleProduct);
router.get("/products/categories/:category", filterProductsCategory);
router.post('/accounts/signup', signupUser)
router.post('/accounts/login', loginUser)
router.get('/auth', authenticateUser , authentication)
router.get('/accounts/logout', logoutUser)
//exports the router
module.exports = router;
