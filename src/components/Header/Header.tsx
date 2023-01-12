import React, { useDebugValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setResetSearch } from '../../redux/search/slice';
import { RootState } from '../../redux/store';
import { AuthorizationButtons } from '../AuthorizationButtons/AuthorizationButtons';
import './Header.css';

export const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const isLogin = useSelector((state: RootState) => state.auth.loginName);

  const clickSearch = () => {
    dispatch(setResetSearch());
  };
  return (
    <div className="header">
      <Link to="/" className="header__logo">
        LOGO
      </Link>
      {pathname.substring(0, 7) !== '/search' ? (
        <Link
          onClick={() => {
            clickSearch();
          }}
          to="/search"
          className="header__search"
        >
          Глобальный поиск по названию
        </Link>
      ) : (
        <Link to={isLogin ? '/history' : '/signin'} className="header__search">
          История поиска
        </Link>
      )}
      {isLogin && (
        <Link to={'/favorites'} className={'my-favorites'}>
          My favorites
        </Link>
      )}
      <AuthorizationButtons />
    </div>
  );
};
