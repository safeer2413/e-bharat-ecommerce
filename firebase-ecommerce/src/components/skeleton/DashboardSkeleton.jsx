function DashboardSkeleton() {
    return (
        <div className="animate-pulse">

            {/* Header */}
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

            <div className=" h-16 p- m-3 bg-pink-100 rounded-xl mb-6"></div>

            {/* Admin Card */}
            <div className="bg-pink-100 h-64 m-3 rounded-xl shadow-md p-4 mb-8 flex flex-col items-center">

                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-pink-300"></div>

                <div className="mt-5 space-y-3 flex flex-col items-center">
                    <div className="h-4 w-56 rounded bg-pink-300"></div>
                    <div className="h-4 w-72 rounded bg-pink-300"></div>
                    <div className="h-4 w-60 rounded bg-pink-300"></div>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="bg-pink-500 rounded-xl p-6 flex flex-col items-center"
                    >
                        <div className="w-7 h-7 rounded-md bg-pink-300"></div>
                        <div className="h-5 w-5 rounded bg-pink-300 mt-2"></div>
                        <div className="h-3 w-32 rounded bg-pink-300 mt-2"></div>
                    </div>
                ))}

            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md mt-10 p-6">

                <div className="h-8 w-56 bg-pink-200 rounded mb-6"></div>

                {[1, 2, 3, 4, 5].map((row) => (
                    <div
                        key={row}
                        className="grid grid-cols-5 gap-4 py-4 border-b"
                    >
                        <div className="h-5 rounded bg-pink-200"></div>
                        <div className="h-5 rounded bg-pink-200"></div>
                        <div className="h-5 rounded bg-pink-200"></div>
                        <div className="h-5 rounded bg-pink-200"></div>
                        <div className="h-5 rounded bg-pink-200"></div>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default DashboardSkeleton;