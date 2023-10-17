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
      const sizeToRemove = action.payload.size;
      // Find the index of the item with the given docID in the cartItemsList
      const itemIndex = currentSlice.cartItemsList.findIndex(
        (item) => item.docID === docIDToRemove && item.size === sizeToRemove
      );

      if (itemIndex !== -1) {
        // Remove the item from cartItemsList and subtract its price from cartTotal
        const removedItem = currentSlice.cartItemsList.splice(itemIndex, 1)[0];
        currentSlice.cartTotal -= parseFloat(removedItem.price);
      }
    },
    clearCart: (currentSlice, action) => {
      currentSlice.cartItemsList = [];
      currentSlice.cartTotal = 0;
    },
  },
});

export const { addCartItem, removeCartItem, clearCart } = cartItemsSlice.actions;
