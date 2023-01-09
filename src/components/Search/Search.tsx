import React, { useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import './Search.css';
// import { setSearchValue } from '../../redux/searchSlice';
// import { RootState } from '../../redux/store';
import axios from 'axios';
import { FilmData } from '../Cards/Cards';
import FilmItem from '../FilmItem/FilmItem';
import { useNavigate, useParams } from 'react-router-dom';

export const Search = () => {
  // const dispatch = useDispatch();
  // const searchValue = useSelector((state: RootState) => state.search.searchValue);

  let searchParse = null;
  const buttonSearch = useRef<any>(null);

  const { search } = useParams();
  if (typeof search !== 'undefined') {
    searchParse = JSON.parse(search);
  }
  React.useEffect(() => {
    if (typeof search !== 'undefined') {
      buttonSearch.current.click();
    }
  }, []);

  const navigate = useNavigate();
  const currentYear = new Date();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedMovies, setFetchedMovies] = useState<Array<FilmData>>([]);
  const [searchValue, setSearchValue] = useState<string>(searchParse?.searchValue || '');
  const [exact, setEvact] = useState<boolean>(searchParse?.exact || false);
  const [year, setYear] = useState<number | string>(searchParse?.year || '');
  const [startYear, setStartYear] = useState<number | string>(searchParse?.startYear || '');
  const [endYear, setEndYear] = useState<number | string>(searchParse?.endYear || '');
  const [titleType, setTitleType] = useState<string>(searchParse?.titleType || '');
  const [clickSubmitForm, setClickSubmitForm] = useState<boolean>(false);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // dispatch(setSearchValue(e.target.value));
    setSearchValue(e.target.value);
  };

  const clickClear = () => {
    // dispatch(setSearchValue(''));
    setSearchValue('');
  };

  const changeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvact(e.target.checked);
  };

  const changeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const changeStartYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartYear(e.target.value);
  };

  const changeEndYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndYear(e.target.value);
  };

  const changeTitleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTitleType(e.target.value);
  };

  const clickClearParams = () => {
    setSearchValue('');
    setYear('');
    setStartYear('');
    setEndYear('');
    setEvact(false);
    setFetchedMovies([]);
    setClickSubmitForm(false);
    setTitleType('');
    setIsLoading(false);
    navigate('/search');
  };

  const onSubmitSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchValue}`,
      params: {
        exact: exact,
        limit: '20',
        info: 'base_info',
        year: year ? year : null,
        startYear: startYear ? startYear : null,
        endYear: endYear ? endYear : null,
        titleType: titleType ? titleType : null,
      },
      headers: {
        'X-RapidAPI-Key': 'c4a8f129abmsh579ca929103e431p121e93jsn920b0773c893',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    };
    const getData = async () => {
      const { data } = await axios.request(options);
      const { results } = data;
      setFetchedMovies(results);
      setIsLoading(true);
    };
    getData();
    setClickSubmitForm(true);
    const search = JSON.stringify({
      searchValue,
      exact,
      titleType,
      year,
      startYear,
      endYear,
    });
    navigate(`/search/title/${search}`);
  };

  return (
    <>
      <div className='search'>
        <form className='search__form' onSubmit={onSubmitSearch}>
          <label className='search__label-text'>
            <input
              required
              type='text'
              className='search__input'
              value={searchValue}
              placeholder='Search title'
              onChange={changeSearch}
            />
            {searchValue && (
              <svg className='search__clear' onClick={() => clickClear()} viewBox='0 0 24 24'>
                <path d='M16.707,7.293a1,1,0,0,0-1.414,0L12,10.586,8.707,7.293A1,1,0,1,0,7.293,8.707L10.586,12,7.293,15.293a1,1,0,1,0,1.414,1.414L12,13.414l3.293,3.293a1,1,0,0,0,1.414-1.414L13.414,12l3.293-3.293A1,1,0,0,0,16.707,7.293Z' />
              </svg>
            )}
          </label>

          <label className='search__label-checkbox'>
            <input className='search__input-checkbox' type='checkbox' checked={exact} onChange={changeCheckbox} />
            Точное название
          </label>

          <select className='search__select' name='title-type' value={titleType} onChange={changeTitleType}>
            <option value={''}>Выберите тип:</option>
            <option value='movie'>Movie</option>
            <option value='musicVideo'>Music video</option>
            <option value='podcastEpisode'>Podcast episode</option>
            <option value='podcastSeries'>Podcast series</option>
            <option value='short'>Short</option>
            <option value='tvEpisode'>TV episode</option>
            <option value='tvMiniSeries'>TV miniseries</option>
            <option value='tvMovie'>TV movie</option>
            <option value='tvPilot'>TV pilot</option>
            <option value='tvSeries'>TV series</option>
            <option value='tvShort'>TV short</option>
            <option value='tvSpecial'>TV special</option>
            <option value='video'>Video</option>
            <option value='videoGame'>Video game</option>
          </select>

          <input
            className='search__input'
            min={1800}
            max={currentYear.getFullYear()}
            type='number'
            placeholder='Year'
            value={year}
            onChange={changeYear}
            disabled={startYear || endYear ? true : false}
          />

          <label className='search__label-years-range'>
            <input
              className='search__input search__input-years-range'
              min={1800}
              max={currentYear.getFullYear()}
              type='number'
              placeholder='Start year'
              value={startYear}
              onChange={changeStartYear}
              disabled={year ? true : false}
            />
            -
            <input
              className='search__input search__input-years-range'
              type='number'
              min={1800}
              max={currentYear.getFullYear()}
              placeholder='End year'
              value={endYear}
              onChange={changeEndYear}
              disabled={year ? true : false}
            />
          </label>

          <div className='search__buttons'>
            <button className='search__button search__button-search' ref={buttonSearch}>
              Найти
            </button>
            <button className='search__button search__button-clear' type='button' onClick={() => clickClearParams()}>
              Сброс
            </button>
          </div>
        </form>
      </div>
      <div className='cards'>
        {fetchedMovies.length ? (
          fetchedMovies.map((filmData) => <FilmItem key={filmData.id} {...filmData} />)
        ) : clickSubmitForm && isLoading ? (
          <span className='search__error'>Ничего не найдено :(</span>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
