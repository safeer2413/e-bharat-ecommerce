function StockStatus({ stock }) {

    if (stock <= 0) {
        return (
            <span className="inline-flex items-center bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                🚫 Out Of Stock
            </span>
        );
    }

    if (stock <= 3) {
        return (
            <span className="inline-flex items-center bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm font-semibold">
                🟠 Only {stock} left
            </span>
        );
    }

    return (
        <span className="inline-flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold">
            ✅ In Stock
        </span>
    );
}

export default StockStatus;