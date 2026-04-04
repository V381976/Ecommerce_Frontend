import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import ProtectedRoute from "./Component/ProtectedRoute";

import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";

//  create these pages
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";


function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />
      <div className="bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">

        <Navbar />

        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

         

          {/* 🔒 PROTECTED */}
       <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout/>
              </ProtectedRoute>
            }
          />
            <Route
            path="/my-order"
            element={
              <ProtectedRoute>
                <MyOrders/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
  path="/cart"
  element={
    <ProtectedRoute>
     <Cart/>
    </ProtectedRoute>
  }
/>
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
