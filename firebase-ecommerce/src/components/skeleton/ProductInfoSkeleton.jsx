function ProductInfoSkeleton() {
  return (
    <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6 mx-auto animate-pulse">

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