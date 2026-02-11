import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCartPlus, FaStar } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL;

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");


  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    axios
      .get(`${API}/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setActiveImage(res.data.thumbnail);
      })
      .catch(console.log);
  }, [id]);


  /* ================= ADD TO CART ================= */
  const addToCart = async () => {
    try {
      await axios.post(
        `${API}/cart/add`,
        { productId: product._id },
        { withCredentials: true }
      );

      toast.success("Added to cart 🛒");

    } catch {
      navigate("/login");
    }
  };


  if (!product) return <p className="p-6">Loading...</p>;


  const hasOffer = product.discountPercent > 0;


  return (
    <div className="min-h-screen p-6">

      <div className="max-w-7xl mx-auto bg-amber-300 rounded-2xl shadow-xl p-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 hover:underline"
        >
          🔙 Back
        </button>


        <div className="grid md:grid-cols-2 gap-10">


          {/* ================= LEFT IMAGES ================= */}
          <div>
            <img
              src={`${API}/${activeImage}`}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />

            <div className="flex gap-3 mt-3">
              {[product.thumbnail, ...(product.images || [])].map((img, i) => (
                <img
                  key={i}
                  src={`${API}/${img}`}
                  onClick={() => setActiveImage(img)}
                  className="h-20 w-20 object-cover rounded cursor-pointer border hover:border-black"
                />
              ))}
            </div>
          </div>



          {/* ================= RIGHT DETAILS ================= */}
          <div className="space-y-4">

            <h2 className="text-3xl font-bold">{product.title}</h2>


            {/* BRAND + CATEGORY */}
            <p className="text-gray-600">
              Brand: {product.brand?.name || "-"} | 
              Category: {product.category?.name || "-"}
            </p>


            {/* RATING */}
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar />
              {product.rating || 4}
            </div>


            {/* ================= PRICE + OFFER ================= */}
            {hasOffer ? (
              <div className="flex items-center gap-3">

                <span className="text-3xl font-bold text-green-600">
                  ₹ {product.finalPrice}
                </span>

                <span className="line-through text-gray-400">
                  ₹ {product.price}
                </span>

                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                  {product.discountPercent}% OFF
                </span>

              </div>
            ) : (
              <span className="text-3xl font-bold text-green-600">
                ₹ {product.price}
              </span>
            )}


            {/* STOCK */}
            <p className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>


            {/* DESCRIPTION */}
            <p className="text-gray-600">{product.description}</p>


            {/* WARRANTY */}
            <div className="bg-amber-200 p-3 font-mono rounded-lg text-sm">
              <p>Warranty: {product.warrantyInformation || "No warranty"}</p>
              <p>Return: {product.returnPolicy || "No return policy"}</p>
            </div>


            {/* ADD TO CART */}
            <button
              onClick={addToCart}
              className="bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition"
            >
              <FaCartPlus />
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
