import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/productCard/ProductCard';
import Layout from '../../components/layout/Layout';
import MyContext from '../../context/MyContext';
import AllProductSkeleton from '../../components/skeleton/AllProductSkeleton';

function WishList() {

    const context = useContext(MyContext);
    const { user, loader } = context;
    const wishlistItems = useSelector((state) => state.wishlist);

    const userWishlist = wishlistItems.filter(
        (item) => item.userid === user?.uid
    );

    return (

        <Layout>

            {loader ? (
                <AllProductSkeleton />

            ) : (
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="max-w-7xl mx-auto px-4">

                        {/* Heading */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                My Wishlist ❤️
                            </h1>

                            <p className="text-gray-500 mt-2">
                                {userWishlist.length} item
                                {userWishlist.length !== 1 ? 's' : ''} saved
                            </p>
                        </div>

                        {/* Empty Wishlist */}
                        {userWishlist.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-10 text-center">
                                <div className="text-6xl mb-4">💔</div>

                                <h2 className="text-2xl font-semibold text-gray-700">
                                    Your Wishlist is Empty
                                </h2>

                                <p className="text-gray-500 mt-3">
                                    Save your favorite products and they will appear here.
                                </p>
                            </div>
                        ) : (
                            /* Product Grid */
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {userWishlist.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default WishList;