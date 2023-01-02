import React, { useState } from 'react';
import './SignIn.css';
import type { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginName } from '../../redux/authSlice';

type UsersType = {
  name: string;
  email: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const loginName = useSelector((state: RootState) => state.auth.loginName);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitSignIn = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const usersString: string | null = localStorage.getItem('users');
    const usersArr = JSON.parse(usersString!);

    setError('');

    const user = usersArr.find(
      (item: UsersType) => (item.name == email || item.email == email) && item.password == password
    );

    if (user) {
      localStorage.setItem('login', user.name);
      dispatch(setLoginName(user.name));
      return;
    } else {
      setError('Неверный ник, E-mail или пароль');
    }
  };

  return (
    <form className="authoriz__sign-in" onSubmit={onSubmitSignIn}>
      {!loginName ? (
        <>
          <label>
            <input type="text" maxLength={40} placeholder="E-mail or nickname" required onChange={changeEmail} />
          </label>
          <label>
            <input
              type="password"
              minLength={8}
              maxLength={20}
              placeholder="Password*"
              required
              onChange={changePassword}
            />
          </label>
          <button>Вход</button>
          {error && <span className="error message">{error}</span>}
        </>
      ) : (
        <span className="success">Вход выполнен</span>
      )}
    </form>
  );
};
