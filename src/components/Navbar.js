import React, { useContext } from 'react';
import "../css/Navbar.css"
import accPic from '../images/accJSX.svg';
import cartPic from '../images/cart.svg';
import SignIn from './SignIn';
import { useState } from 'react';
import { UserContext, CartContext } from '../App';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const currentUser = useContext(UserContext);
    const cart = useContext(CartContext);

    return (
        <div style={{ position: 'relative', zIndex: '10'}}>
            <div style={{backgroundColor: "#ffe1bd"}} className="flex justify-center">
                <Link to="/" className="text-8xl text-center mp-4" id="logoH1">CRISPIES</Link>
            </div>
            <div className="border-t-2 border-b-2 border-offblack flex flex-row justify-between h-12">
                <Link to="/Menu" className="bg-sea hover:bg-sealight font-bold py-2 px-2 border-r-2
                border-offblack text-center flex items-center text-offblack shrink-0 itemNav">Menu</Link>
                <Link to="/Find-Us" className="bg-sea hover:bg-sealight font-bold py-2 px-2 border-r-2
                border-offblack text-center flex items-center text-offblack shrink-0 itemNav">Find Us</Link>
                <div className="flex-auto whitespace-nowrap text-offblack bg-terra" id="scroll-container">
                    <div id="scroll-text" className="text-2xl mt-1">Crispy Chicken Burger • Chicken Wrap • Sexy Burger</div>
                </div>
                <div className="flex flex-row shrink-0">
                    <button className="buttonBorder bg-sea hover:bg-sealight" onClick={() => props.changeClick(!props.clicked)}>
                        <img src={accPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </button>
                    <Link to='/Order' className="buttonBorder bg-sea hover:bg-sealight">
                        <div className='float-right relative'>
                        <img src={cartPic} className="w-10 pt-1 mx-3 justify-end"></img>
                        {currentUser && Object.keys(cart).length > 0 &&
                        <div className='absolute top-1 left-1 bg-red-600 w-4 h-4 text-white text-xs rounded-full text-align-center flex flex-row align-center justify-center'>{Object.keys(cart).length }</div>}
                        </div>
                    </Link>
                </div>
            </div>
            {props.clicked &&
                <div id="userDiv">
                    <SignIn authot={props.authot} changeAuth={props.changeAuth} changeClick={props.changeClick}></SignIn>
                </div>}
        </div>
    )
}
export default Navbar;