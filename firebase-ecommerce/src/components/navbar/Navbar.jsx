import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa6";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import MyContext from "../../context/MyContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const { profile } = useContext(MyContext);
  const navigate = useNavigate();
  const userCartItems = cartItems.filter((obj) => obj.userid === profile?.uid);
  const wishlistItems = useSelector(state => state.wishlist);
  const userWishlist = wishlistItems.filter(item => item.userid === profile?.uid)

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("profile");
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

        <ul className="hidden lg:flex gap-6 text-lg font-bold">

          <li className={desktopLinkClass}>
            <Link to="/">Home</Link>
          </li>

          <li className={desktopLinkClass}>
            <Link to="/allproduct">All Product</Link>
          </li>

          {/* Signup */}
          {!profile && (
            <li className={desktopLinkClass}>
              <Link to="/signup">Signup</Link>
            </li>
          )}

          {/* Login */}
          {!profile && (
            <li className={desktopLinkClass}>
              <Link to="/login">Login</Link>
            </li>
          )}

          {/* User */}
          {profile?.role === "user" && (
            <li className={desktopLinkClass}>
              <Link to="/user-dashboard"
                className="text-gray-800 [text-shadow:1px_1px_2px_white]">
                {profile.name}
              </Link>
            </li>
          )}

          {/* Admin */}
          {profile?.role === "admin" && (
            <li className={desktopLinkClass}>
              <Link to="/admin-dashboard">Admin</Link>
            </li>
          )}

          {/* Logout  */}
          {profile && (
            <li className={desktopLinkClass} onClick={logout}>
              Logout
            </li>
          )}

        </ul>

        {/* Desktop Search */}
        <div className="">
          <SearchBar />

        </div>

        {/* Wishlist */}
        <Link
          to="/wishlist"
          className="relative flex items-center justify-center bg-white 
                      rounded-full p-2 shadow-md hover:bg-pink-100 hover:scale-105
                      transition-all duration-300"
        >
          <FaHeart className="text-pink-600 text-xl" />

          {userWishlist.length > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold
                          rounded-full min-w-[20px] h-5 flex items-center justify-center"
            >
              {userWishlist.length}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link className="hover:text-black font-bold flex items-center gap-1 hover:bg-pink-400
                          rounded-lg p-1 text-lg transition-colors duration-300"
          onClick={() => setOpen(false)} to="/cart">
          <div className="relative">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png"
              alt="cart"
              className="w-9"
            />

            <span className="absolute top-1 right-1 text-white 
                               text-sm w-6 h-6 flex items-center justify-center">
              {userCartItems.length}
            </span>
          </div>
        </Link>

        {/* Hamburger */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 bg-pink-400 rounded-lg p-4 flex
                        flex-col gap-4 text-center font-bold w-48 mx-auto">

          <Link to="/allproduct" className={mobileLinkClass}>🛍️ All Product</Link>


          {!profile && (
            <Link to="/signup" className={mobileLinkClass}>Signup</Link>
          )}

          {!profile && (
            <Link to="/login" className={mobileLinkClass}>Login</Link>
          )}

          {profile?.role === "user" && (
            <Link to="/user-dashboard"
              className={`text-gray-800 [text-shadow:1px_1px_2px_white]
              ${mobileLinkClass}`}>
              👤 {profile.name}
            </Link>
          )}

          {profile?.role === "admin" && (
            <Link to="/admin-dashboard"
              className={mobileLinkClass}>
              👤 Admin
            </Link>
          )}

          {profile && (
            <div className={mobileLinkClass} onClick={logout}>
              ⏻ Logout
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;