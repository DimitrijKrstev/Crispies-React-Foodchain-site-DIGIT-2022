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
        <div className='flex justify-center'>
            <div className='flex mt-20 border-2 border-black p-10'>
                <img className='w-30 h-30' src="https://i.pinimg.com/originals/71/37/09/7137094cc3e2325bb4062ce47c01347c.png"></img>
                <div className='flex flex-col'>
                    <label>Email:</label><input type="text" id="emailInput"></input>
                    <label>Username:</label><input type="text" id="usernameInput"></input>
                    <label>Password:</label><input type="password" id="passwordInput"></input>
                    <button onClick={() => SignUpfunc(document.getElementById("emailInput").value, document.getElementById("usernameInput").value,
                        document.getElementById("passwordInput").value)}>Sign Up</button>
                    <p id="errorP" className='text-center text-red-600'></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp