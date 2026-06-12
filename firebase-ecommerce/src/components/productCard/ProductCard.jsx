import { useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { formatPrice } from "../../utils/formatPrice";
function ProductCard({ product }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);
    const user = JSON.parse(localStorage.getItem("user"));
    const addCart = (product) => {
        if (!user) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }
        const cleanProduct = {
            ...product,
            price: Number(product.price),
            userid: user?.uid,
            useremail: user?.email,
            time: Date.now()
        };
        dispatch(addToCart(cleanProduct));
        toast.success("Added to Cart");
    }

    const removeCart = (id, userid) => {
        dispatch(deleteFromCart({
            id, userid
        }));
        toast.error("Removed from Cart");
    }

    const userCartItems = cartItems.filter(
        (item) => item.userid === user?.uid
    );
    const cartIds = useMemo(() => {
        return new Set(userCartItems.map(item => item.id));
    }, [userCartItems]);

    return (
        <div className="bg-pink-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">

            <div className="overflow-hidden rounded-t-lg h-72 p-2">
                <img
                    onClick={() => navigate(`/productInfo/${product.id}`)}
                    src={product.imageUrl}
                    loading="lazy"
                    alt={product.title}
                    className="w-full h-full p-2 rounded object-contain bg-white hover:scale-105 transition-all duration-300"
                />
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-pink-600 font-bold text-lg">
                        ₹{formatPrice(product.price)}
                    </span>

                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">
                        {product.trendingProductName}
                    </span>
                </div>

                {cartIds.has(product.id) ? (
                    <button
                        className="mt-4 w-full bg-red-800 text-white py-2 rounded-lg hover:bg-red-900 transition duration-300"
                        onClick={() => removeCart(product.id, user?.uid)}
                    >
                        Remove from Cart
                    </button>
                ) : (
                    <button
                        className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition duration-300"
                        onClick={() => addCart(product)}
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductCard