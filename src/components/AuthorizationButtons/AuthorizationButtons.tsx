import React from 'react';
import './AuthorizationButtons.css';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginName } from '../../redux/authSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const AuthorizationButtons: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state: RootState) => state.auth.loginName);
  const url = useLocation();

  const clickSignIn = () => {
    navigate('/signin');
  };

  const clicksignUp = () => {
    navigate('/signup');
  };

  const clickExit = () => {
    localStorage.removeItem('login');
    dispatch(setLoginName(null));
    if (url.pathname === '/history') {
      navigate('/signin');
    }
  };

  return (
    <>
      <div className='authoriz__button-group'>
        {!loginUser ? (
          <>
            <button onClick={() => clickSignIn()}>Вход</button>
            <button onClick={() => clicksignUp()}>Регистрация</button>
          </>
        ) : (
          <>
            <span>Welcome, {loginUser}</span>
            <button onClick={() => clickExit()}>Выйти</button>
          </>
        )}
      </div>
    </>
  );
};
