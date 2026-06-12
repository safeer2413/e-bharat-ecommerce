import Loader from "../../components/loader/Loader";
import { formatPrice } from "../../utils/formatPrice";

function OrderList({ orders, loader, user }) {

    // ================= USER ORDERS =================
    const userOrders = orders.filter(
        (order) => order.userId === user?.uid
    );
    // ================= LOADER =================
    if (loader) {
        return <Loader />;
    }
    // ================= EMPTY STATE =================
    if (userOrders.length === 0) {
        return (
            <div className="text-center mt-10 text-pink-600 font-bold text-lg">
                No orders found
            </div>
        );
    }

    return (

        <div className="space-y-6">

            {userOrders.map((order) => (

                <div
                    key={order.id}
                    className="bg-white border border-pink-100 rounded-2xl shadow-md overflow-hidden"
                >

                    {/* ================= ORDER HEADER ================= */}
                    <div className="bg-pink-50 border-b border-pink-100 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        {/* LEFT */}
                        <div>

                            <h2 className="font-bold text-lg text-pink-600">
                                Order #{order.id.slice(0, 8)}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {
                                    order.createdAt
                                        ?.toDate()
                                        .toLocaleDateString()
                                }
                            </p>

                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-wrap gap-4 md:gap-6">

                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Amount
                                </p>

                                <h3 className="font-bold text-lg text-pink-600">
                                    ₹ {formatPrice(order.grandTotal)}
                                </h3>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Status
                                </p>

                                <span
                                    className={`
                              px-3 py-1 rounded-full text-sm font-semibold

                              ${order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"

                                            : order.status === "confirmed"
                                                ? "bg-green-100 text-green-700"

                                                : "bg-blue-100 text-blue-700"
                                        }
                           `}
                                >
                                    {order.status}
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* ================= CUSTOMER INFO ================= */}
                    <div className="p-5 border-b border-pink-100">

                        <h3 className="font-semibold text-pink-600 mb-3">
                            Shipping Details
                        </h3>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">

                            <div>
                                <p className="text-gray-500">
                                    Customer
                                </p>

                                <p className="font-medium">
                                    {order.customer.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Email
                                </p>

                                <p className="font-medium break-all">
                                    {order.customer.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Mobile
                                </p>

                                <p className="font-medium">
                                    {order.customer.mobile}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Address
                                </p>

                                <p className="font-medium">
                                    {order.shippingAddress.address}
                                    {" - "}
                                    {order.shippingAddress.pincode}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* ================= ORDER ITEMS ================= */}
                    <div className="p-5 space-y-5">

                        {order.items.map((item) => (

                            <div
                                key={`${order.id}-${item.productId}`}
                                className="flex flex-col sm:flex-row gap-5 sm:items-center border border-pink-100 rounded-xl p-4"
                            >

                                {/* PRODUCT IMAGE */}
                                <div className="flex justify-center">

                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-24 h-24 object-contain"
                                    />

                                </div>

                                {/* PRODUCT INFO */}
                                <div className="flex-1">

                                    <h3 className="font-semibold text-lg">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 capitalize">
                                        {item.category}
                                    </p>

                                    <p className="text-gray-500">
                                        Quantity : {item.quantity}
                                    </p>

                                </div>

                                {/* PRICE INFO */}
                                <div className="sm:text-right">

                                    <p className="text-gray-500 text-sm">
                                        ₹ {formatPrice(item.price)}
                                        {" × "}
                                        {item.quantity}
                                    </p>

                                    <h3 className="font-bold text-lg text-pink-600">

                                        ₹ {formatPrice(item.totalPrice)}

                                    </h3>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            ))}

        </div>
    );
}

export default OrderList;