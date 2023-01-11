import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import searchReducer from './search/slice';
import favoriteReducer from './favoriteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
