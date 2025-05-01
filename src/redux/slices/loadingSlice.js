import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setGlobalLoading } = loadingSlice.actions;
export default loadingSlice.reducer;