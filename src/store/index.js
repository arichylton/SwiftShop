import { configureStore } from '@reduxjs/toolkit';
import { cartItemsSlice } from './cartItems/cartItemsSlice';
import { userSlice } from './user/userSlice';
import { currentURLSlice } from './currentURL/currentURLSlice';

const store = configureStore({
  reducer: {
    CART: cartItemsSlice.reducer,
    USER: userSlice.reducer,
    URL: currentURLSlice.reducer,
  },
});

export { store };
