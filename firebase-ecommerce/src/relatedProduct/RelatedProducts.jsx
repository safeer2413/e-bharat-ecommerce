import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import { getDiscountPercentage } from '../utils/getDiscountPercentage'
import Rating from '../components/rating/Rating';
import { getDeliveryDate } from '../utils/getDeliveryDate';
import { FaTruckFast } from 'react-icons/fa6';

function RelatedProducts({ relatedProducts }) {
    const navigate = useNavigate();

    return (
        <div>
            {relatedProducts.length > 0 && (
                <div className="bg-pink-50 p-4 rounded-xl">

                    <h2 className="text-2xl font-bold mb-6">
                        Related Products
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {relatedProducts.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/productInfo/${item.id}`)}
                                className="cursor-pointer bg-pink-100 rounded-xl shadow-md hover:shadow-lg
                                hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                            >
                                <div className="h-52 bg-white flex items-center justify-center">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-contain p-2"
                                    />
                                </div>
                                <div className="p-3 flex flex-col flex-1">
                                    <h3 className="font-semibold line-clamp-2 min-h-[48px]">
                                        {item.description}
                                    </h3>

                                    {/* Rating */}
                                    <div className="mt-auto">
                                        <div className="mt-1 flex items-center gap-2">

                                            <Rating rating={(item.rating ?? 4.5)} size="text-sm" />

                                            <span className="font-semibold text-gray-700">
                                                {item.rating ?? 4.5}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                ({item.totalReviews ?? 149})
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="mt-3">

                                            <div className="flex items-center gap-2 flex-wrap">

                                                <h4 className="text-2xl font-bold text-pink-600">
                                                    ₹{formatPrice(item.price)}
                                                </h4>

                                                <span className="text-sm text-gray-400 line-through">
                                                    ₹{formatPrice(item.originalPrice)}
                                                </span>

                                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                                    {getDiscountPercentage(item.originalPrice, item.price)}% OFF
                                                </span>

                                            </div>

                                            <p className="mt-1 text-xs text-green-600 font-medium">
                                                You save ₹{formatPrice(item.originalPrice - item.price)}
                                            </p>

                                        </div>

                                        {/* Delivery */}
                                        <div className="mt-4 rounded-xl bg-pink-50 border border-pink-100 p-3">

                                            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">

                                                <FaTruckFast className="text-lg" />

                                                {item.deliveryType === "free"
                                                    ? "FREE Delivery"
                                                    : `Delivery ₹${formatPrice(item.deliveryCharge)}`}

                                            </div>

                                            <p className="mt-2 text-center text-sm text-gray-600">
                                                Get it by <span className="font-bold text-gray-800">
                                                    {getDeliveryDate(item.deliveryDays ?? 0)}
                                                </span>
                                            </p>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            )}
        </div>
    )
}

export default RelatedProducts