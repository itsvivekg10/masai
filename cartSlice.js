import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      let item = action.payload;
      state.items.push(item);
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
