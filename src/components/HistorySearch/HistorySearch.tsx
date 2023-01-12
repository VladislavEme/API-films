import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setResetSearch, setSearchParse } from '../../redux/search/slice';
import { UsersType } from '../SignUp/SignUp';
import './HistorySearch.css';
import './HistorySearch.css';

export const HistorySearch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginName = localStorage.getItem('login');
  const usersString = localStorage.getItem('users');
  const users = usersString && JSON.parse(usersString);
  const user = users.find((item: UsersType) => item.name === loginName);

  const [history, setHistory] = useState<Object[] | null>(null);

  React.useEffect(() => {
    if (loginName) {
      setHistory(user.history);
    }
  }, []);

  const clickHistoryItem = (i: number) => {
    const paramsQuery = user.history[i];
    navigate('/search');
    dispatch(setSearchParse(paramsQuery));
  };

  const clickClearHistory = () => {
    user.history = [];
    localStorage.setItem('users', JSON.stringify(users));
    dispatch(setResetSearch());
    navigate('/search');
    alert('История поиска успешно удалена');
  };

  return (
    <>
      <button
        className="history__button-clear"
        onClick={() => {
          clickClearHistory();
        }}
      >
        Очистить историю поиска
      </button>
      <div className="container history__container">
        {!history?.length && <h2>История поиска пуста :(</h2>}
        <ol className="history__list">
          {history &&
            history.map((item: any, i) => (
              <li className="history__item" onClick={() => clickHistoryItem(i)} key={i}>
                {' '}
                <p>
                  <b>Уникальный запрос №{i + 1}</b>
                </p>
                <p>
                  {` Название: `} <b>{item.searchValue}</b>
                </p>
                {item.exact && (
                  <p>
                    Точный поиск:<b>{`  ${item.exact === 'true' ? 'да' : 'нет'}`}</b>
                  </p>
                )}
                {item.titleType && (
                  <p>
                    {` Тип видео: `}
                    <b>{item.titleType}</b>
                  </p>
                )}
                {item.year && (
                  <p>
                    {` Год: `}
                    <b> {item.year}</b>
                  </p>
                )}
                {item.startYear && (
                  <p>
                    От <b>{item.startYear}</b> года
                  </p>
                )}
                {item.endYear && (
                  <p>
                    От <b>{item.endYear}</b> года
                  </p>
                )}
              </li>
            ))}
        </ol>
      </div>
    </>
  );
};
