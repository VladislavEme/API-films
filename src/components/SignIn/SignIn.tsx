import React from 'react';
import './SignIn.css';

export const SignIn: React.FC = () => {
  return (
    <form className="authoriz__sign-in" onSubmit={(e) => e.preventDefault()}>
      <label>
        <input type="email" maxLength={40} placeholder="E-mail or nickname" required />
      </label>
      <label>
        <input type="password" placeholder="Password" required min={8} />
      </label>
      <button>Вход</button>
    </form>
  );
};
