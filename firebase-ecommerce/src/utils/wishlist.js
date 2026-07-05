import toast from "react-hot-toast";
import { addItemToWishlist, removeItemFromWishlist } from "../services/wishlistService";

export const handleWishlist = ({ profile, product, navigate, isWishlisted }) => {

    if (!profile) {
        toast.error("Please Login First");
        navigate("/login");
        return;
    }

    if (isWishlisted) {
        removeItemFromWishlist({ product, profile });
        toast.error("Removed From Wishlist");

    } else {
        addItemToWishlist({ product, profile });
        toast.success("Added To Wishlist");
    }
};