import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Home() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]); // ⭐ NEW

  const navigate = useNavigate();

  /* ================= FETCH ALL ================= */
  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then(res => setProducts(res.data));
    axios.get("http://localhost:5000/api/categories").then(res => setCategories(res.data));
    axios.get("http://localhost:5000/api/brands").then(res => setBrands(res.data));

    // ⭐ OFFER FETCH
    axios.get("http://localhost:5000/api/offer").then(res => setOffers(res.data));
  }, []);

 

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="min-h-screen text-white px-6">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10 py-20">
        <motion.div variants={fadeLeft} initial="hidden" animate="show" className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            Welcome to <span className="text-yellow-300">ShopEase</span>
          </h1>
          <Link to="/products" className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold">
            Shop Now
          </Link>
        </motion.div>

        <motion.img
          variants={fadeRight}
          initial="hidden"
          animate="show"
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
          className="rounded-3xl shadow-2xl"
        />
      </section>


      {/* ================= CATEGORIES ================= */}
 <section className="max-w-7xl mx-auto py-10">
  <h2 className="text-2xl font-semibold mb-6">Categories</h2>

  <div className="flex gap-4 overflow-x-auto scrollbar-hide">

    {categories.slice(0, 8).map((c) => {
      const offer = offers.find(o => o.category?._id === c._id);

      return (
        <Link
          key={c._id}
          to={`/products?category=${c.name}`}
          className="relative bg-white/20 px-6 py-3 rounded-xl whitespace-nowrap hover:bg-white hover:text-black transition flex items-center gap-2"
        >
          {c.name}

          {/* ⭐ INSIDE BADGE (NO CUT EVER) */}
          {offer && (
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">
              {offer.discountPercent}% OFF
            </span>
          )}
        </Link>
      );
    })}

  </div>
</section>




      {/* ================= BRANDS ================= */}
   <section className="max-w-7xl mx-auto py-10">
  <h2 className="text-2xl font-semibold mb-6">Brands</h2>

  <div className="flex gap-4 overflow-x-auto scrollbar-hide">

    {brands.slice(0, 8).map((b) => {
      const offer = offers.find(o => o.brand?._id === b._id);

      return (
        <Link
          key={b._id}
          to={`/products?brand=${b.name}`}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl whitespace-nowrap flex items-center gap-2 hover:scale-105 transition"
        >
          {b.name}

          {offer && (
            <span className="bg-red-600 text-white text-[10px] px-2 py-[2px] rounded-full">
              {offer.discountPercent}% OFF
            </span>
          )}
        </Link>
      );
    })}

  </div>
</section>




      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto py-12">
        <h2 className="text-2xl font-semibold mb-8">Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {products.slice(0, 8).map((p) => (
            <div
              key={p._id}
              className="bg-white text-black rounded-xl p-4 shadow hover:scale-105 transition"
            >
              <img
                onClick={() => navigate(`/products/${p._id}`)}
                src={`http://localhost:5000/${p.thumbnail}`}
                className="h-36 w-full object-cover rounded"
              />

              <h3 className="mt-3 font-semibold line-clamp-1">{p.title}</h3>
              <p className="text-green-600 font-bold">₹ {p.price}</p>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

export default Home;
