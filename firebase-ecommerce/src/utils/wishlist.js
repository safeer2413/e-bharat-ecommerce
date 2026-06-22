import toast from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

export const handleWishlist = ({ user, product, dispatch, navigate, isWishlisted }) => {

    if (!user) {
        toast.error("Please Login First");
        navigate("/login");
        return;
    }

    if (isWishlisted) {
        dispatch(removeFromWishlist({
            id: product.id,
            userid: user.uid
        }));

        toast.error("Removed From Wishlist");
    } else {
        dispatch(addToWishlist({
            ...product,
            userid: user.uid
        }));

        toast.success("Added To Wishlist");
    }
};