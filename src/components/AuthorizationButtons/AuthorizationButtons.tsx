import React, { useState } from 'react';
import { SignUp } from '../SignUp/SignUp';
import { SignIn } from '../SignIn/SignIn';
import './AuthorizationButtons.css';

export const AuthorizationButtons: React.FC = () => {
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [signUpOpen, setsignUpOpen] = useState<boolean>(false);

  const clickSignIn = () => {
    setSignInOpen(true);
    setsignUpOpen(false);
  };

  const clicksignUp = () => {
    setsignUpOpen(true);
    setSignInOpen(false);
  };

  return (
    <>
      <div className="authoriz__button-group">
        <button onClick={() => clickSignIn()}>Вход</button>
        <button onClick={() => clicksignUp()}>Регистрация</button>
      </div>
      {signInOpen && <SignIn />}
      {signUpOpen && <SignUp />}
    </>
  );
};
