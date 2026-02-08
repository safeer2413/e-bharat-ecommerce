import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  const menuLinks = [
    { name: "All Product", path: "/allproduct" },
    { name: "Home", path: "/" },
    { name: "Signup", path: "/signup" },
    { name: "Safeerkhan", path: "/user-dashboard" },
    { name: "Login", path: "/login" },
    { name: "logout", path: "/logout" },
    { name: "Admin", path: "/admin-dashboard" },
  ];

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

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-bold">
          {menuLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={desktopLinkClass}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Search */}
        <div className="hidde md:block">
          <SearchBar />

        </div>

        {/* Cart */}
        <Link className="hover:text-black font-bold flex items-center gap-1 hover:bg-pink-400 rounded-lg p-1 text-lg transition-colors duration-300"
          onClick={() => setOpen(false)} to="/cart">
          <FaShoppingCart />[ 0 ]</Link>

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
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={mobileLinkClass}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

        </div>
      )}
    </nav>
  );
}

export default Navbar;