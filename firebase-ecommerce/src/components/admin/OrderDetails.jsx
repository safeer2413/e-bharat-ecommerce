import React, { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import ExpandableOrders from "./ExpandableOrders";
import OrderRow from "./OrderRow";

const orderStatus = [
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled"
];
const statusClasses = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-purple-100 text-purple-700",
    cancelled: "bg-red-100 text-red-700",
};
function OrderDetails() {

    const { getAllOrders } = useContext(MyContext);
    let serialNo = 1;
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const toggleOrder = (id) => {
        setExpandedOrderId(
            prev => prev === id ? null : id
        );
    };
    const updateOrderStatus = async (orderId, status) => {
        try {
            const orderRef = doc(fireDB, "orders", orderId);
            await updateDoc(orderRef, { status });
            toast.success("Order Status Updated");
        } catch (error) {
            console.log(error);
            toast.error(
                "Failed to update status"
            );
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-5 overflow-x-auto">

            {/* Heading */}
            <h2 className="text-2xl font-bold text-pink-600 mb-5">
                All Orders
            </h2>

            {/* Table */}
            <table className="w-full border border-pink-200 text-sm">

                {/* Table Head */}
                <thead className="bg-pink-100 text-pink-600">
                    <tr>

                        <th className="border border-pink-200 p-3">
                            S.No.
                        </th>

                        <th className="border border-pink-200 p-3">
                            Order Id
                        </th>

                        <th className="border border-pink-200 p-3">
                            Image
                        </th>

                        <th className="border border-pink-200 p-3">
                            Title
                        </th>

                        <th className="border border-pink-200 p-3">
                            Category
                        </th>

                        <th className="border border-pink-200 p-3">
                            Price
                        </th>

                        <th className="border border-pink-200 p-3">
                            Quantity
                        </th>

                        <th className="border border-pink-200 p-3">
                            Total Price
                        </th>

                        <th className="border border-pink-200 p-3">
                            Status
                        </th>

                        <th className="border border-pink-200 p-3">
                            Name
                        </th>

                        <th className="border border-pink-200 p-3">
                            Address
                        </th>

                        <th className="border border-pink-200 p-3">
                            Pincode
                        </th>

                        <th className="border border-pink-200 p-3">
                            Phone Number
                        </th>

                        <th className="border border-pink-200 p-3">
                            Email
                        </th>

                    </tr>
                </thead>

                {/* Table Body */}
                <tbody>

                    {getAllOrders.map((order) => (
                        <React.Fragment key={order.id}>
                            {order.items.map((item, index) => (
                                <OrderRow
                                    key={`${order.id}-${index}`}
                                    order={order}
                                    item={item}
                                    serialNo={serialNo++}
                                    toggleOrder={toggleOrder}
                                    updateOrderStatus={updateOrderStatus}
                                    statusClasses={statusClasses}
                                    orderStatus={orderStatus}
                                />
                            ))}
                            {expandedOrderId === order.id && (
                                <tr>
                                    <td>

                                        <ExpandableOrders order={order} expandedOrderId={expandedOrderId} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}

                </tbody>
            </table>
        </div>
    );
}

export default OrderDetails;