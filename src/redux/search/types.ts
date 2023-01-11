import { FilmData } from '../../components/Cards/Cards';

export interface SearchState {
  isLoading: boolean;
  clickSubmitForm: boolean;
  isQuestion: boolean;
  fetchedMovies: FilmData[];
  exact: boolean | undefined;
  searchValue: string;
  year: string;
  startYear: number | string;
  endYear: number | string;
  titleType: string;
}

export interface SearchParse {
  searchValue: string;
  exact: boolean | string;
  titleType: string;
  year: string;
  startYear: number | string;
  endYear: number | string;
}
