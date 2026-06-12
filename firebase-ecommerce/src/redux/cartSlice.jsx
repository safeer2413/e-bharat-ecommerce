import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];
// const user = JSON.parse(localStorage.getItem("user"));
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.userid === action.payload.userid
            );

            if (item) {
                // already exists → increase quantity
                item.quantity += 1;
            } else {
                // new item → add to cart
                state.push({
                    ...action.payload,
                    quantity: 1,
                    time: Date.now(),
                    date: new Date()?.toISOString()
                });
            }
        },
        deleteFromCart(state, action) {
            return state.filter(
                (item) =>
                    !(
                        item.id === action.payload.id &&
                        item.userid === action.payload.userid
                    )
            );
        },
        decrementQuantity: (state, action) => {
            const index = state.findIndex(
                (item) =>
                    item.id === action.payload.id &&
                    item.userid === action.payload.userid
            );

            if (index !== -1) {
                if (state[index].quantity > 1) {
                    state[index].quantity -= 1;
                } else {
                    state.splice(index, 1); // remove item
                }
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.find(
                (item) =>
                    item.id === action.payload.id &&
                    item.userid === action.payload.userid
            );

            if (item) {
                item.quantity += 1;
            }
        },
        clearUserCart: (state, action) => {
            console.log("payload", action.payload);
            return state.filter(
                item => item.userid !== action.payload
            );
        }
    }
})

export const { addToCart, deleteFromCart, decrementQuantity, incrementQuantity, clearUserCart } = cartSlice.actions;
export default cartSlice.reducer;