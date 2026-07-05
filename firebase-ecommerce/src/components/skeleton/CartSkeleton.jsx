function CartSkeleton() {
    return (
        <div className="min-h-screen bg-pink-100 animate-pulse">

            {/* Heading */}
            <div className="bg-pink-600 rounded-xl p-5 mb-8 animate-pulse">

                <div className="flex items-center gap-6 justify-evenly">
                    {/* Logo */}
                    <div className="h-9 w-24 rounded-xl bg-pink-400"></div>
                    {/* Search */}
                    <div className=" flex-1">
                        <div className="h-9 rounded-xl bg-pink-400"></div>
                    </div>
                    {/* Wishlist */}
                    <div className="w-10 h-10 rounded-full bg-pink-400"></div>
                    {/* Cart */}
                    <div className="w-11 h-9 rounded-lg bg-pink-400"></div>
                    {/* Hamburger */}
                    <div className="w-9 h-9 rounded bg-pink-400 md:hidden"></div>
                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-8 px-5">

                {/* Left Section */}
                <div className="lg:col-span-2 border rounded-xl bg-white p-6">

                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="flex gap-5 pb-10 mb-10 border-b last:border-b-0"
                        >
                            {/* Product Image */}
                            <div className="w-36 h-36 bg-pink-50 rounded-lg"></div>

                            {/* Product Info */}
                            <div className="flex-1">
                                <div className="h-7 w-96 bg-pink-50 rounded mb-4"></div>

                                <div className="h-5 w-40 bg-pink-50 rounded mb-4"></div>

                                <div className="h-6 w-24 bg-pink-50 rounded mb-6"></div>

                                {/* Quantity */}
                                <div className="flex gap-3">
                                    <div className="h-12 w-12 bg-pink-50 rounded"></div>
                                    <div className="h-12 w-12 bg-pink-50 rounded"></div>
                                    <div className="h-12 w-12 bg-pink-50 rounded"></div>
                                </div>
                            </div>

                            {/* Remove */}
                            <div className="self-center">
                                <div className="h-5 w-20 bg-pink-50 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Section */}
                <div>
                    <div className="border rounded-xl bg-white p-6">

                        <div className="h-8 w-40 bg-pink-50 rounded mb-8"></div>

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="flex justify-between mb-5"
                            >
                                <div className="h-5 w-24 bg-pink-50 rounded"></div>
                                <div className="h-5 w-16 bg-pink-50 rounded"></div>
                            </div>
                        ))}

                        <hr className="my-5" />

                        <div className="flex justify-between">
                            <div className="h-8 w-20 bg-pink-50 rounded"></div>
                            <div className="h-8 w-24 bg-pink-50 rounded"></div>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <div className="h-14 bg-pink-50 rounded-xl mt-6"></div>
                </div>
            </div>
        </div>
    );
}

export default CartSkeleton;