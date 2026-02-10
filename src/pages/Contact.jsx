import React from "react";
import { motion } from "framer-motion";

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  return (
    <div className="min-h-screen px-6 py-16 flex items-center justify-center">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

        {/* ================= LEFT SIDE FORM ================= */}
      <motion.form
  variants={fadeLeft}
  initial="hidden"
  animate="show"
  className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 space-y-6 border border-gray-200"
>

  {/* Heading */}
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
    <p className="text-gray-500 text-sm">
      Fill the form and we’ll respond within 24 hours
    </p>
  </div>


  {/* Name */}
  <div className="relative">
    <input
      type="text"
      required
      placeholder=" "
      className="peer w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
    />
    <label className="absolute left-3 -top-2 text-xs bg-white px-1 text-gray-500 peer-focus:text-indigo-600">
      Full Name
    </label>
  </div>


  {/* Email */}
  <div className="relative">
    <input
      type="email"
      required
      placeholder=" "
      className="peer w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
    />
    <label className="absolute left-3 -top-2 text-xs bg-white px-1 text-gray-500 peer-focus:text-indigo-600">
      Email Address
    </label>
  </div>


  {/* Subject */}
  <div className="relative">
    <input
      type="text"
      placeholder=" "
      className="peer w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
    />
    <label className="absolute left-3 -top-2 text-xs bg-white px-1 text-gray-500 peer-focus:text-indigo-600">
      Subject
    </label>
  </div>


  {/* Message */}
  <div className="relative">
    <textarea
      rows="4"
      required
      placeholder=" "
      className="peer w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
    />
    <label className="absolute left-3 -top-2 text-xs bg-white px-1 text-gray-500 peer-focus:text-indigo-600">
      Message
    </label>
  </div>


  {/* Button */}
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg"
  >
    Send Message 🚀
  </motion.button>

</motion.form>




        {/* ================= RIGHT SIDE INFO ================= */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="show"
          className="text-white space-y-8"
        >
          <div>
            <h2 className="text-4xl font-bold mb-4">Contact Information</h2>
            <p className="opacity-90">
              Need help with your order or have a question about our products?
              Our support team is available 24/7 to assist you.
            </p>
          </div>

          {/* INFO CARDS */}
          <div className="space-y-5">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-5 rounded-xl"
            >
              <h4 className="font-semibold">📞 Phone</h4>
              <p className="text-sm opacity-90">+91 98765 43210</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-5 rounded-xl"
            >
              <h4 className="font-semibold">📧 Email</h4>
              <p className="text-sm opacity-90">support@shopease.com</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-5 rounded-xl"
            >
              <h4 className="font-semibold">📍 Address</h4>
              <p className="text-sm opacity-90">
                Connaught Place, New Delhi, India
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md p-5 rounded-xl"
            >
              <h4 className="font-semibold">⏰ Working Hours</h4>
              <p className="text-sm opacity-90">
                Mon – Sun : 9:00 AM – 9:00 PM
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
