import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCart = {
  totalPrice: number;
  title: string;
  category: string;
  quantity: number;
  price: number;
  imageUrl: string;
  _id: any;
};

export type TCartState = {
  cart: TCart[];
};

const initialState: TCartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<TCart>) => {
      state.cart.push(action.payload);
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
