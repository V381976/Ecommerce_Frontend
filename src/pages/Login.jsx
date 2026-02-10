import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AuthLayout from "../Component/AuthLayout";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/auth/login", // ✅ correct backend route
        form,
        { withCredentials: true } // ⭐ cookie important
      );

      toast.success("Login successful ✅");
        navigate("/");
      // window.location.reload();

    // redirect after login
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-lg text-black focus:scale-105 transition"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-lg text-black focus:scale-105 transition"
        />

        <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-lg hover:scale-105 transition">
          Login
        </button>

      </form>

      <p className="text-center mt-4 text-sm">
        Don't have account?{" "}
        <Link to="/signup" className="text-yellow-300 font-semibold">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
