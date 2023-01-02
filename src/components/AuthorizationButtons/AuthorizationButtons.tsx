import React, { useState } from 'react';
import { SignUp } from '../SignUp/SignUp';
import { SignIn } from '../SignIn/SignIn';
import './AuthorizationButtons.css';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginName } from '../../redux/authSlice';

export const AuthorizationButtons: React.FC = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.loginName);

  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [signUpOpen, setsignUpOpen] = useState<boolean>(false);

  const loginUser = localStorage.getItem('login');

  const clickSignIn = () => {
    setSignInOpen(true);
    setsignUpOpen(false);
  };

  const clicksignUp = () => {
    setsignUpOpen(true);
    setSignInOpen(false);
  };

  const clickExit = () => {
    localStorage.removeItem('login');
    dispatch(setLoginName(null));
  };

  return (
    <>
      <div className="authoriz__button-group">
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
      {signInOpen && <SignIn />}
      {signUpOpen && <SignUp />}
    </>
  );
};
