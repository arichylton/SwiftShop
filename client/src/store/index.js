import { configureStore } from '@reduxjs/toolkit';
import { cartItemsSlice } from './cartItems/cartItemsSlice';

const store = configureStore({
  reducer: {
    CART: cartItemsSlice.reducer
  },
});

export { store };
