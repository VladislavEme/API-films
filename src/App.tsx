import React from 'react';
import Cards from './components/Cards/Cards';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import MainLayouts from './components/Layouts/MainLayout';
import FullMovie from './components/FullMovie/FullMovie';
import { Search } from './components/Search/Search';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayouts />}>
        <Route path='/' element={<Cards />} />
        <Route path='/movie/:id' element={<FullMovie />}></Route>
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='search' element={<Search />} />
        <Route path='search/title/:search/' element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
