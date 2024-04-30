import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeContent from './homeContent';
import Login from './login';
import Logout from './logout'; 
import Shop from "./pages/Shop";
import Calendar from './Calendar'; 
import Register from './Register';
import ProductDetails from "./pages/ProductDetails";
import ViewCart from "./pages/ViewCart";
import CategoryPage from "./pages/CategoryPage";
import Blog from "./components/Blog";
import Profile from "./profile";
import FloorPlans from "./components/FloorPlans";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import CheckoutSuccess from "./components/CheckoutSuccess";

function App() {
  localStorage.setItem("API_SERVER_ROOT", "http://localhost:3000")
  return (
    <>
      <div className="overflow-hiffen">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<ViewCart />} />
            <Route path="/products/:category" element={<CategoryPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/Blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/FloorPlans" element={<FloorPlans />} />
          </Routes>
          <Sidebar />
          <Footer />
        </Router>
      </div>
   
    </>
  )
}

export default App
