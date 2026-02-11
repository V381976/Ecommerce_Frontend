import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function ProductCard({ product }) {

  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  /* ================= OFFER CHECK (FROM BACKEND) ================= */
  const hasOffer = product.discountPercent > 0;

  /* ================= ADD TO CART ================= */
  const addToCart = async () => {
    try {
      await axios.post(
        `${API}/cart/add`,
        { productId: product._id },
        { withCredentials: true }
      );

      toast.success("Added to cart 🛒");

    } catch (err) {
      toast.error("Failed to add cart");
    }
  };

  /* ================= LOGIN CHECK ================= */
  const handleAddToCart = async () => {
    try {
      await axios.get(`${API}/auth/me`, {
        withCredentials: true
      });

      addToCart();

    } catch {
      toast.error("Please login first");
      navigate("/login");
    }
  };


  return (
    <div
      className={`relative bg-amber-300 rounded-xl p-4 flex flex-col
      transition-all duration-300 hover:-translate-y-2
      ${hasOffer
        ? "border-2 border-red-500 shadow-lg hover:shadow-red-300"
        : "shadow-md hover:shadow-2xl"
      }`}
    >

      {/* ================= OFFER BADGE ================= */}
      {hasOffer && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
          {product.discountPercent}% OFF
        </div>
      )}


      {/* ================= IMAGE ================= */}
      <img
        onClick={() => navigate(`/products/${product._id}`)}
        src={`${API}/${product.thumbnail}`}
        alt={product.title}
        className="h-48 w-full object-cover rounded-lg cursor-pointer"
      />


      {/* ================= TITLE ================= */}
      <h3 className="font-semibold text-lg mt-3 line-clamp-1">
        {product.title}
      </h3>


      {/* ================= PRICE ================= */}
      {hasOffer ? (
        <div className="mt-2 flex items-center gap-2">

          <span className="text-gray-400 line-through text-sm">
            ₹{product.price}
          </span>

          <span className="text-green-600 font-bold text-xl">
            ₹{product.finalPrice}
          </span>

        </div>
      ) : (
        <p className="text-green-600 font-bold text-xl mt-2">
          ₹{product.price}
        </p>
      )}


      {/* ================= DESCRIPTION ================= */}
      <p className="text-gray-600 text-sm mt-2 grow">
        {showMore
          ? product.description
          : product.description?.slice(0, 60) + "..."}
      </p>

      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-600 text-xs mt-1"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>


      {/* ================= ADD TO CART ================= */}
      <button
        onClick={handleAddToCart}
        className="mt-3 bg-amber-700 text-white rounded-lg py-2
        flex items-center justify-center gap-2
        hover:bg-gray-900 transition"
      >
        <FaCartPlus />
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;
