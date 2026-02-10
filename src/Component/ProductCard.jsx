import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

function ProductCard({ product, offers }) {

  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();


  /* ================= OFFER FIND ================= */
  const offer = offers?.find(o =>
    (o.category?._id === product.category) ||
    (o.brand?._id === product.brand)
  );

  const finalPrice = offer
    ? Math.floor(product.price - (product.price * offer.discountPercent) / 100)
    : product.price;



  /* ================= ADD TO CART ================= */
  const addToCart = async () => {
    await axios.post(
      `${API}/cart/add`,
      { productId: product._id },
      { withCredentials: true }
    );

    toast.success("Added to cart");
  };

  const handleAddToCart = async () => {
    try {
      await axios.get(`${API}/auth/me`, {
        withCredentials: true
      });

      addToCart();
    } catch {
      navigate("/login");
    }
  };


  return (
    <div
      className={`relative bg-amber-300 rounded-xl p-4 flex flex-col transition-all duration-300
      ${offer
        ? "border-2 border-red-500 shadow-lg hover:shadow-red-300"
        : "shadow-md hover:shadow-2xl"}
      hover:-translate-y-2`}
    >

      {/* ⭐ OFFER BADGE */}
      {offer && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
          {offer.discountPercent}% OFF
        </div>
      )}


      {/* IMAGE */}
      <img
        onClick={() => navigate(`/products/${product._id}`)}
        src={`${API}/${product.thumbnail}`}
        alt={product.title}
        className="h-48 w-full object-cover rounded-lg cursor-pointer"
      />


      {/* TITLE */}
      <h3 className="font-semibold text-lg mt-3">{product.title}</h3>


      {/* ================= PRICE ================= */}
      {offer ? (
        <div className="mt-2 flex items-center gap-2">

          <span className="text-gray-400 line-through text-sm">
            ₹ {product.price}
          </span>

          <span className="text-green-600 font-bold text-xl">
            ₹ {finalPrice}
          </span>

        </div>
      ) : (
        <p className="text-green-600 font-bold text-xl mt-2">
          ₹ {product.price}
        </p>
      )}


      {/* DESCRIPTION */}
      <p className="text-gray-500 text-sm mt-2">
        {showMore
          ? product.description
          : product.description?.slice(0, 60) + "..."}
      </p>


      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 text-sm mt-1"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>


      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        className="mt-3 bg-amber-700 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-800"
      >
        <FaCartPlus />
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;
