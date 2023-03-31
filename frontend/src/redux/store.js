import { configureStore } from '@reduxjs/toolkit';
import toDosReducer from './slices/toDosSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    toDos: toDosReducer
  }
});
