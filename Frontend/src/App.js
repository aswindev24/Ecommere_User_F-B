import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/users/Home";
import Affiliate from './pages/users/Affiliate';
import About from "./pages/users/About";
import Contact from "./pages/users/Contact";
import Profile from "./pages/users/Profile";
import Cart from "./pages/users/Cart";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Electronics from "./pages/Products/Electronics/Electronics";
import HomeAppliances from './pages/Products/HomeApplicane/HomeApplicane';
import ProductDetail from "./pages/Products/ProductInfo/ProductDetail";
import Fashion from "./pages/Products/Fashion/Fashion";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/homeappliances" element={<HomeAppliances />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/productdetail/:productId" element={<ProductDetail />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

