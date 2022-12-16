import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.js';
import FindUs from './components/FindUs.js';
import Order from './components/Order.js';
import MenuPage from './components/MenuPage.js';
import NotFound from './components/NotFound.js';
import Navbar from "./components/Navbar";
import SignUp from './components/SignUp.js';
import { auth } from './index';
import React, { useEffect, useState} from 'react';
import { getFromFS } from './cartUtils.js';
import { rtdb } from './index';
import { ref, onValue } from 'firebase/database';

export const UserContext = React.createContext(null);
export const CartContext = React.createContext({});

function App() {
  //currentUser kako state
  const [userState, setUserState] = useState({uid: null});
  const [rtdbSubscription, setRtdbSubscription] = useState({unsub: () => {}});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserState(user);
      if (user) {
        //nov subscription
        const cartRef = ref(rtdb, `users/${user.uid}`);
        rtdbSubscription.unsub();
        setRtdbSubscription({unsub:
          onValue(cartRef, (snapshot) => {
          const rawCartObj = snapshot.val();
          getFromFS(rawCartObj,setCart);
          })
       })
      }
      else {
        //unsub od db
        rtdbSubscription.unsub();
        setRtdbSubscription(() => {});
      }
    })
  }, [])

  //Dali e kliknat profile
  const [profileClicked, changeClick] = useState(false);
  
  //CART SE ZEMA SO CONTEXT I SE KORISTI KADE POTREBNO, SETCART SE UPOTREBUVA SAMO VO ONVALUE DOLU
  const [cart, setCart] = useState({});
  //UPDATEIRAJ CART NA PROMENA NA RTDB ENTRY

  return (
    <Router>
      <CartContext.Provider value={cart}>
        <UserContext.Provider value={userState}>
          <Navbar authot={userState} clicked={profileClicked} changeClick={changeClick}></Navbar>
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/Find-Us" element={<FindUs></FindUs>}></Route>
            <Route exact path="/Order" element={userState ?
              <Order></Order> :
              <Navigate to="/Sign-Up"></Navigate>}></Route>
            <Route exact path="/Menu" element={
              <MenuPage authot={userState} changeClick={changeClick}></MenuPage>}>
            </Route>
            <Route exact path="/Sign-Up" element={!userState ?
              <SignUp authot={userState}></SignUp> :
              <Navigate to="/"></Navigate>}>
            </Route>
            <Route exact path="/Crispies-React-Foodchain-site-DIGIT-2022/"element={<Navigate to="/"></Navigate>}></Route>{/*For gh-pages*/}
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </UserContext.Provider>
      </CartContext.Provider>
    </Router>
  );
}

export default App
