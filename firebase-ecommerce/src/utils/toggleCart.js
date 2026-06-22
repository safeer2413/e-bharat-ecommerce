import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../redux/cartSlice";

export const handleCartClick = ({ product, user, navigate, isInCart, dispatch }) => {
    if (!product) return;

    if (!user) {
        toast.error("Please login first");
        navigate("/login");
        return;
    }

    if (isInCart) {
        dispatch(deleteFromCart({
            id: product.id,
            userid: user.uid
        }));
        toast.error("Removed from Cart");
    } else {
        const cleanProduct = {
            ...product,
            price: Number(product.price),
            userid: user?.uid,
            useremail: user?.email,
        };

        dispatch(addToCart(cleanProduct));
        toast.success("Added to Cart");
    }
};