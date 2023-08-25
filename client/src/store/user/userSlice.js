import { createSlice, current } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (currentSlice, action) => {
      currentSlice.currentUser = action.payload;
    },
    addUserCartItem: (currentSlice, action) => {
      currentSlice.currentUser.cart.push(action.payload);
    },
    removeFromUserCart: (currentSlice, action) => {
      const docIDToRemove = action.payload.docID;
      const sizeToRemove = action.payload.size;

      // Find the index of the item with the given docID in the cartItemsList
      const itemIndex = currentSlice.currentUser.cart.findIndex(
        (item) => item.docID === docIDToRemove && item.size === sizeToRemove
      );

      if (itemIndex !== -1) {
        // Remove the item from cartItemsList and subtract its price from cartTotal
        currentSlice.currentUser.cart.splice(itemIndex, 1)[0];
      }
    },
    clearUserCart: (currentSlice, action) => {
      currentSlice.currentUser.cart = [];
    },
  },
});

export const { setCurrentUser, addUserCartItem, removeFromUserCart, clearUserCart } =
  userSlice.actions;
