import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  product: {
    search?: string;
  };
  singleProduct: string;

  // searchProduct: Record<string, unknown>;
}

const initialState: ProductState = {
  product: {},
  singleProduct: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchInput: (state, action: PayloadAction<{ search: string }>) => {
      state.product = action.payload;
    },
    singleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
});

export const { searchInput, singleProduct } = productSlice.actions;
export default productSlice.reducer;
