import React, { useState, useRef } from 'react';
import './SignUp.css';

export type UsersType = {
  name: string;
  email: string;
  password: string;
  favorites: [];
  history: [];
};

export const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const testPassword = password === repeatPassword && password.length > 7;

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const changeRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const onSubmitSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const user: UsersType = {
      name: name,
      email: email,
      password: password,
      favorites: [],
      history: [],
    };

    const usersString: string | null = localStorage.getItem('users');

    if (usersString === null) {
      localStorage.setItem('users', JSON.stringify([user]));
      setSuccess(true);
    } else {
      setError('');
      const usersArr = JSON.parse(usersString);

      if (usersArr.find((item: UsersType) => item.name == name)) {
        setError('Такой ник уже существует');
        return;
      }

      if (usersArr.find((item: UsersType) => item.email == email)) {
        setError('Такой E-mail уже зарегистрирован');
        return;
      }

      setSuccess(true);
      usersArr.push(user);
      localStorage.setItem('users', JSON.stringify(usersArr));
    }
  };

  return (
    <form className='authoriz__form' onSubmit={onSubmitSignUp}>
      {!success ? (
        <div className='authoriz__registration'>
          <label>
            <input type='text' maxLength={20} minLength={3} placeholder='Nickname*' required onChange={changeName} />
          </label>
          <label>
            <input type='email' maxLength={40} placeholder='E-mail*' required onChange={changeEmail} />
          </label>
          <label>
            <input
              type='password'
              minLength={8}
              maxLength={20}
              placeholder='Password*'
              required
              onChange={changePassword}
            />
          </label>
          <label>
            <input
              type='password'
              minLength={8}
              maxLength={20}
              placeholder='Repeat password*'
              required
              onChange={changeRepeatPassword}
            />
          </label>
          {repeatPassword && (
            <span className='message error'>
              {testPassword ? '' : 'Пароль должен иметь не менее 8 знаков и совпадать'}
            </span>
          )}
          <button className='registration__button' type='submit' disabled={testPassword ? false : true}>
            Регистрация
          </button>
          {error && <span className='message'>{error}</span>}
        </div>
      ) : (
        <span className='success'>Регистрация прошла успешно!</span>
      )}
    </form>
  );
};
