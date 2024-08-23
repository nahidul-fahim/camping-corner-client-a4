/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";


type TProduct = {
    _id: string;
    category: string;
    description: string;
    image: string;
    isDeleted: boolean;
    name: string;
    price: number;
    quantity: number;
    rating: number;
    slug: string;
    updatedAt: Date;
    createdAt: Date
}

type TCartItem = {
    _id: string;
    user: string;
    quantity: number;
    updatedAt: Date;
    createdAt: Date;
    product: TProduct;
}

type TCartState = {
    items: TCartItem[];
}

const initialState: TCartState = {
    items: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItems: (state, action) => {
            state.items.push(action.payload.items)
        }
    }
});


export const { addCartItems } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCartProducts = (state: RootState) => state.cart.items as any;