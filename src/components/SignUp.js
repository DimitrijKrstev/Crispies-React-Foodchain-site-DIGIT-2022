import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../index';
import '../css/SignUp.css';
import nugget from '../images/nugget.png'

const SignUp = () => {
    async function SignUpfunc(email, username, password) {
        try {
            if (username) {
                await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    fullName: '',
                    deliveryAddress: '',
                    cardNo: '',
                    expiryDate: '',
                    cvv: '',
                    billingAddress: ''
                }).catch(error => console.log(error));
                await updateProfile(auth.currentUser, { displayName: username }).catch(
                    (err) => console.log(err)
                );
                await signInWithEmailAndPassword(auth, email, password);
            }
            else {
                setErrorState("ERROR: No username entered.");
            }
        }
        catch (error) {
            setErrorState("ERROR: " + (error.code));
        }
    }
    const [errorState, setErrorState] = useState("");

    return (
        <div className="minusNavbar" style={{ overflow: 'hidden' }}>
            <div className="mx-auto max-w-max z-0">
                <img src={nugget} alt="nugget" className="i n1 nuggetRain"></img>
                <img src={nugget} alt="nugget" className="i n2 nuggetRain"></img>
                <img src={nugget} alt="nugget" className="i n3 nuggetRain"></img>
                <img src={nugget} alt="nugget" className="i n4 nuggetRain"></img>
                <img src={nugget} alt="nugget" className="i n5 nuggetRain"></img>
                <img src={nugget} alt="nugget" className="i n6 nuggetRain"></img>
                <img src={nugget} alt="nugget" className="i n7 nuggetRain"></img>
                <img src={nugget} alt="nugget" className="i n8 nuggetRain"></img>
            </div>
            <div className='flex justify-center'>
                <div className='flex mt-16 border-2 border-offblack bg-beige' style={{ zIndex: 1 }}>
                    <div className='flex flex-col grow-0 w-full'>
                        <label className="textSignup w-full mt-5 mx-10">Email</label><input type="text" id="emailInput" className="textSignup mx-10 p-0"></input>
                        <label className="textSignup mx-10">Username</label><input type="text" id="usernameInput" className="textSignup mx-10 p-0"></input>
                        <label className="textSignup mx-10">Password</label><input type="password" id="passwordInput" className="textSignup mx-10 p-0"></input>
                        <button className="btnHover textSignup mt-6 border-t-2 border-offblack py-2 bg-sea" onClick={() => SignUpfunc(document.getElementById("emailInput").value, document.getElementById("usernameInput").value,
                            document.getElementById("passwordInput").value)}>Sign Up</button>
                        <p id="errorP" className='text-center bg-offblack text-terra flex-row textSignin'>{errorState}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp