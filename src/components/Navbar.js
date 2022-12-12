import React from 'react';
import "../fonts/FredokaOne-Regular.ttf"
import "../css/Navbar.css"

const Navbar = () => {
    return (
        <div>
            <div style={{backgroundColor: "#fddaac"}}>
                <h1 className="text-8xl text-center mp-4">CRISPIES</h1>
            </div>
            <div className="border-solid border-2 border-black">
                <button>
                    <h2 className="bg-black hover:bg-black-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500">Find Us</h2>
                </button>
            </div>
        </div>
    )
}
export default Navbar;