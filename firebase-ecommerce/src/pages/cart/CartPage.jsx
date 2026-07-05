import { useSelector } from "react-redux";
import Layout from "../../components/layout/Layout"
import BuyNowModal from "../../components/buyNowModel/BuyNowModel";
import toast from "react-hot-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import PriceDetails from "../../components/cart/PriceDetails";
import EmptyCart from "../../components/cart/EmptyCart";
import CartItems from "../../components/cart/CartItems";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";
import CartSkeleton from "../../components/skeleton/CartSkeleton";
import { clearUserCartService, decrementItemQuantity, incrementItemQuantity, removeItemFromCart } from "../../services/cartService";

function CartPage() {
    const cartItems = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // -------- USER -------
    const { profile, loader } = useContext(MyContext);

    // -------- FILTERED CART --------
    const userCartItems = cartItems.filter((obj) => obj.userid === profile?.uid);
    // -------- CALCULATIONS --------
    const summary = userCartItems.reduce(
        (acc, item) => {

            acc.totalQuantity += item.quantity;

            acc.totalOriginalPrice += item.originalPrice * item.quantity;

            acc.totalDiscount +=
                (item.originalPrice - item.price) * item.quantity;

            acc.totalDeliveryCharge +=
                item.deliveryCharge * item.quantity;

            acc.grandTotal +=
                (item.price + item.deliveryCharge) * item.quantity;

            return acc;
        },
        {
            totalQuantity: 0,
            totalOriginalPrice: 0,
            totalDiscount: 0,
            totalDeliveryCharge: 0,
            grandTotal: 0,
        }
    );

    // =========== REDUX HANDLERS ===========

    // Increase quantity
    const increaseQty = (product, profile) => {
        incrementItemQuantity({ product, profile })
    }
    // Decrease quantity
    const decreaseQty = (product, profile) => {
        decrementItemQuantity({ product, profile })
    }
    // Remove item from cart
    const removeFromCart = (product) => {
        removeItemFromCart({ product, profile })
        toast.error("Removed from Cart");
    }

    const [addressInfo, setAddressInfo] = useState({
        name: profile?.name || "",
        address: profile?.address || "",
        pincode: profile?.pincode || "",
        mobile: profile?.mobile || "",
    });
    const handleBuyNow = async () => {
        // Validate address info
        if (!addressInfo.name.trim() ||
            !addressInfo.address.trim() ||
            !addressInfo.pincode.trim() ||
            !addressInfo.mobile.trim()) {
            toast.error("Please fill all the address fields");
            return;
        }

        setLoading(true);
        //Order Info
        const orderInfo = {

            userId: profile.uid,

            customer: {
                name: addressInfo.name,
                mobile: addressInfo.mobile,
                email: profile.email
            },

            shippingAddress: {
                address: addressInfo.address,
                pincode: addressInfo.pincode
            },

            items: userCartItems.map(item => ({
                productId: item.id,
                title: item.title,
                brand: item.brand,
                category: item.category,
                imageUrl: item.imageUrl,
                price: Number(item.price),
                originalPrice: item.originalPrice,
                quantity: item.quantity,
                deliveryCharge: item.deliveryCharge,
                totalPrice: item.price * item.quantity
            })),

            totalQuantity: summary.totalQuantity,
            totalOriginalPrice: summary.totalOriginalPrice,
            totalDiscount: summary.totalDiscount,
            totalDeliveryCharge: summary.totalDeliveryCharge,
            grandTotal: summary.grandTotal,
            status: "pending",
            createdAt: Timestamp.now()
        };

        try {
            const orderRef = collection(fireDB, "orders");
            await addDoc(orderRef, orderInfo);
            clearUserCartService(profile.uid)

            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobile: "",
            });
            toast.success("Order placed successfully");
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!profile || loader) {
        return <CartSkeleton />;
    }
    return (
        <Layout className="bg-gray-100 min-h-screen p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="m-4 font-semibold px-4 py-1 bg-pink-700 text-white
                           rounded-lg hover:bg-pink-500 transition duration-300 ease-in-out"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold text-center mb-6 mt-1">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT SIDE - CART ITEMS */}
                {userCartItems.length > 0 ? (
                    <>
                        <div className="lg:col-span-2">
                            <CartItems
                                profile={profile}
                                cartItems={userCartItems}
                                increaseQty={increaseQty}
                                decreaseQty={decreaseQty}
                                removeFromCart={removeFromCart}
                                loading={loading}

                            />
                        </div>

                        <div className="space-y-4 lg:sticky lg:top-24 h-fit">
                            <PriceDetails
                                totalQuantity={summary.totalQuantity}
                                grandTotal={summary.grandTotal}
                                totalDiscount={summary.totalDiscount}
                                totalDeliveryCharge={summary.totalDeliveryCharge}
                                totalOriginalPrice={summary.totalOriginalPrice}
                            />

                            {profile ? (
                                <BuyNowModal
                                    addressInfo={addressInfo}
                                    setAddressInfo={setAddressInfo}
                                    handleBuyNow={handleBuyNow}
                                    loading={loading}
                                />

                            ) : (
                                <Navigate to="/login" />
                            )}

                        </div>
                    </>
                ) : (
                    <EmptyCart />
                )}
            </div>
        </Layout >
    );
}

export default CartPage;