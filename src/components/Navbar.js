import React from 'react';
import "../fonts/FredokaOne-Regular.ttf"
import "../css/Navbar.css"
import accPic from '../images/accJSX.svg';
import cartPic from '../images/cart.svg';
import SignIn from './SignIn';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const [clicked, changeClick] = useState(false);
    return (
        <div>
            <div style={{backgroundColor: "#ffe1bd"}} className="flex justify-center">
                <Link to="/" className="text-8xl text-center mp-4" id="logoH1">CRISPIES</Link>
            </div>
            <div className="border-t-2 border-b-2 border-offblack flex flex-row justify-between h-12">
                <Link to="/Find-Us" className="bg-sea hover:bg-sealight text-white font-bold py-2 px-4 border-r-2
                border-offblack text-center flex items-center text-offblack">Find Us</Link>
                <div className="flex-auto whitespace-nowrap" id="scroll-container">
                    <div id="scroll-text" className="text-2xl mt-1">testtesttesttesttesttesttesttesttesttesttesttttttttt</div>
                </div>
                <div className="flex flex-row">
                    <button className="buttonBorder bg-sea hover:bg-sealight" onClick={() => changeClick(clicked === false)}>
                        <img src={accPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </button>
                    <div className="buttonBorder bg-sea hover:bg-sealight">
                        <img src={cartPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </div>
                </div>
            </div>
            {clicked &&
                <div id="userDiv">
                    <SignIn authot={props.authot} changeAuth={props.changeAuth} changeClick={changeClick}></SignIn>
                </div>}
        </div>
    )
}
export default Navbar;