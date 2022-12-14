import React from 'react';
import { auth, db } from '../index';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import '../css/SignIn.css';

async function LogIn(email, password) {
    if (email && password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            document.getElementById("errorP").innerHTML = (error.code);
        }
    }
    else {
        document.getElementById("errorP").innerHTML = "Enter both an email and a password.";
    }
}

const SignIn = (props) => {
    const [state, changeState] = useState("initial")

    return (
        <div className='flex flex-col bg-beige' id="SignContainer" style={{ position: 'relative', zIndex: '30'}}>
            {props.authot &&
                <div className='flex flex-col grow-0 border-2 border-offblack text-center'>
                    <p className="py-2 textSignin bg-beigeLight text-offblack">Logged in as: {props.authot.displayName}</p>
                    <button className="textSignin border-t-2 border-offblack py-2 btnHover bg-sea" onClick={() => auth.signOut()}>Log out</button>
                </div>}
            {!props.authot && state === "initial" &&
                <div className='flex flex-col grow-0 w-full border-2 border-offblack'>
                    <button className="textSignin py-2 btnHover bg-sea" onClick={() => changeState("LogIn")}>Log in</button>
                    <Link to="/Sign-Up" onClick={() => props.changeClick(false)} className='flex flex-row justify-center textSignin btnHover py-2 border-t-2 border-offblack bg-sea'>Sign up</Link>
                </div>}
            {!props.authot && state === "LogIn" &&
                <div className='flex flex-col grow-0 w-full border-2 border-offblack'>
                    <div className="mx-auto mt-2 flex-col"><label className="textSignin flex">Email </label><input type="text" id="logInEmail" className="flex textSignin"></input></div>
                    <div className="mx-auto mt-1 mb-4 flex-col"><label className="textSignin flex">Password </label><input type="password" id="logInPassword" className="flex textSignin"></input></div>
                    <button className="textSignin btnHover border-t-2 border-offblack py-2 bg-sea" onClick={() => LogIn(document.getElementById("logInEmail").value,
                        document.getElementById("logInPassword").value)}>Log In</button>
                    <Link onClick={() => props.changeClick(false)} to="/Sign-Up" className='flex flex-row justify-center textSignin btnHover border-t-2 border-offblack py-2 bg-sea'>Sign up instead</Link>
                    <p id="errorP" className='text-center bg-offblack text-terra flex-row textSignin'></p>
                </div>}
        </div>
    )
}

export default SignIn