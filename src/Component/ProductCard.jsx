import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductCard({ product }) {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();


 

  const addToCart = async () => {
    await axios.post(
      "http://localhost:5000/cart/add",
      { productId: product._id },
      { withCredentials: true }
    );

    toast.success("Added to cart");
  };

  const handleAddToCart = async (id) => {
  try {
    await axios.get("http://localhost:5000/auth/me", {
      withCredentials: true
    });

    // user logged in
    addToCart(id);

  } catch {
    navigate("/login");
  }
};


  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-4 flex flex-col">

      {/* IMAGE */}
      <img
        onClick={() => navigate(`/products/${product._id}`)}
        src={`http://localhost:5000/${product.thumbnail}`}
        alt={product.title}
        className="h-48 w-full object-cover rounded-lg cursor-pointer"
      />

      {/* TITLE */}
      <h3 className="font-semibold text-lg mt-3">{product.title}</h3>

      {/* ✅ PRICE (INR formatted) */}
      <p className="text-green-600 font-bold text-xl">
        ₹ {product.price}
      </p>

      {/* DESCRIPTION */}
      <p className="text-gray-500 text-sm mt-2">
        {showMore
          ? product.description
          : product.description?.slice(0, 60) + "..."}
      </p>

      {/* SHOW MORE */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 text-sm mt-1"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>

      {/* ADD TO CART */}
      <button
       onClick={() => handleAddToCart(product._id)}
        className="mt-3 bg-black text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-800"
      >
        <FaCartPlus />
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;

