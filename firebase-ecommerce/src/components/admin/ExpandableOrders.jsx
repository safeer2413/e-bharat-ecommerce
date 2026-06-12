function ExpandableOrders({ order }) {

    return (

        <div className="p-4 bg-pink-50 rounded-lg">

            <h2 className="font-bold text-lg mb-2">
                Order #{order.id}
            </h2>

            <p>
                Customer: {order.customer.name}
            </p>

            <p>
                Email: {order.customer.email}
            </p>

            <p>
                Phone: {order.customer.mobile}
            </p>

            <div className="mt-4">

                <h3 className="font-semibold mb-2">
                    Products
                </h3>

                {order.items.map((product, index) => (

                    <div
                        key={index}
                        className="border-b py-2"
                    >

                        <p>
                            {product.title}
                        </p>

                        <p>
                            Qty: {product.quantity}
                        </p>

                        <p>
                            ₹{product.totalPrice}
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default ExpandableOrders;