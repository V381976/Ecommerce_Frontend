import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/auth/me`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  return children;
}
