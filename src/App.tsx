import React from 'react';
import Cards from './components/Cards/Cards';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import FullMovie from './components/FullMovie/FullMovie';
import { Search } from './components/Search/Search';
import { HistorySearch } from './components/HistorySearch/HistorySearch';
import { Header } from './components/Header/Header';
import Favorites from './components/Favorites/Favorites';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/movie/:id" element={<FullMovie />}></Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="search" element={<Search />} />
        <Route path="search/title/:search/" element={<Search />} />
        <Route path="history" element={<HistorySearch />} />
      </Routes>
    </>
  );
}

export default App;
