/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TCartProduct = {
  cartId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
};

type TCheckout = {
  cartProducts: TCartProduct[];
  total: number;
};

type TCheckoutState = {
  checkout: TCheckout;
};

const initialState: TCheckoutState = {
  checkout: {
    cartProducts: [],
    total: 0,
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // add to checkout
    addToCheckout: (state, action) => {
      state.checkout = action.payload.checkOutDetails;
    },
  },
});

export const { addToCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
export const selectCheckoutProducts = (state: RootState) => state.cart.items as any;
