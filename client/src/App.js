import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Context from "./components/GlobalState/Context";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import Home from "./components/Home";
import Category from "./components/Category";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Context>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
          <Route
            exact
            path="/category/:title"
            element={<Category />}
          />
          <Route exact path="/cart" element={<ShoppingCart />} />
        </Routes>
        <Footer/>
      </Context>
    </>
  );
}

export default App;
