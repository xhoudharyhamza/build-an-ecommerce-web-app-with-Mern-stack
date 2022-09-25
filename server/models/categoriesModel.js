let mongoose = require("mongoose");
let categoriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});
let ProductCategories = mongoose.model("ProductCategories", categoriesSchema);
module.exports = ProductCategories;
