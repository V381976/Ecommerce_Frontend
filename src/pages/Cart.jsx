import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Cart() {
  const [cart, setCart] = useState(null);

  const fetchCart = () => {
    axios
      .get("http://localhost:5000/cart", {
        withCredentials: true,
      })
      .then((res) => setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (productId, qty) => {
    if (qty < 1) return;

    await axios.post(
      "http://localhost:5000/cart/update",
      { productId, quantity: qty },
      { withCredentials: true }
    );

    fetchCart();

  
  };
   // ✅ USD → INR converter (2 decimal + Indian format)
 

  const removeItem = async (productId) => {
    await axios.post(
      "http://localhost:5000/cart/remove",
      { productId },
      { withCredentials: true }
    );

    fetchCart();

    
  };

  if (!cart) return <p className="p-6 text-white">Loading...</p>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-8">

      <h2 className="text-3xl font-bold text-white mb-8">🛒 My Cart</h2>

      {cart.items.length === 0 && (
        <p className="text-white text-lg">Cart is empty</p>
      )}

      <div className="space-y-6">

        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl shadow-lg p-4"
          >
            {/* IMAGE */}
            <img
              src={`http://localhost:5000/${item.product.thumbnail}`}
              className="w-28 h-28 rounded-lg object-cover"
              alt=""
            />

            {/* INFO */}
            <div className="flex-1">
              <h3 className="font-bold">{item.product.title}</h3>
              <p>₹ {item.product.price}</p>
            </div>

            {/* QTY */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateQty(item.product._id, item.quantity - 1)
                }
                className="bg-gray-200 px-3 rounded"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQty(item.product._id, item.quantity + 1)
                }
                className="bg-gray-200 px-3 rounded"
              >
                +
              </button>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(item.product._id)}
              className="text-red-500 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}

        {cart.items.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-right">
            <h3 className="text-xl font-bold mb-3">
              Total: ₹ {total}
            </h3>

           <Link  to = "/checkout"className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
              Checkout
           </Link>
          </div>
        )}
      </div>
    </div>
  );
}
