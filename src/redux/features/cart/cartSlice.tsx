/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { TCartItem } from "@/types/ProductType";
import { createSlice } from "@reduxjs/toolkit";

type TCartState = {
    items: TCartItem[];
};

const initialState: TCartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add to cart
        addCartItems: (state, action) => {
            state.items = action.payload.items;
        },
        // update cart quantity
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item._id === action.payload.cartId);
            if (item) {
                const newQuantity = item.quantity + action.payload.quantity;
                if (newQuantity >= 1 && newQuantity <= item.product.quantity) {
                    item.quantity = newQuantity;
                }
            }
        }
    }
});

export const { addCartItems, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartProducts = (state: RootState) => state.cart.items as any;