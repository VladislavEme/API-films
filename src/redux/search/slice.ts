import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilmData } from '../../components/Cards/Cards';
import { SearchParse, SearchState } from './types';

const initialState: SearchState = {
  isLoading: false,
  clickSubmitForm: false,
  isQuestion: false,
  fetchedMovies: [],
  exact: false,
  searchValue: '',
  year: '',
  startYear: '',
  endYear: '',
  titleType: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParse: (state, action: PayloadAction<SearchParse>) => {
      state.searchValue = action.payload.searchValue;
      state.exact = action.payload.exact === 'true';
      state.titleType = action.payload.titleType;
      state.year = action.payload.year;
      state.startYear = action.payload.startYear;
      state.endYear = action.payload.endYear;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setClickSubmitForm: (state, action: PayloadAction<boolean>) => {
      state.clickSubmitForm = action.payload;
    },
    setIsQuestion: (state, action: PayloadAction<boolean>) => {
      state.isQuestion = action.payload;
    },
    setFetchedMovies: (state, action: PayloadAction<FilmData[]>) => {
      state.fetchedMovies = action.payload;
    },
    setExact: (state, action: PayloadAction<boolean>) => {
      state.exact = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setStartYear: (state, action: PayloadAction<number | string>) => {
      state.startYear = action.payload;
    },
    setEndYear: (state, action: PayloadAction<number | string>) => {
      state.endYear = action.payload;
    },
    setTitleType: (state, action: PayloadAction<string>) => {
      state.titleType = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setClickSubmitForm,
  setIsQuestion,
  setFetchedMovies,
  setExact,
  setSearchValue,
  setYear,
  setStartYear,
  setEndYear,
  setTitleType,
  setSearchParse,
} = searchSlice.actions;
export default searchSlice.reducer;
