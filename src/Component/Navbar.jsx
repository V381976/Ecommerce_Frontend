import { useState,useEffect, useRef  } from "react";
import { Link, useNavigate ,useLocation } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [open, setOpen] = useState(false);       // mobile menu
  const [accountOpen, setAccountOpen] = useState(false); // dropdown
   const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const location = useLocation();


  // ⭐ later backend se user fetch kar lena
  useEffect(() => {
  axios
    .get("http://localhost:5000/auth/me", {
      withCredentials: true,
    })
    .then((res) => setUser(res.data))
    .catch(() => setUser(null));
}, [location.pathname]); // ⭐ change


  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null); // clear user
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setAccountOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">

      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* LOGO */}
        <h1 className="text-2xl font-bold">ShopEase</h1>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* LINKS */}
        <div
          className={`md:flex items-center gap-6 font-semibold ${
            open ? "block mt-3 space-y-3" : "hidden md:flex"
          }`}
        >
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/products" className="hover:text-yellow-300">Products</Link>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
          <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
             <Link to="/cart" className="hover:text-yellow-300"> 🛒 </Link>
          {/* ⭐ ACCOUNT DROPDOWN */}
      {/* ACCOUNT AREA */}
<div ref={dropdownRef} className="relative">

  {/* ========== IF USER LOGGED IN ========== */}
  {user ? (
    <>
      <button
        onClick={() => setAccountOpen(!accountOpen)}
        className="flex items-center gap-2 hover:text-yellow-300"
      >
        <div className="w-9 h-9 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <span className="hidden md:block">{user.name}</span>
      </button>

      {accountOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white text-black rounded-xl shadow-xl p-3 space-y-2">

          <div className="border-b pb-2">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <Link to="/profile" className="block hover:bg-gray-100 p-2 rounded">
            Profile
          </Link>

          <Link to="/my-order" className="block hover:bg-gray-100 p-2 rounded">
            My Orders
          </Link>

          <Link to="/settings" className="block hover:bg-gray-100 p-2 rounded">
            Settings
          </Link>

          <button
            onClick={logout}
            className="w-full text-left hover:bg-red-100 text-red-500 p-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </>
  ) : (

    /* ========== IF USER LOGGED OUT ========== */
    <div className="flex gap-3">
      <Link
        to="/login"
        className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black"
      >
        Register
      </Link>
    </div>
  )}
</div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
