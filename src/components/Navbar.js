import React from 'react';
import "../fonts/FredokaOne-Regular.ttf"
import "../css/Navbar.css"
import accPic from '../images/accJSX.svg';
import cartPic from '../images/cart.svg';

const Navbar = () => {
    return (
        <div>
            <div style={{backgroundColor: "#fddaac"}}>
                <h1 className="text-8xl text-center mp-4">CRISPIES</h1>
            </div>
            <div className="border-t-2 border-b-2 border-offblack flex flex-row justify-between">
                <button>
                    <h2 className="h-11 bg-sea hover:bg-sealight text-white font-bold py-2 px-4 border-r-2 border-offblack">Find Us</h2>
                </button>
                <div className="flex flex-row">
                    <div className="buttonBorder">
                        <img src={accPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </div>
                    <div className="buttonBorder">
                        <img src={cartPic} className="float-right w-10 pt-1 mx-3 justify-end"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;