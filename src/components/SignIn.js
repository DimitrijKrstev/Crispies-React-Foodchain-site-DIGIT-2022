import React from 'react';
import { auth, db } from '../index';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import '../css/SignIn.css';

async function LogIn(email, password, changeAuth) {
    if (email && password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            changeAuth(auth.currentUser);
        }
        catch (error) {
            document.getElementById("errorP").innerHTML = (error.code);
        }
    }
    else {
        document.getElementById("errorP").innerHTML = "Enter both an email and a password.";
    }
}
async function LogOut(changeAuth) {
    await auth.signOut();
    changeAuth(auth.currentUser);
    console.log(auth);
}
const SignIn = (props) => {
    const [state, changeState] = useState("initial")
    return (
        <div className='flex flex-col items-center float-right' id="SignContainer">
            {props.authot &&
                <div className='flex flex-col'>
                    <p>Logged in as {props.authot.displayName}</p>
                    <button onClick={() => LogOut(props.changeAuth)}>Log out</button>
                </div>}
            {!props.authot && state === "initial" &&
                <div className='flex flex-col'>
                    <button onClick={() => changeState("LogIn")}>Log in</button>
                    <button onClick={() => changeState("SignUp")}>Sign up</button>
                </div>}
            {!props.authot && state === "LogIn" &&
                <div className='flex flex-col'>
                    <label>Email:</label><input type="text" id="logInEmail"></input>
                    <label>Password:</label><input type="password" id="logInPassword"></input>
                    <button onClick={() => LogIn(document.getElementById("logInEmail").value,
                        document.getElementById("logInPassword").value, props.changeAuth)}>Log In</button>
                    <Link onClick={() => props.changeClick(false)} to="/Sign-Up" className='flex flex-row justify-center'>Sign up instead</Link>
                    <p id="errorP" className='text-center text-red-600'></p>
                </div>}
        </div>
    )
}

export default SignIn