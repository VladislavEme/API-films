import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorizationButtons } from '../AuthorizationButtons/AuthorizationButtons';
import './Header.css';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const clickMainPage = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <span className="logo" onClick={() => clickMainPage()}>
        LOGO
      </span>
      <AuthorizationButtons />
    </div>
  );
};
