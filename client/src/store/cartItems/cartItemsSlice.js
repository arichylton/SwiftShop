import { createSlice, current } from '@reduxjs/toolkit';

export const cartItemsSlice = createSlice({
  name: 'cartItemsSlice',
  initialState: {
    cartTotal: 0,
    cartItemsList: [],
  },
  reducers: {
    addCartItem: (currentSlice, action) => {
      currentSlice.cartItemsList.push(action.payload);
      currentSlice.cartTotal += parseFloat(action.payload.price);
    },
    removeCartItem: (currentSlice, action) => {
      const docIDToRemove = action.payload.docID;

      // Find the index of the item with the given docID in the cartItemsList
      const itemIndex = currentSlice.cartItemsList.findIndex(
        (item) => item.docID === docIDToRemove
      );

      if (itemIndex !== -1) {
        // Remove the item from cartItemsList and subtract its price from cartTotal
        const removedItem = currentSlice.cartItemsList.splice(itemIndex, 1)[0];
        currentSlice.cartTotal -= parseFloat(removedItem.price);
      }
    },
  },
});

export const { addCartItem, removeCartItem } = cartItemsSlice.actions;
