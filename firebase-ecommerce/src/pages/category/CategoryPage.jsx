import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import AllProductSkeleton from '../../components/skeleton/AllProductSkeleton';
import ProductCard from '../../components/productCard/ProductCard';
function CategoryPage() {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const { categoryname } = useParams();
    const { getAllProducts, loader } = context
    const filteredProducts = getAllProducts.filter((item) => item.category.toLowerCase() === categoryname.toLowerCase());


    return (
        <Layout>
            {loader ? (
                <AllProductSkeleton />
            ) : (
                <div className="max-w-7xl mx-auto px-4 mt-3">

                    {/* 🔹 Top Section */}
                    <div className="flex items-center justify-between mb-4">

                        {/* Back Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 font-semibold py-1 bg-pink-700 text-white rounded-lg hover:bg-pink-500 transition duration-300 ease-in-out"
                        >
                            ← Back
                        </button>

                        {/* Spacer for balance */}
                        <div></div>
                    </div>

                    {/* 🔹 Heading */}
                    {filteredProducts.length > 0 &&
                        <h3 className="font-semibold text-center text-2xl md:text-3xl py-4">
                            All{" "}
                            <span className="text-pink-600 capitalize">
                                {categoryname}'s
                            </span>{" "}
                            Products
                        </h3>}

                    {/* 🔹 Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative min-h-[300px]">

                        {filteredProducts.length === 0 ? (

                            /* 🔥 EMPTY STATE */
                            <div className="col-span-full flex flex-col items-center justify-center text-center py-16">

                                <img
                                    src="https://www.breathearomatherapy.com/assets/images/global/no-product.png"
                                    alt="no-product"
                                    className="w-72 opacity-80"
                                />

                                <h1 className="mt-4 text-xl md:text-2xl font-semibold text-gray-600">
                                    No{" "}
                                    <span className="text-pink-600 capitalize">
                                        {categoryname}'s
                                    </span>{" "}
                                    Product Found
                                </h1>

                                <p className="text-gray-400 mt-2 text-sm">
                                    Try exploring other categories
                                </p>

                            </div>

                        ) : (
                            filteredProducts.map((product) => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default CategoryPage