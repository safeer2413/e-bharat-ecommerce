import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'
import { getDiscountPercentage } from '../utils/getDiscountPercentage'
import Rating from '../components/rating/Rating';

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

                                            <Rating rating={(item.rating || 4.5)} size="text-sm" />

                                            <span className="font-semibold text-gray-700">
                                                {item.rating || 4.5}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                ({item.totalReviews || 149})
                                            </span>
                                        </div>

                                        <h4 className="text-lg font-bold text-pink-600">
                                            ₹{formatPrice(item.price)}
                                        </h4>

                                        <div className="flex items-center gap-2 flex-wrap mt-1">

                                            <span className="text-gray-400 text-sm line-through">
                                                ₹{formatPrice(item.originalPrice)}
                                            </span>

                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                                                {getDiscountPercentage(
                                                    Number(item.originalPrice),
                                                    Number(item.price)
                                                )}% OFF
                                            </span>

                                        </div>

                                        <h5 className='text-xs font-semibold '>Free Delivery by E-Bharat</h5>
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