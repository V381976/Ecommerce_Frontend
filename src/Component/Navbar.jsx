import { useState,useEffect, useRef  } from "react";
import { Link, useNavigate ,useLocation } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
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
    .get(`${API}/auth/me`, {
      withCredentials: true,
    })
    .then((res) => setUser(res.data))
    .catch(() => setUser(null));
}, [location.pathname]); // ⭐ change


  const logout = async () => {
    try {
      await axios.post(
        `${API}/auth/logout`,
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

  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

    {/* ================= LOGO ================= */}
    <Link to="/" className="text-2xl font-bold tracking-wide">
      ShopEase
    </Link>

    {/* ================= DESKTOP LINKS ================= */}
    <div className="hidden md:flex items-center gap-8 font-semibold">

      <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
      <Link to="/products" className="hover:text-yellow-300 transition">Products</Link>
      <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
      <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>

      {/* Cart */}
      <Link to="/cart" className="text-xl hover:text-yellow-300">
        🛒
      </Link>

      {/* ================= ACCOUNT ================= */}
      <div ref={dropdownRef} className="relative">

        {user ? (
          <>
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="flex items-center gap-2 hover:text-yellow-300"
            >
              <div className="w-9 h-9 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              <span>{user.name}</span>
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
          <div className="flex gap-3">
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>


    {/* ================= MOBILE MENU BUTTON ================= */}
    <button
      className="md:hidden text-3xl"
      onClick={() => setOpen(!open)}
    >
      ☰
    </button>
  </div>


  {/* ================= MOBILE MENU ================= */}
  {open && (
    <div className="md:hidden bg-black/40 backdrop-blur-md px-6 pb-6 space-y-4 font-semibold animate-fadeIn">

      <Link onClick={() => setOpen(false)} to="/" className="block">Home</Link>
      <Link onClick={() => setOpen(false)} to="/products" className="block">Products</Link>
      <Link onClick={() => setOpen(false)} to="/about" className="block">About</Link>
      <Link onClick={() => setOpen(false)} to="/contact" className="block">Contact</Link>
      <Link onClick={() => setOpen(false)} to="/cart" className="block">🛒 Cart</Link>

      {user ? (
        <>
          <Link onClick={() => setOpen(false)} to="/profile" className="gap-2 " >Profile</Link>
          <Link onClick={() => setOpen(false)} to="/my-order" className="gap-2 ml-4">My Orders</Link>
          <button onClick={logout} className="text-red-400">Logout</button>
        </>
      ) : ( 
        <div className="flex gap-3 pt-3">
          <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-lg">
            Login
          </Link>
          <Link to="/signup" className="border border-white px-4 py-2 rounded-lg">
            Register
          </Link>
        </div>
      )}
    </div>
  )}

</nav>

  );
}

export default Navbar;
