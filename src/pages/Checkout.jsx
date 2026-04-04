import { useState } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;
export default function Checkout() {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // adjust if using auth

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");



  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };



 const placeOrder = async () => {

  // ✅ COD flow
  if (paymentMethod === "COD") {

    await axios.post(
      `${API}/orders/create`,
      { userId, address, paymentMethod: "COD" },
      { withCredentials: true }
    );

    alert("Order placed (COD)");
    navigate("/my-order");
    return;
  }


  // ✅ ONLINE flow (Razorpay)
  if (paymentMethod === "ONLINE") {

    // 1️⃣ create order from backend
    const { data: order } = await axios.post( `${API}/payment/create-order`,
      { amount: 500 }, // later cart total bhejna
      { withCredentials: true }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      order_id: order.id,

      handler: async function (response) {

        // 2️⃣ verify + create order in DB
        await axios.post(
          `${API}/orders/create`,
          {
            userId,
            address,
            paymentMethod: "ONLINE",
            paymentId: response.razorpay_payment_id
          },
          { withCredentials: true }
        );

        alert("Payment Success ✅");
        navigate("/my-order");
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }
};




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4">

        <h2 className="text-xl font-bold text-center">Checkout</h2>

        <input name="fullName" placeholder="Full Name" onChange={handleChange} className="input" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
        <input name="address" placeholder="Address" onChange={handleChange} className="input" />
        <input name="city" placeholder="City" onChange={handleChange} className="input" />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} className="input" />

        <select
          value={paymentMethod}
          onChange={(e)=>setPaymentMethod(e.target.value)}
          className="input"
        >
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment</option>
        </select>

        <button
          onClick={placeOrder}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Place Order
        </button>

      </div>
    </div>
  );
}
