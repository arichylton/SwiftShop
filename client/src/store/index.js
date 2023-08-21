import { configureStore } from '@reduxjs/toolkit';
import { cartItemsSlice } from './cartItems/cartItemsSlice';
import { userSlice } from './user/userSlice';

const store = configureStore({
  reducer: {
    CART: cartItemsSlice.reducer,
    USER: userSlice.reducer,
  },
});

export { store };
