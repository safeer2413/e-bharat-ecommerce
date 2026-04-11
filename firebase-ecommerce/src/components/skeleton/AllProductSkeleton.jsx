function AllProductSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-pink-100 rounded-lg shadow-md overflow-hidden"
                >
                    {/* Image */}
                    <div className="h-72 bg-white p-4">
                        <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4 animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>

                        <div className="space-y-2 mt-2">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <div className="h-5 bg-gray-200 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 rounded w-14"></div>
                        </div>

                        <div className="mt-4 h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default AllProductSkeleton;