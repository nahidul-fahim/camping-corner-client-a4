/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TCartProduct = {
  cartId: string;
  product: string;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
};

type TCheckout = {
  cartProducts: TCartProduct[];
  total: number;
  userId: string;
};

type TCheckoutState = {
  checkout: TCheckout;
};

const initialState: TCheckoutState = {
  checkout: {
    cartProducts: [],
    total: 0,
    userId: ''
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // add to checkout
    addToCheckout: (state, action) => {
      state.checkout = action.payload.checkoutDetails;
    },
    // clear checkout
    clearCheckout: (state) => {
      state.checkout = {
        cartProducts: [],
        total: 0,
        userId: ''
      }
    }
  },
});

export const { addToCheckout, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
export const selectCheckoutProducts = (state: RootState) => state.checkout.checkout as any;
