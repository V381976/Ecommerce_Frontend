import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCartPlus, FaStar } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");


 

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setActiveImage(res.data.thumbnail);
      })
      .catch((err) => console.log(err));
  }, [id]);


     const addToCart = async () => {
    await axios.post(
      "http://localhost:5000/cart/add",
      { productId: product._id },
      { withCredentials: true }
    );
  }
    toast.success("Added to cart");

  if (!product) return <p className="p-6">Loading...</p>;

  const discountPrice =
    product.discountPercent
      ? product.price - (product.price * product.discountPercent) / 100
      : product.price;

  return (
    // ✅ Background added
    <div className="min-h-screen  p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 hover:underline"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT IMAGE GALLERY */}
          <div>
            <img
              src={`http://localhost:5000/${activeImage}`}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />

            <div className="flex gap-3 mt-3">
              {[product.thumbnail, ...(product.images || [])].map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000/${img}`}
                  onClick={() => setActiveImage(img)}
                  className="h-20 w-20 object-cover rounded cursor-pointer border hover:border-black"
                />
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="space-y-4">

            <h2 className="text-3xl font-bold">{product.title}</h2>

            <p className="text-gray-500">
              Brand: {product.brand} | Category: {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar />
              {product.rating || 4}
            </div>

            {/* ✅ PRICE (INR formatted) */}
            <div>
              {product.discountPercent ? (
                <>
                  <span className="text-3xl font-bold text-green-600">
                    ₹ {discountPrice}
                  </span>

                  <span className="line-through ml-3 text-gray-400">
                    ₹ {product.price}
                  </span>

                  <span className="ml-2 text-red-500">
                    {product.discountPercent}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-green-600">
                  ₹ {product.price}
                </span>
              )}
            </div>

            {/* Stock */}
            <p className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Description */}
            <p className="text-gray-600">{product.description}</p>

            {/* Warranty + Return */}
            <div className="bg-gray-100 p-3 rounded-lg text-sm">
              <p>Warranty: {product.warrantyInformation || "No warranty"}</p>
              <p>Return: {product.returnPolicy || "No return policy"}</p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={addToCart}
              className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition"
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
