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
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import About from "./components/About";
function App() {
  return (
    <>
      <Context>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<ProductDetails />} />
          <Route exact path="/category/:title" element={<Category />} />
          <Route exact path="/accounts/signup" element={<Signup />} />
          <Route exact path="/accounts/login" element={<Login />} />
          <Route exact path="/accounts/logout" element={<Logout />} />
          <Route exact path="/user/about" element={<About />} />
          <Route exact path="/cart" element={<ShoppingCart />} />
        </Routes>
        <Footer />
      </Context>
    </>
  );
}

export default App;
