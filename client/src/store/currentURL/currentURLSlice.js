import { createSlice, current } from '@reduxjs/toolkit';

export const currentURLSlice = createSlice({
  name: 'currentURLSlice',
  initialState: {
    currentURL: '',
  },
  reducers: {
    updateURL: (currentSlice, action) => {
      currentSlice.currentURL = (action.payload);
    }
  },
});

export const { updateURL } = currentURLSlice.actions;
