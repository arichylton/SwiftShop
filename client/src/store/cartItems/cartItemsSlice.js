import { createSlice } from '@reduxjs/toolkit';

export const cartItemsSlice = createSlice({
  name: 'cartItemsSlice',
  initialState: {
    cartTotal: 0,
    cartItemsList: {},
  },
  reducers: {
    addCartItem: (currentSlice, action) => {
      if (action.payload.docID in currentSlice.cartItemsList) {
        currentSlice.cartItemsList[action.payload.docID].cartQuantity += 1;
      } else {
        currentSlice.cartItemsList[action.payload.docID] = { ...action.payload, cartQuantity: 1 };
      }

      currentSlice.cartTotal += parseFloat(action.payload.price);
    },
  },
});

export const { addCartItem } = cartItemsSlice.actions;
