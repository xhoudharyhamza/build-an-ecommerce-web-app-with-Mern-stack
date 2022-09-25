let express = require("express");
let router = express.Router();
let ProductCategories = require("../models/categoriesModel");
let {
  postProducts,
  fetchProducts,
  fetchSingleProduct,
  postCategories,
  fetchProductsCategories,
  fetchFeatureProducts,
  filterProductsCategory,
} = require("../controllers/index");
router.get("/products", fetchProducts);
router.post("/products", postProducts);
router.post("/products/categories", postCategories);
router.get("/products/categories", fetchProductsCategories);
router.get("/products/feature", fetchFeatureProducts);
router.get("/products/:id", fetchSingleProduct);
router.get("/products/categories/:category", filterProductsCategory);
module.exports = router;
