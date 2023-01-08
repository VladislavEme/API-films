import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Search.css';
import { setSearchValue } from '../../redux/searchSlice';
import { RootState } from '../../redux/store';

export const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.search.searchValue);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const clickClear = () => {
    dispatch(setSearchValue(''));
  };

  return (
    <div className="search">
      <input className="search__input" value={searchValue} type="text" placeholder="Search" onChange={changeSearch} />
      {searchValue && (
        <svg className="search__clear" onClick={() => clickClear()} viewBox="0 0 24 24">
          <path d="M16.707,7.293a1,1,0,0,0-1.414,0L12,10.586,8.707,7.293A1,1,0,1,0,7.293,8.707L10.586,12,7.293,15.293a1,1,0,1,0,1.414,1.414L12,13.414l3.293,3.293a1,1,0,0,0,1.414-1.414L13.414,12l3.293-3.293A1,1,0,0,0,16.707,7.293Z" />
        </svg>
      )}
    </div>
  );
};
