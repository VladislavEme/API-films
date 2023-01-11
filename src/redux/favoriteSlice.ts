import { createSlice } from '@reduxjs/toolkit';

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [],
  reducers: {
    addFavorite: (state: string[], action) => {
      if (!state.includes(action.payload)) {
        const newFavorite = action.payload;
        state.push(newFavorite);
      }
    },
    deleteFavorite: (state: string[], action) => {
      state.splice(
        state.findIndex((id: string) => id === action.payload),
        1
      );
    },
  },
});

export const { addFavorite, deleteFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
