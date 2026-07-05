import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { getDiscountPercentage } from "../../utils/getDiscountPercentage";
import { FaHeart, FaRegHeart, FaTruckFast } from "react-icons/fa6";
import { handleWishlist } from "../../utils/wishlist";
import MyContext from "../../context/MyContext";
import { handleCartClick } from "../../utils/toggleCart";
import StockStatus from "../stockStatus/StockStatus";
import Rating from "../rating/Rating";
import { getDeliveryDate } from "../../utils/getDeliveryDate";

function ProductCard({ product }) {

    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const { profile } = useContext(MyContext);

    const isInCart = cartItems.some(item => item.id === product.id && item.userid === profile?.uid);

    const discountPercentage = getDiscountPercentage(
        product.originalPrice,
        product.price
    );

    const wishlistItems = useSelector(state => state.wishlist);

    const isWishlisted = wishlistItems.some(
        item =>
            item.id === product.id &&
            item.userid === profile?.uid
    );

    return (
        <div className="bg-pink-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">

            <div className="relative overflow-hidden rounded-t-lg h-72 p-2">
                {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {discountPercentage}% OFF
                    </div>
                )}

                {/* Wishlist button */}
                <div
                    onClick={() => handleWishlist({ navigate, profile, product, isWishlisted })}
                    className="absolute top-3 right-3 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md"
                >
                    {isWishlisted ? (
                        <FaHeart className="text-red-500 text-xl" />
                    ) : (
                        <FaRegHeart className="text-gray-500 text-xl" />
                    )}
                </div>
                {/* Image */}
                <img
                    onClick={() => navigate(`/productInfo/${product.id}`)}
                    src={product.imageUrl}
                    loading="lazy"
                    alt={product.title}
                    className="w-full h-full p-2 rounded object-contain bg-white hover:scale-105 transition-all duration-300"
                />
            </div>

            {/* Product details */}
            <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="mt-1 flex items-center gap-2">

                    <Rating rating={product.rating || 4.5} size="text-md" />

                    <span className="font-semibold text-gray-700">
                        {product.rating || 4.5}
                    </span>

                    <span className="text-gray-500 text-sm">
                        ({product.totalReviews || 149})
                    </span>

                </div>

                {/* Price */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-pink-600 font-bold text-lg">
                        ₹{formatPrice(product.price)}
                    </span>

                    {Number(product.originalPrice) > Number(product.price) && (
                        <>
                            <p className="text-gray-400 text-sm">
                                <span>M.R.P:</span> <span className="line-through">₹{formatPrice(product.originalPrice)}</span>
                            </p>

                            <span className="text-green-600 font-semibold text-sm">
                                {discountPercentage}% OFF
                            </span>
                        </>
                    )}
                </div>

                {/* Delivery details */}
                <div className="text-sm">
                    {product.deliveryType === "free" ? (
                        <div className="flex gap-2">
                            <span className="text-green-600 flex">
                                <FaTruckFast className="mr-2 text-xl" />
                                FREE Delivery
                            </span>

                            <span className="font-bold">
                                {getDeliveryDate(product.deliveryDays)}
                            </span>
                        </div>
                    ) : (
                        <>
                            <p className="font-semibold flex text-green-600">
                                <FaTruckFast className="mr-2 text-xl" />
                                Delivery Charge ₹{product.deliveryCharge}
                            </p>

                            <p className="font-bold">
                                by {getDeliveryDate(product.deliveryDays)}
                            </p>
                        </>
                    )}
                </div>

                {/* Stock */}
                <div className="mt-4">
                    <StockStatus stock={product.stock} />
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">
                    <button
                        disabled={Number(product.stock) <= 0}
                        onClick={() => handleCartClick({ product, profile, navigate, isInCart })}
                        className={`flex-1 py-3 rounded-lg text-white font-bold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed
                              ${isInCart ? "bg-red-700 hover:bg-red-500" : "bg-pink-700 hover:bg-pink-500"
                            }`}
                    >
                        {isInCart ? "🗑 Remove from Cart" : "🛒 Add to Cart"}
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default ProductCard