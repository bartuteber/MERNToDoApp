import { createSlice } from '@reduxjs/toolkit';

export const toDosSlice = createSlice({
  name: 'toDos',
  initialState: {
    value: null
  },
  reducers: {
    setToDos: (state, action) => {
      state.value = [...action.payload];
    }
  }
});

export const { setToDos } = toDosSlice.actions;

export default toDosSlice.reducer;
