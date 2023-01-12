import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state: string[], action: PayloadAction<string>) => {
      if (!state.includes(action.payload)) {
        const newFavorite = action.payload;
        state.push(newFavorite);
      }
    },
    deleteFavorite: (state: string[], action: PayloadAction<string>) => {
      state.splice(
        state.findIndex((id: string) => id === action.payload),
        1
      );
    },
    clearStore: () => initialState,
  },
});

export const { addFavorite, deleteFavorite, clearStore } = favoriteSlice.actions;

export default favoriteSlice.reducer;
