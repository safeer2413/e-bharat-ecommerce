import { createSlice } from "@reduxjs/toolkit";


const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,

    reducers: {
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
    addToWishlist,
    removeFromWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;