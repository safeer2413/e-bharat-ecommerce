import React from 'react'
import { FaHeart, FaMinus, FaPlus, FaRegHeart, FaStar, FaTrash, FaTruckFast } from 'react-icons/fa6';
import { formatPrice } from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import CartSkeleton from '../skeleton/CartSkeleton';
import { getDiscountPercentage } from '../../utils/getDiscountPercentage';
import { getDeliveryDate } from '../../utils/getDeliveryDate';
import StockStatus from '../stockStatus/StockStatus';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addItemToWishlist } from '../../services/wishlistService';

function CartItems({ profile, cartItems, increaseQty, decreaseQty, removeFromCart, loading }) {
    const navigate = useNavigate();
    const wishlistItems = useSelector(state => state.wishlist);

    const moveToWishlist = (product, isWishlisted) => {

        if (!isWishlisted) {

            addItemToWishlist({ product, profile });

            toast.success("Moved to Wishlist");
        }

        removeFromCart(product);
    }

    return (
        <>
            {loading ? (
                <div className="hidden lg:block mt-10">
                    <CartSkeleton />
                </div>
            ) : (
                <div className="md:col-span-2 bg-white border border-pink-100 rounded-xl shadow-md p-5 space-y-5">

                    {cartItems.map((item) => {

                        const isWishlisted = wishlistItems.some(
                            (wishItem) =>
                                wishItem.id === item.id &&
                                wishItem.userid === profile?.uid
                        );

                        return (
                            <div
                                key={`${item.id}-${item.userid}`}
                                className="flex gap-5 rounded-2xl border border-pink-100 bg-gradient-to-br
                                                from-white to-pink-50 p-5 shadow-sm hover:shadow-lg
                                                transition-all duration-300"                            >
                                {/* Image */}
                                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-pink-50 to-white
                                                border border-pink-100 shadow-md flex items-center
                                                justify-center overflow-hidden">
                                    <img
                                        onClick={() => navigate(`/productInfo/${item.id}`)}
                                        src={item.imageUrl}
                                        alt={item.title}
                                        loading="lazy"
                                        className="h-full w-full object-contain p-3 cursor-pointer
                                                    hover:scale-110 transition-all duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between">

                                    {/* Top */}
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800 line-clamp-2 leading-6
                                                         hover:text-pink-600 transition-colors">
                                            {item.title}
                                        </h2>

                                        <div className="flex flex-wrap items-center gap-2 mt-2">

                                            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-600 text-white text-xs font-semibold">
                                                <span>{item.rating || 4.5}</span>
                                                <FaStar size={10} />
                                            </div>

                                            <span className="text-xs text-gray-500">
                                                ({item.totalReviews || 149})
                                            </span>

                                            <span className="px-2 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-medium">
                                                {item.brand}
                                            </span>

                                            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                                                {item.category}
                                            </span>

                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-3 flex-wrap mt-3">
                                            <span className="text-pink-600 font-bold text-xl">
                                                ₹{formatPrice(item.price)}
                                            </span>

                                            {Number(item.originalPrice) > Number(item.price) && (
                                                <>
                                                    <p className="text-gray-400 text-sm">
                                                        <span>M.R.P:</span>
                                                        <span className="line-through">
                                                            ₹{formatPrice(item.originalPrice)}
                                                        </span>
                                                    </p>

                                                    <span className="text-green-600 font-semibold text-sm">
                                                        {getDiscountPercentage(
                                                            item.originalPrice,
                                                            item.price
                                                        )}% OFF
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Stock */}
                                    <div className="mt-3 flex flex-wrap items-center gap-4">

                                        <StockStatus stock={item.stock} />

                                        <div className="flex items-center text-sm text-green-600">

                                            <FaTruckFast className="mr-2" />

                                            {item.deliveryType === "free"
                                                ? "FREE Delivery"
                                                : `₹${item.deliveryCharge} Delivery`
                                            }

                                        </div>

                                    </div>

                                    <p className="mt-2 text-sm text-gray-600">

                                        Delivery by

                                        <span className="ml-1 font-semibold text-gray-900">

                                            {getDeliveryDate(item.deliveryDays)}

                                        </span>

                                    </p>

                                    {/* Bottom */}
                                    <div className="flex flex-wrap items-center md:justify-around gap-3 mt-5">

                                        {/* Quantity */}
                                        <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/20 backdrop-blur-md
                                        border border-white/30 shadow-lg shadow-pink-300/30">

                                            <button
                                                onClick={() => decreaseQty(item, profile)}
                                                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/25
                                                hover:bg-white/40 hover:scale-110 active:scale-95 transition-all duration-300"
                                            >
                                                {item.quantity > 1 ? (
                                                    <FaMinus size={14} className='bg-pink-50 w-5 h-5 rounded-sm p-0.5' />
                                                ) : (
                                                    <FaTrash size={12} className="text-red-500 bg-pink-50 w-5 h-5 rounded-sm p-0.5" />
                                                )}
                                            </button>

                                            <span className="w-6 text-center font-semibold text-pink-700">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => increaseQty(item, profile)}
                                                className="h-8 w-8 flex items-center justify-center rounded-full
                                                bg-white/25 hover:bg-white/40 hover:scale-110 active:scale-95
                                                transition-all duration-300"
                                            >
                                                <FaPlus size={14} className='bg-pink-50 w-5 h-5 rounded-sm p-0.5 ' />
                                            </button>

                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">

                                            {/* Wishlist */}
                                            <button
                                                type="button"
                                                onClick={() => moveToWishlist(item, isWishlisted)}
                                                className="flex items-center text-sm gap-2 px-2 py-1 rounded-full bg-white/20
                                                backdrop-blur-md border border-white/30 text-pink-700 font-medium
                                                shadow-lg shadow-pink-300/30 hover:bg-white/30 hover:shadow-xl 
                                                hover:shadow-pink-400/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                                            >
                                                <FaRegHeart size={14} />
                                                Move to Wishlist
                                            </button>

                                            {/* Remove */}

                                            <button
                                                onClick={() => removeFromCart(item)}
                                                className="flex items-center text-sm gap-2 px-2 py-1 rounded-full bg-white/20
                                                backdrop-blur-md border border-white/30 text-red-500 font-medium shadow-lg
                                                shadow-red-200/40 hover:bg-red-50/30 hover:shadow-xl hover:shadow-red-300/40
                                                hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                                            >
                                                <FaTrash size={12} />
                                                Remove
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default CartItems