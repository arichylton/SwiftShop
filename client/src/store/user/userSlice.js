import { createSlice, current } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (currentSlice, action) => {
      console.log(action.payload)
      currentSlice.currentUser = action.payload;
    }
  },
});

export const { setCurrentUser } = userSlice.actions;
