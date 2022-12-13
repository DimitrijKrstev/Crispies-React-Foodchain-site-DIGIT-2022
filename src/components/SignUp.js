import React from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../index';

async function SignUpfunc(email, username, password) {
    try {
        if (username) {
            await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', auth.currentUser.uid), {
                username: username, address: ' ',
                phoneNumber: ' ', creditCard: null
            }).catch(error => console.log(error));
            await updateProfile(auth.currentUser, { displayName: username }).catch(
                (err) => console.log(err)
            );
            await signInWithEmailAndPassword(auth, email, password);
        }
        else {
            document.getElementById("errorP").innerHTML = "ERROR: No username entered.";
        }
    }
    catch (error) {
        document.getElementById("errorP").innerHTML = "ERROR: " + (error.code);
    }
}

const SignUp = () => {
    return (
        <div className='flex flex-col w-1/3'>
            <label>Email:</label><input type="text" id="emailInput"></input>
            <label>Username:</label><input type="text" id="usernameInput"></input>
            <label>Password:</label><input type="password" id="passwordInput"></input>
            <button onClick={() => SignUpfunc(document.getElementById("emailInput").value, document.getElementById("usernameInput").value,
                document.getElementById("passwordInput").value)}>Sign Up</button>
            <p id="errorP" className='text-center text-red-600'></p>
        </div>
    )
}

export default SignUp