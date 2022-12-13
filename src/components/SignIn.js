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
async function LogOut() {
    auth.signOut();
}
const SignIn = (props) => {
    const [state, changeState] = useState("initial")
    return (
        <div className='flex flex-col items-center' id="SignContainer">
            {props.authot &&
                <div className='flex flex-col'>
                    <p>Logged in as {props.authot.displayName}</p>
                    <button onClick={() => LogOut()}>Log out</button>
                </div>}
            {!props.authot && state === "initial" &&
                <div className='flex flex-col'>
                    <button onClick={() => changeState("LogIn")}>Log in</button>
                    <Link to="/Sign-Up" onClick={() => props.changeClick(false)} className='flex flex-row justify-center'>Sign up</Link>
                </div>}
            {!props.authot && state === "LogIn" &&
                <div className='flex flex-col'>
                    <label>Email:</label><input type="text" id="logInEmail"></input>
                    <label>Password:</label><input type="password" id="logInPassword"></input>
                    <button onClick={() => LogIn(document.getElementById("logInEmail").value,
                        document.getElementById("logInPassword").value)}>Log In</button>
                    <Link onClick={() => props.changeClick(false)} to="/Sign-Up" className='flex flex-row justify-center'>Sign up instead</Link>
                    <p id="errorP" className='text-center text-red-600'></p>
                </div>}
        </div>
    )
}

export default SignIn