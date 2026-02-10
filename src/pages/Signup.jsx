import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AuthLayout from "../Component/AuthLayout";
import { toast, Toaster } from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/auth/signup",
        form,
        { withCredentials: true } // ⭐ cookie important
      );

      toast.success("Signup successful 🎉");

      navigate("/products"); // redirect after signup
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <AuthLayout>
       
      <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 rounded-lg text-black focus:scale-105 transition"
        />

        <input
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
          Sign Up
        </button>

      </form>

      <p className="text-center mt-4 text-sm">
        Already have account?{" "}
        <Link to="/login" className="text-yellow-300 font-semibold">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
