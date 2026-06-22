import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout"
import { clearUserCart, decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
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

function CartPage() {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // ----------------- USER -----------------

    // const user = auth.currentUser;
    const { user } = useContext(MyContext);

    const parsePrice = (price) => {
        return Number(
            String(price).replace(/₹|,/g, "")
        );
    };
    // ------------- FILTERED CART -------------

    const userCartItems = cartItems.filter((obj) => obj.userid === user?.uid);

    // ------------- CALCULATIONS -------------

    // Price calculations
    const totalPrice = userCartItems.reduce(
        (sum, item) =>
            sum + parsePrice(item.price) * item.quantity,
        0
    );
    // ------------Total Quantity---------------

    const totalQuantity = userCartItems.reduce((sum, item) => sum + item.quantity, 0)

    // const totalDiscount = cart.reduce(
    //     (sum, item) =>
    //         sum +
    //         (parsePrice(item.originalPrice) - parsePrice(item.price)) *
    //         item.quantity,
    //     0
    // );

    // const finalAmount = totalPrice - totalDiscount;

    // ================= REDUX HANDLERS =================

    // Increase quantity
    const increaseQty = (id, userid) => {
        dispatch(incrementQuantity({
            id,
            userid
        }));
    }
    // Decrease quantity
    const decreaseQty = (id, userid) => {
        dispatch(decrementQuantity({
            id,
            userid
        }));
    }
    // Remove item from cart
    const removeFromCart = (id, userid) => {
        dispatch(deleteFromCart({
            id, userid
        }));
    }

    const [addressInfo, setAddressInfo] = useState({
        name: user?.name || "",
        address: user?.address || "",
        pincode: user?.pincode || "",
        mobile: user?.mobile || "",
    });
    const handleBuyNow = async () => {
        // Validate address info
        if (!addressInfo.name.trim() || !addressInfo.address.trim() || !addressInfo.pincode.trim() || !addressInfo.mobile.trim()) {
            toast.error("Please fill all the address fields");
            return;
        }
        setLoading(true);
        //Order Info
        const orderInfo = {

            userId: user.uid,

            customer: {
                name: addressInfo.name,
                mobile: addressInfo.mobile,
                email: user.email
            },

            shippingAddress: {
                address: addressInfo.address,
                pincode: addressInfo.pincode
            },

            items: userCartItems.map(item => ({
                productId: item.id,
                title: item.title,
                category: item.category,
                imageUrl: item.imageUrl,
                price: Number(item.price),
                quantity: item.quantity,
                totalPrice: item.price * item.quantity
            })),

            grandTotal: totalPrice,
            status: "pending",
            createdAt: Timestamp.now()
        };

        try {
            const orderRef = collection(fireDB, "orders");
            await addDoc(orderRef, orderInfo);
            dispatch(clearUserCart(user.uid));

            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobile: "",
            });
            toast.success("Order placed successfully");
            console.log("Order placed successfully:", orderInfo);
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <CartSkeleton />;
    }
    return (
        <Layout className="bg-gray-100 min-h-screen p-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="m-4 font-semibold px-4 py-1 bg-pink-700 text-white rounded-lg hover:bg-pink-500 transition duration-300 ease-in-out"
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
                                cartItems={userCartItems}
                                increaseQty={increaseQty}
                                decreaseQty={decreaseQty}
                                removeFromCart={removeFromCart}
                                loading={loading}
                            />
                        </div>

                        <div className="space-y-4 lg:sticky lg:top-24 h-fit">
                            <PriceDetails
                                totalQuantity={totalQuantity}
                                totalPrice={totalPrice}
                            />

                            {user ? (
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