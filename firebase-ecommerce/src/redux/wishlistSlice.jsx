import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,

    reducers: {
        setWishlist: (state, action) => {
            return action.payload;
        },

        addToWishlist: (state, action) => {
            state.push(action.payload);
        },

        removeFromWishlist: (state, action) => {
            return state.filter(
                item =>
                    !(
                        item.id === action.payload.id &&
                        item.userid === action.payload.userid
                    )
            );
        }
    }
});

export const {
    setWishlist,
    addToWishlist,
    removeFromWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;