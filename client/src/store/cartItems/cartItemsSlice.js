import { createSlice } from "@reduxjs/toolkit";

export const cartItemsSlice = createSlice({
  name: 'cartItemsSlice',
  initialState: {
    cartTotal: 0,
    cartItemsList: [],
  },
  reducers: {
    addCartItem: (currentSlice, action) => {
      console.log('addCartItem');
      currentSlice.cartItemsList.push(action.payload)
      currentSlice.cartTotal += parseFloat(action.payload.price)
    },
  },
});

export const { addCartItem } = cartItemsSlice.actions;
