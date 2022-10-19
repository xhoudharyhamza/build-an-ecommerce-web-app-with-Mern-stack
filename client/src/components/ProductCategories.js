import React, { useContext} from "react";
import { ProductsContext } from "./GlobalState/Context";
const ProductCategories = () => {
  let { categories, filterProducts } = useContext(ProductsContext);
  // fetch products according user filter the product
  let handleChange = async (e) => {
    let filterValue = e.target.value;
    filterProducts(filterValue);
  };
  return (
    <>
      {categories ? (
        <div className="product-categories">
          <label htmlFor="categories">Filter Products</label>
          <select id="categories" onChange={handleChange}>
            <option value="all">All Categories</option>
            {categories.map((category, index) => {
              return (
                <option value={category.title} key={index}>
                  {category.title}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
    </>
  );
};

export default ProductCategories;
