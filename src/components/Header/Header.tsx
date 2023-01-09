import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthorizationButtons } from '../AuthorizationButtons/AuthorizationButtons';
import './Header.css';

export const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className='header'>
      <Link to='/' className='header__logo'>
        LOGO
      </Link>
      {pathname.substring(0, 7) !== '/search' && (
        <Link to='/search' className='header__search'>
          Глобальный поиск по названию
        </Link>
      )}
      <AuthorizationButtons />
    </div>
  );
};
