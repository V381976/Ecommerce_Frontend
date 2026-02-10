import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/orders/user/${userId}` ,{
         withCredentials: true
         })
      .then(res => setOrders(res.data || []));
  }, []);



  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      <div className="space-y-4">

        {orders.map(o => (
          <div key={o._id} className="bg-white shadow p-4 rounded">

            <p className="font-semibold">₹ {o.totalAmount}</p>
            <p>Status: {o.orderStatus}</p>
            <p>Items: {o.items.length}</p>

          </div>
        ))}

      </div>
    </div>
  );
}
