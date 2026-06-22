import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { getDiscountPercentage } from "../../utils/getDiscountPercentage";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { handleWishlist } from "../../utils/wishlist";
import MyContext from "../../context/MyContext";
import { handleCartClick } from "../../utils/toggleCart";
import StockStatus from "../stockStatus/StockStatus";
import Rating from "../rating/Rating";

function ProductCard({ product }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const { user } = useContext(MyContext);

    const isInCart = cartItems.some(item => item.id === product.id && item.userid === user?.uid);

    const discountPercentage = getDiscountPercentage(
        product.originalPrice,
        product.price
    );

    const wishlistItems = useSelector(state => state.wishlist);


    const isWishlisted = wishlistItems.some(
        item =>
            item.id === product.id &&
            item.userid === user?.uid
    );

    return (
        <div className="bg-pink-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">

            <div className="relative overflow-hidden rounded-t-lg h-72 p-2">
                {discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {discountPercentage}% OFF
                    </div>
                )}

                <div
                    onClick={() => handleWishlist({ navigate, user, product, dispatch, isWishlisted })}
                    className="absolute top-3 right-3 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md"
                >
                    {isWishlisted ? (
                        <FaHeart className="text-red-500 text-xl" />
                    ) : (
                        <FaRegHeart className="text-gray-500 text-xl" />
                    )}
                </div>
                <img
                    onClick={() => navigate(`/productInfo/${product.id}`)}
                    src={product.imageUrl}
                    loading="lazy"
                    alt={product.title}
                    className="w-full h-full p-2 rounded object-contain bg-white hover:scale-105 transition-all duration-300"
                />
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-1 flex items-center gap-2">

                    <Rating rating={product.rating || 4.5} size="text-md" />

                    <span className="font-semibold text-gray-700">
                        {product.rating || 4.5}
                    </span>

                    <span className="text-gray-500 text-sm">
                        ({product.totalReviews || 149})
                    </span>

                </div>

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

                <h5 className='mt-1 text-sm font-semibold '>Free Delivery by E-Bharat</h5>

                {/* Stock */}
                <div className="mt-4">
                    <StockStatus stock={product.stock} />
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">
                    <button
                        disabled={Number(product.stock) <= 0}
                        onClick={() => handleCartClick({ product, user, navigate, isInCart, dispatch })}
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