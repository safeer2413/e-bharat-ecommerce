import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout"
import { useContext } from "react";
import MyContext from "../../context/MyContext";
import { HashLoader } from "react-spinners";
import AllProductSkeleton from "../../components/skeleton/AllProductSkeleton";

function AllProduct() {
    const context = useContext(MyContext);
    const { getAllProducts, loader } = context;
    const navigate = useNavigate();

    return (
        <Layout>
            <h3 className="font-semibold text-center text-2xl truncate py-6">
                All <i className="text-pink-600">Product's</i>
            </h3>


            {loader ? (
                <AllProductSkeleton />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 min-h-80 gap-6 relative">
                    {getAllProducts.map((product) => (
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
                    ))}
                </div>
            )}

        </Layout>
    )
}

export default AllProduct