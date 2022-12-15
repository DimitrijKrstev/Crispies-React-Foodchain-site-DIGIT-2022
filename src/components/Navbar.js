import React from 'react';
import "../css/Navbar.css"
import accPic from '../images/accJSX.svg';
import cartPic from '../images/cart.svg';
import SignIn from './SignIn';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    console.log(props.boxRef)
    const boxRef = useRef(null);
    const topButtonRef = useRef(null);

    useEffect(() => {
        console.log(boxRef);
        function handleOutsideClick(event) {
            console.log("TEST");
            if (event.target !== undefined && boxRef.current && !boxRef.current.contains(event.target) && (topButtonRef.current && !topButtonRef.current.contains(event.target))) {
                console.log("TEST2")
                props.changeClick(true);
            }
        }
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    },[boxRef]);

    return (
        <div>
            <div style={{ backgroundColor: "#ffe1bd" }} className="flex justify-center">
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
                    <button className="buttonBorder bg-sea hover:bg-sealight" onClick={() => props.changeClick(!props.clicked)} ref={topButtonRef}>
                        <img src={accPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </button>
                    <Link to='/Order' className="buttonBorder bg-sea hover:bg-sealight">
                        <img src={cartPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </Link>
                </div>
            </div>
            {props.clicked &&
                <div id="userDiv">
                    <SignIn authot={props.authot} changeAuth={props.changeAuth} changeClick={props.changeClick} boxRef={boxRef}></SignIn>
                </div>}
        </div>
    )
}
export default Navbar;