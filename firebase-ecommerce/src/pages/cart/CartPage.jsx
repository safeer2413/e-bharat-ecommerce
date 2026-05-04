import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout"
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import { FaMinus, FaTrash } from "react-icons/fa6";
import { FaMinusCircle, FaPlus } from "react-icons/fa";

// const initialCart = [
//     {
//         id: 1,
//         name: "Nike Air Force 1 07 LV8",
//         href: "#",
//         price: "₹7,199",
//         originalPrice: "₹8,900",
//         discount: "19% off",
//         color: "White",
//         size: "8 UK",
//         quantity: 1,
//         imageSrc:
//             "https://tse2.mm.bing.net/th/id/OIP.WfFHpMVvd5brrsxMt6LGDAHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
//     },
//     {
//         id: 2,
//         name: "Nike Blazer Low 77 SE",
//         href: "#",
//         price: "₹5,499",
//         originalPrice: "₹7,499",
//         discount: "27% off",
//         color: "White",
//         size: "9 UK",
//         quantity: 1,
//         imageSrc:
//             "https://tse2.mm.bing.net/th/id/OIP.KeyKtrcbmbdPMoE2H8PKhwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
//     },
//     {
//         id: 3,
//         name: "Adidas Ultraboost Light",
//         href: "#",
//         price: "₹12,999",
//         originalPrice: "₹15,999",
//         discount: "19% off",
//         color: "Black",
//         size: "8 UK",
//         quantity: 1,
//         imageSrc:
//             "https://th.bing.com/th/id/R.e5fa17e12ea155cb1919104da04f67b8?rik=syKOWtz46GJC4w&riu=http%3a%2f%2fstartfitness.co.uk%2fcdn%2fshop%2fproducts%2fadidas-Ultra-Boost-Light-GY9351.jpg%3fv%3d1682479255&ehk=W1%2fl6JYOOZcW2sXu2FOuDoQCge4XOk%2boKQlxO0cL0FA%3d&risl=&pid=ImgRaw&r=0",
//     },
//     {
//         id: 4,
//         name: "Puma RS-X Reinvention",
//         href: "#",
//         price: "₹6,299",
//         originalPrice: "₹8,999",
//         discount: "30% off",
//         color: "Grey",
//         size: "9 UK",
//         quantity: 1,
//         imageSrc:
//             "https://th.bing.com/th/id/R.de3c968088873dbcbae67beb70b67751?rik=qi1wcWs%2bF6XIBQ&pid=ImgRaw&r=0",
//     },
//     {
//         id: 5,
//         name: "Reebok Classic Leather",
//         href: "#",
//         price: "₹4,999",
//         originalPrice: "₹6,999",
//         discount: "28% off",
//         color: "White",
//         size: "8 UK",
//         quantity: 1,
//         imageSrc:
//             "https://deichmann.scene7.com/asset/deichmann/US_01_600701_01?$rr_results$&defaultImage=default_obs",
//     },
// ];

function CartPage() {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    console.log(cartItems);

    const parsePrice = (price) => {
        return Number(price.replace(/₹|,/g, ""));
    };

    // Increase quantity
    // const increaseQty = (id) => {
    //     setCart(
    //         cart.map((item) =>
    //             item.id === id
    //                 ? { ...item, quantity: item.quantity + 1 }
    //                 : item
    //         )
    //     );
    // };
    const increaseQty = (id) => {
        dispatch(incrementQuantity(id))
    }
    // Decrease quantity
    const decreaseQty = (id) => {
        dispatch(decrementQuantity(id))
    }

    // Price calculations
    const totalPrice = cartItems.reduce(
        (sum, item) =>
            sum + parsePrice(item.price) * item.quantity,
        0
    );

    // Total Quantity
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    // const totalDiscount = cart.reduce(
    //     (sum, item) =>
    //         sum +
    //         (parsePrice(item.originalPrice) - parsePrice(item.price)) *
    //         item.quantity,
    //     0
    // );

    // const finalAmount = totalPrice - totalDiscount;

    return (
        <Layout className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold text-center mb-4 mt-10">Shopping Cart</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {/* LEFT SIDE - CART ITEMS */}
                {cartItems.length > 0 ? (
                    <div className="md:col-span-2 bg-white rounded-xl shadow-md p-5 space-y-5">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-5 border-b pb-5 last:border-none"
                            >
                                {/* Image */}
                                <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="h-full object-contain p-2"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-between">

                                    {/* Top */}
                                    <div>
                                        <h2 className="font-semibold text-lg line-clamp-1">
                                            {item.name}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {item.color || "Default"} • {item.size || "Standard"}
                                        </p>

                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-gray-400 line-through text-sm">
                                                ₹{item.originalPrice || item.price}
                                            </span>
                                            <span className="font-bold text-lg text-pink-600">
                                                ₹{item.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom */}
                                    <div className="flex items-center mt-4">

                                        {/* Quantity */}
                                        <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
                                            <button
                                                onClick={() => decreaseQty(item.id)}
                                                className="p-1 hover:bg-gray-200 rounded"
                                            >
                                                {item.quantity > 1 ? (
                                                    <FaMinus size={12} />
                                                ) : (
                                                    <FaTrash size={12} className="text-red-500" />
                                                )}
                                            </button>

                                            <span className="font-medium w-6 text-center">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => increaseQty(item.id)}
                                                className="p-1 hover:bg-gray-200 rounded"
                                            >
                                                <FaPlus size={12} />
                                            </button>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => dispatch(deleteFromCart(item.id))}
                                            className="text-red-500 text-sm m-auto hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-20">
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
                )}

                {/* RIGHT SIDE - PRICE DETAILS */}
                <div className="bg-white rounded-xl shadow-md p-5 h-fit sticky top-6">
                    <h2 className="font-semibold border-b pb-3 mb-4 text-lg">
                        Price Details
                    </h2>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Items ({totalQuantity})</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2 text-green-600">
                        <span>Discount</span>
                        <span>- ₹0</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Delivery</span>
                        <span className="text-green-600">Free</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    <button className="w-full mt-5 bg-pink-600 text-white py-2.5 rounded-lg hover:bg-pink-700 transition font-medium">
                        Checkout
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
