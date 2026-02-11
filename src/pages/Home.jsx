import { Link, useNavigate } from "react-router-dom";
import  { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
const API = import.meta.env.VITE_API_URL;

function Home() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [banners, setBanners] = useState([]);

  const [index, setIndex] = useState(0);
  const [pause, setPause] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchAll = async () => {
      const [p, c, b, o, ba] = await Promise.all([
        axios.get(`${API}/api/products`),
        axios.get(`${API}/api/categories`),
        axios.get(`${API}/api/brands`),
        axios.get(`${API}/api/offers`),
        axios.get(`${API}/api/banner`),
      ]);

      setProducts(p.data);
      setCategories(c.data);
      setBrands(b.data);
      setOffers(o.data);
      setBanners(ba.data);
    };

    fetchAll();
  }, []);

  /* ================= AUTO SLIDER ================= */
  useEffect(() => {
    if (!banners.length || pause) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [banners, pause]);

  const next = () => setIndex((index + 1) % banners.length);
  const prev = () =>
    setIndex((index - 1 + banners.length) % banners.length);

  return (
    <div className="min-h-screen text-white px-6 ">

      {/* ================= HERO BANNER SLIDER ================= */}
     {/* ================= HERO BANNER SLIDER ================= */}
{/* ================= HERO BANNER SLIDER ================= */}
{banners.length > 0 && (
  <div
    className="w-full pt-5 relative"
    onMouseEnter={() => setPause(true)}
    onMouseLeave={() => setPause(false)}
  >
    {/* PERFECT RESPONSIVE HEIGHT */}
    <div className="relative w-full aspect-16/6 sm:aspect-16/5 md:aspect-16/4 rounded-3xl overflow-hidden shadow-2xl bg-black">

      <AnimatePresence mode="wait">
       <motion.img
  key={index}
  src={`${API}/${banners[index].image}`}
  onClick={() => navigate(banners[index].link)}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
  className="
    absolute inset-0
    w-full h-full
    object-cover   /* ⭐ IMPORTANT FIX */
    cursor-pointer
    select-none " />

      </AnimatePresence>

      {/* arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur px-4 py-2 rounded-full text-black"
      >
        ❮
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 backdrop-blur px-4 py-2 rounded-full text-black"
      >
        ❯
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  </div>
)}


      {/* ================= OFFER STRIP ================= */}
      {offers.length > 0 && (
        <div className="max-w-7xl mx-auto mb-6 mt-5 bg-linear-to-r from-red-600 to-pink-600 py-3 px-6 rounded-xl text-center font-semibold shadow-lg">
          🔥 {offers[0]?.discountPercent}% OFF – Limited Time Offer!
        </div>
      )}

     
{/* ================= CATEGORIES ================= */}
<section className="max-w-7xl mx-auto py-14">
  <h2 className="text-3xl font-bold mb-10 text-center">Shop by Categories</h2>

  <div className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    gap-6
  ">
    {categories.slice(0, 10).map((c) => {
      const offer = offers.find(o => o.category?._id === c._id);

      return (
        <Link
          key={c._id}
          to={`/products?category=${c.name}`}
          className="
            group
            relative
            h-28
            flex
            items-center
            justify-center
            rounded-2xl
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            shadow-xl
            hover:bg-white/20
            hover:scale-105
            hover:shadow-2xl
            transition-all
            duration-300
            text-center
            font-semibold
            text-white
          "
        >
          {/* category name */}
          <span className="capitalize tracking-wide group-hover:text-yellow-300 transition">
            {c.name}
          </span>

          {/* offer badge */}
          {offer && (
            <span className="
              absolute
              -top-3
              -right-3
              bg-red-500
              text-xs
              font-bold
              px-4
              py-2
              rounded-full
              shadow-lg
              animate-pulse
            ">
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
            <motion.div
              key={p._id}
              whileHover={{ scale: 1.05 }}
              className="bg-amber-300 text-black rounded-xl p-4 shadow cursor-pointer"
              onClick={() => navigate(`/products/${p._id}`)}
            >
              <img
                src={`${API}/${p.thumbnail}`}
                className="h-36 w-full object-cover rounded"
              />
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="text-green-600 font-bold">₹ {p.price}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
