import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function About() {
  return (
    <div className="p-10 max-w-6xl mx-auto min-h-screen flex flex-col justify-center items-center text-white space-y-20">

      {/* HEADING */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold">About Us</h2>

        <p className="max-w-2xl text-lg opacity-90">
          ShopEase is a modern e-commerce platform providing top quality
          products with fast delivery, secure payments and trusted service.
        </p>
      </motion.div>


      {/* STORY SECTION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Our Story</h3>

          <p>
            We started our journey with one goal — to make online shopping easy,
            affordable and reliable for everyone. Today, thousands of customers
            trust us for their daily needs.
          </p>

          <p>
            From electronics to fashion, home essentials to gadgets, we bring
            everything to your doorstep with just one click.
          </p>
        </div>

        <div className="p-8 bg-white/10 rounded-xl backdrop-blur-md hover:scale-105 transition">
          <h4 className="font-semibold mb-2">Why customers love us ❤️</h4>
          <ul className="space-y-2 text-sm">
            <li>✔ Fast Delivery</li>
            <li>✔ Easy Returns</li>
            <li>✔ Secure Payments</li>
            <li>✔ 24/7 Support</li>
          </ul>
        </div>
      </motion.div>


      {/* FEATURES */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 w-full"
      >
        {[
          {
            title: "Fast Shipping 🚚",
            desc: "Lightning fast delivery across India."
          },
          {
            title: "Secure Checkout 🔒",
            desc: "Safe payments with trusted gateways."
          },
          {
            title: "Premium Quality ⭐",
            desc: "Verified sellers and best products only."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg"
          >
            <h4 className="font-semibold mb-2">{item.title}</h4>
            <p className="text-sm opacity-90">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>


      {/* STATS */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
      >
        <div>
          <h3 className="text-3xl font-bold">10K+</h3>
          <p className="text-sm opacity-80">Customers</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold">5K+</h3>
          <p className="text-sm opacity-80">Products</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold">24/7</h3>
          <p className="text-sm opacity-80">Support</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold">99%</h3>
          <p className="text-sm opacity-80">Positive Reviews</p>
        </div>
      </motion.div>


      {/* CTA */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.4 }}
        className="bg-white text-black px-8 py-3 rounded-lg font-semibold shadow-lg"
      >
        Start Shopping Now
      </motion.button>

    </div>
  );
}
