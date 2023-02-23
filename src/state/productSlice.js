import { createSlice } from "@reduxjs/toolkit";

/**
 * @description creating initial application state
 */
const initialState = {
  products: [],
};

/**
 * @description setting up actions and reducer for managing  state globally in the whole app
 */
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.products = JSON.parse(localStorage.getItem("products")) || [];
    },
  },
});

export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
