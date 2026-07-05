import toast from "react-hot-toast";
import { addItemToCart, removeItemFromCart } from "../services/cartService";

export const handleCartClick = ({ product, profile, navigate, isInCart }) => {
    if (!product) return;

    if (!profile) {
        toast.error("Please login first");
        navigate("/login");
        return;
    }

    if (isInCart) {
        removeItemFromCart({ product, profile })
        toast.error("Removed from Cart");

    } else {
        addItemToCart({ product, profile })
        toast.success("Added to Cart");
    }
};