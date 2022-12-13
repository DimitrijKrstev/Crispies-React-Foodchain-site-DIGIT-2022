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
            <div style={{backgroundColor: "#fddaac"}} className="flex justify-center">
                <Link to="/" className="text-8xl text-center mp-4" id="logoH1">CRISPIES</Link>
            </div>
            <div className="buttonRow flex flex-row justify-between">
                <button>
                    <Link to="/Find-Us" className="bg-black hover:bg-black-400 text-white font-bold py-2 px-4 border-b-4
                     border-blue-700 hover:border-blue-500 text-center">Find Us</Link>
                </button>
                <div className="flex flex-row">
                    <button className="buttonBorder" onClick={() => changeClick(clicked === false)}>
                        <img src={accPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </button>
                    <div className="buttonBorder">
                        <img src={cartPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </div>
                </div>
            </div>
            {clicked && <SignIn authot={props.authot} changeAuth={props.changeAuth} changeClick={changeClick}></SignIn>}
        </div>
    )
}
export default Navbar;