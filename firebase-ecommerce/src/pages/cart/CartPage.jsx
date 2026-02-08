import Layout from "../../components/layout/Layout"
const initialCart = [
    {
        id: 1,
        name: "Nike Air Force 1 07 LV8",
        href: "#",
        price: "₹7,199",
        originalPrice: "₹8,900",
        discount: "19% off",
        color: "White",
        size: "8 UK",
        quantity: 1,
        imageSrc:
            "https://tse2.mm.bing.net/th/id/OIP.WfFHpMVvd5brrsxMt6LGDAHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
        id: 2,
        name: "Nike Blazer Low 77 SE",
        href: "#",
        price: "₹5,499",
        originalPrice: "₹7,499",
        discount: "27% off",
        color: "White",
        size: "9 UK",
        quantity: 1,
        imageSrc:
            "https://tse2.mm.bing.net/th/id/OIP.KeyKtrcbmbdPMoE2H8PKhwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
        id: 3,
        name: "Adidas Ultraboost Light",
        href: "#",
        price: "₹12,999",
        originalPrice: "₹15,999",
        discount: "19% off",
        color: "Black",
        size: "8 UK",
        quantity: 1,
        imageSrc:
            "https://th.bing.com/th/id/R.e5fa17e12ea155cb1919104da04f67b8?rik=syKOWtz46GJC4w&riu=http%3a%2f%2fstartfitness.co.uk%2fcdn%2fshop%2fproducts%2fadidas-Ultra-Boost-Light-GY9351.jpg%3fv%3d1682479255&ehk=W1%2fl6JYOOZcW2sXu2FOuDoQCge4XOk%2boKQlxO0cL0FA%3d&risl=&pid=ImgRaw&r=0",
    },
    {
        id: 4,
        name: "Puma RS-X Reinvention",
        href: "#",
        price: "₹6,299",
        originalPrice: "₹8,999",
        discount: "30% off",
        color: "Grey",
        size: "9 UK",
        quantity: 1,
        imageSrc:
            "https://th.bing.com/th/id/R.de3c968088873dbcbae67beb70b67751?rik=qi1wcWs%2bF6XIBQ&pid=ImgRaw&r=0",
    },
    {
        id: 5,
        name: "Reebok Classic Leather",
        href: "#",
        price: "₹4,999",
        originalPrice: "₹6,999",
        discount: "28% off",
        color: "White",
        size: "8 UK",
        quantity: 1,
        imageSrc:
            "https://deichmann.scene7.com/asset/deichmann/US_01_600701_01?$rr_results$&defaultImage=default_obs",
    },
];

import { useState } from "react";

function CartPage() {
    const [cart, setCart] = useState(initialCart);

    const parsePrice = (price) => {
        return Number(price.replace(/₹|,/g, ""));
    };


    // Increase quantity
    const increaseQty = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQty = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };


    // Remove item
    const removeItem = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    // Price calculations
    const totalPrice = cart.reduce(
        (sum, item) =>
            sum + parsePrice(item.originalPrice) * item.quantity,
        0
    );


    const totalDiscount = cart.reduce(
        (sum, item) =>
            sum +
            (parsePrice(item.originalPrice) - parsePrice(item.price)) *
            item.quantity,
        0
    );


    const finalAmount = totalPrice - totalDiscount;

    return (
        <Layout className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {/* LEFT SIDE - CART ITEMS */}
                <div className="md:col-span-2 bg-white rounded-lg shadow p-4 space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 border-b pb-4 last:border-none"
                        >
                            {/* Image */}
                            <img
                                src={item.imageSrc}
                                alt={item.name}
                                className="w-24 h-24 object-contain bg-gray-100 rounded"
                            />

                            {/* Info */}
                            <div className="flex-1">
                                <h2 className="font-semibold">{item.name}</h2>
                                <p className="text-sm text-gray-500">
                                    {item.color} • {item.size}
                                </p>

                                <div className="flex items-center gap-2 mt-1">
                                    <span className="line-through text-gray-400">
                                        ₹{item.originalPrice}
                                    </span>
                                    <span className="font-bold text-lg">
                                        ₹{item.price}
                                    </span>
                                    <span className="text-green-600 text-sm">
                                        {item.discount}% Off
                                    </span>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 mt-3">
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="w-8 h-8 border rounded hover:bg-gray-200"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQty(item.id)}
                                        className="w-8 h-8 border rounded hover:bg-gray-200"
                                    >
                                        +
                                    </button>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 text-sm ml-4 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE - PRICE DETAILS */}
                <div className="bg-white rounded-lg shadow p-4 h-fit">
                    <h2 className="font-semibold border-b pb-2 mb-4">
                        Price Details
                    </h2>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Price ({cart.length} items)</span>
                        <span>₹{totalPrice}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2 text-green-600">
                        <span>Discount</span>
                        <span>- ₹{totalDiscount}</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Delivery Charges</span>
                        <span className="text-green-600">Free</span>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>₹{finalAmount}</span>
                    </div>

                    <button className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
                        Buy Now
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;
