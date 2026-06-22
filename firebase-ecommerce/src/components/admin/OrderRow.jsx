import { formatPrice } from "../../utils/formatPrice";

function OrderRow({
    order,
    item,
    serialNo,
    toggleOrder,
    updateOrderStatus,
    statusClasses,
    orderStatus
}) {
    console.log(item)
    return (
        <tr
            onClick={() => toggleOrder(order.id)}
            className="text-center hover:bg-pink-50 transition duration-200"
        >
            <td className="border border-pink-200 p-3">
                {serialNo}
            </td>

            <td className="border border-pink-200 p-3">
                {order.id}
            </td>

            <td className="border border-pink-200 p-3">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-14 h-14 object-contain mx-auto"
                />
            </td>

            <td className="border border-pink-200 p-3">
                {item.title}
            </td>

            <td className="border border-pink-200 p-3">
                {item.category}
            </td>

            <td className="border border-pink-200 p-3">
                ₹{formatPrice(item.price)}
            </td>

            <td className="border border-pink-200 p-3">
                {item.quantity}
            </td>

            <td className="border border-pink-200 p-3 font-semibold text-pink-600">
                ₹{formatPrice(item.totalPrice)}
            </td>

            <td className="border border-pink-200 p-3">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[order.status] ||
                        "bg-gray-100 text-gray-700"
                        }`}
                >
                    <select
                        value={order.status}
                        onChange={(e) =>
                            updateOrderStatus(
                                order.id,
                                e.target.value
                            )
                        }
                        className="bg-transparent outline-none"
                    >
                        {orderStatus.map((status) => (
                            <option
                                key={status}
                                value={status}
                            >
                                {status}
                            </option>
                        ))}
                    </select>
                </span>
            </td>

            <td className="border border-pink-200 p-3">
                {order.customer.name}
            </td>

            <td className="border border-pink-200 p-3">
                {order.shippingAddress.address}
            </td>

            <td className="border border-pink-200 p-3">
                {order.shippingAddress.pincode}
            </td>

            <td className="border border-pink-200 p-3">
                {order.customer.mobile}
            </td>

            <td className="border border-pink-200 p-3">
                {order.customer.email}
            </td>
        </tr>
    );
}

export default OrderRow;