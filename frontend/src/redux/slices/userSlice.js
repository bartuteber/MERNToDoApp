import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload ?? null;
    },
    resetUser: (state) => {
      state.value = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
