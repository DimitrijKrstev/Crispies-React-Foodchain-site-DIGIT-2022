import React from 'react';
import { auth, db } from '../index';
import { useState } from 'react';
import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import '../css/SignIn.css';

async function LogIn(email, password, changeUser) {
    if (email && password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (auth) {
                const user = (await getDoc(doc(db, 'users', auth.currentUser.uid))).data();
                changeUser(user);
              }
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
            <div className='flex flex-col items-center' id ="SignContainer">
                {auth.currentUser && <div><p>Logged in as {auth.currentUser.uid}</p><button>Log out</button></div>}
                {state === "initial" &&
                    <div>
                        <button onClick={() => changeState("LogIn")}>Log in</button>
                        <button onClick={() => changeState("SignUp")}>Sign up</button>
                    </div>}
                {state === "LogIn" &&
                    <div className='flex flex-col'>
                        <label>Email:</label><input type="text"></input>
                        <label>Password:</label><input type="password"></input>
                        <button onClick={() => changeState("SignUp")}>Sign up instead</button>
                    </div>}
                {state === "SignUp" &&
                    <div className='flex flex-col'>
                        <label>Email:</label><input type="text"></input>
                        <label>Username:</label><input type="text"></input>
                        <label>Password:</label><input type="password"></input>
                        <button onClick={() => changeState("LogIn")}>Log in instead</button>
                    </div>}
            </div>
        )
    }

    export default SignIn