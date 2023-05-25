import {BrowserRouter,  Routes, Route } from 'react-router-dom'

import { useState, useEffect, useContext } from 'react';
import Login from './components/auth/Login';
import { myContext } from './Context';
import Header from './components/header/Header';
import Register from './components/auth/Register';
import MessagesPage from './components/message/MessagesPage';


const {REACT_APP_USER_SERVICE} = process.env

function NotFound() {
  <div>Bad gateway</div>
}

function App() {
  const userContext = useContext(myContext)

  
  return (
    <BrowserRouter>
      <div id='app'>
        {userContext.userObj !== null && <Header />}
        <Routes>
          <Route path='/' element={<Login /> } />
          <Route path='/register' element={<Register />} />
          <Route path='/messages' element={<MessagesPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
