import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function Navbar() {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
    toast.success("Logout Successfull");
  };

  const mobileLinkClass =
    "hover:text-black hover:bg-pink-600 rounded-lg py-2 transition-colors duration-300";

  const desktopLinkClass =
    "hover:text-black hover:bg-pink-400 rounded-lg p-1 transition-colors duration-300";

  return (
    <nav className="sticky top-0 z-40 bg-pink-600 text-white px-6 py-3">
      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold border-2 border-white px-2 rounded-lg 
transition-transform duration-300 hover:scale-105 
inline-block transform-gpu origin-center">
          <Link to="/">E-Bharat</Link>
        </div>

        <ul className="hidden md:flex gap-6 text-sm font-bold">

          <li className={desktopLinkClass}>
            <Link to="/">Home</Link>
          </li>

          <li className={desktopLinkClass}>
            <Link to="/allproduct">All Product</Link>
          </li>

          {/* Signup */}
          {!user && (
            <li className={desktopLinkClass}>
              <Link to="/signup">Signup</Link>
            </li>
          )}

          {/* Login */}
          {!user && (
            <li className={desktopLinkClass}>
              <Link to="/login">Login</Link>
            </li>
          )}

          {/* User */}
          {user?.role === "User" && (
            <li className={desktopLinkClass}>
              <Link to="/user-dashboard" className="text-gray-800 [text-shadow:1px_1px_2px_white]">{user.name}</Link>
            </li>
          )}

          {/* Admin */}
          {user?.role === "Admin" && (
            <li className={desktopLinkClass}>
              <Link to="/admin-dashboard">Admin</Link>
            </li>
          )}

          {/* Logout  */}
          {user && (
            <li className={desktopLinkClass} onClick={logout}>
              Logout
            </li>
          )}

        </ul>

        {/* Desktop Search */}
        <div className="hidde md:block">
          <SearchBar />

        </div>

        {/* Cart */}
        <Link className="hover:text-black font-bold flex items-center gap-1 hover:bg-pink-400 rounded-lg p-1 text-lg transition-colors duration-300"
          onClick={() => setOpen(false)} to="/cart">
          <div className="relative">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png"
              alt="cart"
              className="w-9"
            />

            <span className="absolute top-1 right-1 text-white 
    text-sm w-6 h-6 flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-pink-400 rounded-lg p-4 flex flex-col gap-4 text-center font-bold w-48 mx-auto">

          <Link to="/allproduct" className={mobileLinkClass}>All Product</Link>


          {!user && (
            <Link to="/signup" className={mobileLinkClass}>Signup</Link>
          )}

          {!user && (
            <Link to="/login" className={mobileLinkClass}>Login</Link>
          )}

          {user?.role === "User" && (
            <Link to="/user-dashboard" className={`text-gray-800 [text-shadow:1px_1px_2px_white] ${mobileLinkClass}`}>{user.name}</Link>
          )}

          {user?.role === "Admin" && (
            <Link to="/admin-dashboard" className={mobileLinkClass}>Admin</Link>
          )}

          {user && (
            <div className="cursor-pointer" onClick={logout}>
              Logout
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;