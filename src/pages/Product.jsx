import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Component/ProductCard";
import { Toaster } from "react-hot-toast";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // ================= FETCH PRODUCTS + CATEGORIES =================
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ================= FILTER LOGIC =================
  const filteredProducts = products.filter((p) => {
    const matchTitle = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "ALL"
        ? true
        : p.category === selectedCategory;

    return matchTitle && matchCategory;
  });

  return (
    <div className="p-6">

      <Toaster position="top-right" />

      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {/* ================= SEARCH BAR ================= */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 border px-4 py-2 rounded-lg mb-4"
      />

      {/* ================= CATEGORY FILTER ================= */}
      <div className="flex gap-2 flex-wrap mb-6">

        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`px-4 py-1 rounded-full border ${
            selectedCategory === "ALL"
              ? "bg-indigo-600 text-white"
              : "bg-white"
          }`}
        >
          All
        </button>

        {categories.map((c) => (
          <button
            key={c._id}
            onClick={() => setSelectedCategory(c.name)}
            className={`px-4 py-1 rounded-full border ${
              selectedCategory === c.name
                ? "bg-indigo-600 text-white"
                : "bg-white"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* ================= PRODUCT GRID ================= */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found
        </p>
      ) : (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6
          "
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Product;
