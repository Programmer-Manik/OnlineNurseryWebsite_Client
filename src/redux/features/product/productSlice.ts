import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  filter: {
    minPrice: string | "";
    maxPrice: string | "";
  };
  product: {
    search?: string;
  };
  category: {
    category: string;
  };
  singleProduct: string;

  // searchProduct: Record<string, unknown>;
}

const initialState: ProductState = {
  filter: {
    minPrice: "",
    maxPrice: "",
  },
  category: {
    category: "",
  },
  singleProduct: "",
  product: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchInput: (state, action: PayloadAction<{ search: string }>) => {
      state.product = action.payload;
    },
    searchFilter: (
      state,
      action: PayloadAction<{ minPrice: string | ""; maxPrice: string | "" }>
    ) => {
      state.filter = action.payload;
    },
    searchCategory: (state, action: PayloadAction<{ category: string }>) => {
      console.log(action.payload);
      state.category = action.payload;
    },
    singleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
  },
});

export const { searchInput, searchFilter, singleProduct, searchCategory } =
  productSlice.actions;
export default productSlice.reducer;
