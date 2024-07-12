import { createSlice } from "@reduxjs/toolkit";

export type TCart = {
  cart: TCart[];
};

const initialState: TCart = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
