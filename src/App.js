import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import FindUs from './components/FindUs.js';
import Order from './components/Order.js';
import MenuPage from './components/MenuPage.js';
import NotFound from './components/NotFound.js';
import Navbar from "./components/Navbar";
import SignUp from './components/SignUp.js';
import { auth } from './index';
import { useState } from 'react';

function App() {
  const [authot, changeAuth] = useState(auth.currentUser);
  return (
    <Router>
      <Navbar authot={authot} changeAuth={changeAuth}></Navbar>
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route exact path="/Find-Us" element={<FindUs></FindUs>}></Route>
        <Route exact path="/Order" element={!authot ?
          <Order></Order> :
          <Navigate to="/"></Navigate>}></Route>
        <Route exact path="/Menu" element={<MenuPage></MenuPage>}></Route>
        <Route exact path="/Sign-Up" element={!authot ?
          <SignUp authot={authot} changeAuth={changeAuth}></SignUp> :
          <Navigate to="/"></Navigate>}>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </Router>
  );
}

export default App
