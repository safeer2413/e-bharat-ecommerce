function EmptyCart() {
    return (
        <>
            <div className="col-span-full flex flex-col items-center justify-center min-h-[60vh]">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="Empty Cart"
                    className="w-32 mb-4 opacity-80"
                />
                <h3 className="text-xl font-semibold text-gray-700">
                    Your cart is empty
                </h3>
                <p className="text-gray-500 mt-2 text-center">
                    Looks like you haven't added anything yet.
                </p>
            </div>
        </>
    )
}

export default EmptyCart