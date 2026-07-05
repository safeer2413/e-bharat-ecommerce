function ProductInfoSkeleton() {
  return (
    <div className="w- grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6 mx-auto animate-pulse">

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

      <div className="flex justify-center">
        <div className="w-full h-[450px] bg-gray-200 rounded-lg" />
      </div>

      <div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>

        <div className="flex gap-2 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
          ))}
        </div>

        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

        <div className="space-y-2 mb-6">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>

        <div className="flex gap-4">
          <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoSkeleton;