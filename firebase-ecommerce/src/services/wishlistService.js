import { store } from "../redux/store";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

export const loadWishlistFromCache = (uid) => {
    if (!uid) return [];

    try {
        return JSON.parse(
            localStorage.getItem(`wishlist_cache_${uid}`)
        ) || [];
    } catch (error) {
        console.error("Error loading wishlist cache:", error);
        return [];
    }
};

export const saveWishlistToCache = (uid, wishlist) => {
    if (!uid) return;

    try {
        localStorage.setItem(
            `wishlist_cache_${uid}`,
            JSON.stringify(wishlist)
        );
    } catch (error) {
        console.error("Error saving wishlist cache:", error);
    }
};

const syncWishlistCache = (uid) => {

    const updatedWishlist = store.getState().wishlist;

    saveWishlistToCache(uid, updatedWishlist);
};

// TODO: Implement after Firestore sync
export const clearWishlistCache = () => { };

export const addItemToWishlist = ({ product, profile }) => {

    if (!product || !profile) return;

    const cleanProduct = {
        ...product,
        price: Number(product.price),
        userid: profile.uid,
        useremail: profile.email,
    }

    store.dispatch(addToWishlist(cleanProduct));

    syncWishlistCache(profile.uid)
}

export const removeItemFromWishlist = ({ product, profile }) => {
    if (!product || !profile) return;

    store.dispatch(removeFromWishlist({
        id: product.id,
        userid: profile.uid
    }));

    syncWishlistCache(profile.uid)
};