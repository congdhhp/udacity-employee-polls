import { configureStore } from '@reduxjs/toolkit';
import authedSlice from './authSlice'
import questionSlice from './questionSlice'
import userSlice from './userSlice'
import loadingSlice from './loadingSlice'
export const store = configureStore({
  reducer: {
    auth: authedSlice,
    question: questionSlice,
    user: userSlice,
    loading: loadingSlice
  },
});
