import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../src/productSlice";
import cartReducer from "../src/cartSlice";
export const store = configureStore({
  reducer: { product: productReducer, cart: cartReducer },
});
