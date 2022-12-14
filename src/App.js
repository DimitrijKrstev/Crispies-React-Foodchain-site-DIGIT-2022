import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import FindUs from './components/FindUs.js';
import Order from './components/Order.js';
import MenuPage from './components/MenuPage.js';
import NotFound from './components/NotFound.js';
import Navbar from "./components/Navbar";
import SignUp from './components/SignUp.js';
import { auth } from './index';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

export const UserContext = React.createContext(null);
function App() {
  //useEffect za da ne se izvrsi poveke pati
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserState(user);
    })
  }, [])
  const [userState, setUserState] = useState(null);
  const [profileClicked, changeClick] = useState(false);
  const ref = useRef(null);

  return (
    <Router>
      <UserContext.Provider value={userState}>
        <Navbar authot={userState} clicked={profileClicked} changeClick={changeClick}></Navbar>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/Find-Us" element={<FindUs></FindUs>}></Route>
          <Route exact path="/Order" element={userState ?
            <Order></Order> :
            <Navigate to="/"></Navigate>}></Route>
          <Route exact path="/Menu" element={<MenuPage authot={userState} changeClick={changeClick}></MenuPage>}></Route>
          <Route exact path="/Sign-Up" element={!userState ?
            <SignUp authot={userState}></SignUp> :
            <Navigate to="/"></Navigate>}>
          </Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App
