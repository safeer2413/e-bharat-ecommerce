import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import AllProductSkeleton from "../skeleton/AllProductSkeleton";
function ProductCard() {
    const context = useContext(MyContext);
    const { getAllProducts, loader } = context;
    const navigate = useNavigate();
    return (
        <>
            {loader ? (
                <AllProductSkeleton />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
                    {getAllProducts.length === 0 ? (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <h1 className="text-2xl font-semibold text-gray-600">
                                Product Not Found
                            </h1>
                        </div>
                    ) : (
                        getAllProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-pink-100 rounded-lg shadow-md hover:shadow-xl hover:shadow-pink-200 transition duration-300"
                            >
                                {/* Image */}
                                <div className="overflow-hidden rounded-t-lg h-72">
                                    <img
                                        onClick={() => navigate(`/productInfo/${product.id}`)}
                                        src={product.imageUrl}
                                        alt={product.title}
                                        className="w-full p-4 bg-white rounded-lg h-full object-cove hover:scale-105 transition-all duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg truncate">
                                        {product.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-pink-600 font-bold text-lg">
                                            ₹{product.price}
                                        </span>

                                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">
                                            {product.trendingProductName}
                                        </span>
                                    </div>

                                    <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            )
            }
        </>
    );
}

export default ProductCard;

