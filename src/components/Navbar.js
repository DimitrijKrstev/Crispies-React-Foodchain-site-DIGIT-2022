import React from 'react';
import "../fonts/FredokaOne-Regular.ttf"
import "../css/Navbar.css"
import accPic from '../images/accJSX.svg';

const Navbar = () => {
    return (
        <div>
            <div style={{backgroundColor: "#fddaac"}}>
                <h1 className="text-8xl text-center mp-4">CRISPIES</h1>
            </div>
            <div className="buttonRow flex flex-row justify-between">
                <button>
                    <h2 className="bg-black hover:bg-black-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500">Find Us</h2>
                </button>
                <div className="buttonBorder">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="1.5"
                            clipRule="evenodd"
                            viewBox="0 0 600 600"
                            className="float-right w-10 pt-1 mr-1  justify-end"
                        >
                            <path fill="none" d="M0 0H600V600H0z"></path>
                            <clipPath id="_clip1">
                                <path d="M0 0H600V600H0z"></path>
                            </clipPath>
                            <g fill="none" stroke="#000" strokeWidth="25" clipPath="url(#_clip1)">
                                <path d="M587 13l-87 30-50 457H150"></path>
                                <circle cx="450" cy="544.5" r="44.5"></circle>
                                <circle cx="150" cy="544.5" r="44.5"></circle>
                                <path d="M458 420H13V100h476l-31 320zM13 340h453.267M13 256.5h462M13 180h468M120 100v320M223 100v320M326 100v320M429 100v320"></path>
                            </g>
                        </svg>
                    <img src={accPic} className="float-right w-10 pt-1 mx-5 justify-end"></img>
                </div>
            </div>
        </div>
    )
}
export default Navbar;