/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type TCartProduct = {
  cartId: string;
  product: string;
  quantity: number;
};

type TCheckout = {
  cartProducts: TCartProduct[];
  total: number;
};

const initialState: TCheckout = {
  cartProducts: [],
  total: 0,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // add to checkout
    addToCheckout: (state, action) => {
      console.log("Payload from checkout slice:", action.payload.checkOutDetails);
    },
  },
});

export const { addToCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
export const selectCheckoutProducts = (state: RootState) =>
  state.cart.items as any;
