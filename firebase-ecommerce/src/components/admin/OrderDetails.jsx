function OrderDetails() {
    const orders = [
        { id: "#ORD001", user: "Akhil", total: 8499, status: "Confirmed" },
        { id: "#ORD002", user: "Rahul", total: 12999, status: "Pending" },
        { id: "#ORD003", user: "Sameer", total: 5599, status: "Delivered" },
    ];

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-pink-600 mb-4">
                All Orders
            </h2>

            <table className="w-full border">
                <thead className="bg-pink-100">
                    <tr>
                        <th className="p-2 border">Order ID</th>
                        <th className="p-2 border">User</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center">
                            <td className="p-2 border">{order.id}</td>
                            <td className="p-2 border">{order.user}</td>
                            <td className="p-2 border">₹{order.total}</td>
                            <td className="p-2 border">
                                <span className="px-2 py-1 rounded bg-green-100 text-green-700">
                                    {order.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderDetails