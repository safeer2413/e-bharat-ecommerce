import React from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa6';
import { formatPrice } from '../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import CartSkeleton from '../skeleton/CartSkeleton';

function CartItems({ cartItems, increaseQty, decreaseQty, removeFromCart, loading }) {
    const navigate = useNavigate();
    return (
        <>
            {loading ? (
                <div className="hidden lg:block mt-10">
                    <CartSkeleton />
                </div>
            ) : (
                <div className="md:col-span-2 bg-white border border-pink-100 rounded-xl shadow-md p-5 space-y-5">

                    {cartItems.map((item) => (
                        <div
                            key={`${item.id}-${item.userid}`}
                            className="flex gap-5 border-b pb-5 last:border-none"
                        >
                            {/* Image */}
                            <div className="w-28 h-28 border border-pink-200 bg-gray-100 rounded-lg flex items-center justify-center">
                                <img
                                    onClick={() => navigate(`/productInfo/${item.id}`)}
                                    src={item.imageUrl}
                                    alt={item.title}
                                    loading="lazy"
                                    className="h-full object-contain p-2 hover:scale-110 transition duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between">

                                {/* Top */}
                                <div>
                                    <h2 className="font-semibold text-lg line-clamp-1">
                                        {item.title}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.color || "Default"} • {item.size || "Standard"}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-gray-400 line-through text-sm">
                                            ₹{item.originalPrice || formatPrice(item.price)}
                                        </span>
                                        <span className="font-bold text-lg text-pink-600">
                                            ₹{formatPrice(item.price)}
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom */}
                                <div className="flex items-center mt-4">

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3 border-2 border-pink-200 rounded-lg px-2 py-1">
                                        <button
                                            onClick={() => decreaseQty(item.id, item.userid)}
                                            className="p-1 hover:bg-gray-200 rounded"
                                        >
                                            {item.quantity > 1 ? (
                                                <FaMinus size={12} />
                                            ) : (
                                                <FaTrash size={12} className="text-red-500" />
                                            )}
                                        </button>

                                        <span className="font-medium w-6 text-center">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(item.id, item.userid)}
                                            className="p-1 hover:bg-gray-200 rounded"
                                        >
                                            <FaPlus size={12} />
                                        </button>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeFromCart(item.id, item.userid)}
                                        className="text-red-500 text-sm m-auto hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default CartItems