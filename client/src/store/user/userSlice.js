import { createSlice, current } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    cartTotal: 0,
    userList: [],
  },
  reducers: {
    addCartItem: (currentSlice, action) => {
      currentSlice.userList.push(action.payload);
      currentSlice.cartTotal += parseFloat(action.payload.price);
    },
    removeCartItem: (currentSlice, action) => {
      const docIDToRemove = action.payload.docID;

      // Find the index of the item with the given docID in the userList
      const itemIndex = currentSlice.userList.findIndex(
        (item) => item.docID === docIDToRemove
      );

      if (itemIndex !== -1) {
        // Remove the item from userList and subtract its price from cartTotal
        const removedItem = currentSlice.userList.splice(itemIndex, 1)[0];
        currentSlice.cartTotal -= parseFloat(removedItem.price);
      }
    },
  },
});

export const { addCartItem, removeCartItem } = userSlice.actions;
