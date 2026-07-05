import { addToCart, clearUserCart, decrementQuantity, deleteFromCart, incrementQuantity } from "../redux/cartSlice";
import { store } from "../redux/store";

export const loadCartFromCache = (uid) => {
    if (!uid) return [];

    try {
        return JSON.parse(
            localStorage.getItem(`cart_cache_${uid}`)
        ) || [];
    } catch (error) {
        console.error("Error loading cart cache:", error);
        return [];
    }
};

export const saveCartToCache = (uid, cart) => {
    if (!uid) return;

    try {
        localStorage.setItem(
            `cart_cache_${uid}`,
            JSON.stringify(cart)
        );
    } catch (error) {
        console.error("Error saving cart cache:", error);
    }
};

const syncCartCache = (uid) => {

    const updatedCart = store.getState().cart;

    saveCartToCache(uid, updatedCart);
};

// TODO: Implement after Firestore sync
export const clearCartCache = () => { };

export const addItemToCart = ({ product, profile }) => {
    if (!product || !profile) return;

    const cleanProduct = {
        ...product,
        price: Number(product.price),
        userid: profile.uid,
        useremail: profile.email,
    }

    store.dispatch(addToCart(cleanProduct));

    syncCartCache(profile.uid);
};

export const removeItemFromCart = ({ product, profile }) => {
    if (!product || !profile) return;

    store.dispatch(deleteFromCart({
        id: product.id,
        userid: profile.uid
    }));

    syncCartCache(profile.uid);
};

export const incrementItemQuantity = ({ product, profile }) => {
    if (!product || !profile) return;

    store.dispatch(incrementQuantity({
        id: product.id,
        userid: profile.uid
    }));

    syncCartCache(profile.uid);
};

export const decrementItemQuantity = ({ product, profile }) => {

    if (!product || !profile) return;

    store.dispatch(
        decrementQuantity({
            id: product.id,
            userid: profile.uid
        })
    );

    syncCartCache(profile.uid);
};


export const clearUserCartService = (uid) => {

    if (!uid) return;

    store.dispatch(clearUserCart(uid));

    syncCartCache(uid);
};