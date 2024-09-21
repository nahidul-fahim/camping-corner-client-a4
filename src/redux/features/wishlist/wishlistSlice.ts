/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export type TWishlistProduct = {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
};

type TWishlistState = {
    wishlistItems: TWishlistProduct[];
};

const initialState: TWishlistState = {
    wishlistItems: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const existingItem = state.wishlistItems.find(
                item => item.productId === action.payload.productId
            );
            if (!existingItem) {
                state.wishlistItems.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(
                item => item.productId !== action.payload
            );
        },
        clearWishlist: (state) => {
            state.wishlistItems = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
export const selectWishlistItems = (state: RootState) => state.wishlist.wishlistItems as any;