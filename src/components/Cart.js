import React, { useContext, useEffect } from 'react'

import { db, rtdb } from '../index'
import {ref, onValue} from 'firebase/database'
import { UserContext } from '../App'
import { useState } from 'react'
import {doc, getDoc} from 'firebase/firestore'
import "../css/Cart.css"

const Cart = () => {
    const currentUser = useContext(UserContext);
    const cartRef = ref(rtdb, `users/${currentUser.uid}`);

    const [cart, setCart] = useState({});

    useEffect(() => {
        console.log("NESHO");
    },[cart])
    useEffect(() => {
        onValue(cartRef, (snapshot) => {
            const rawCartObj = snapshot.val();
            // console.log(snapshot.val());

            Object.keys(rawCartObj).forEach(menuItemId => {
                getDoc(doc(db,"menuItems",menuItemId)).then(doc => {
                    const cartEntry = doc.data();
                    // console.log(cartEntry);
                    const newCart = cart;
                    newCart[menuItemId] = {
                        name: cartEntry.name,
                        quantity: rawCartObj[menuItemId],
                        picture: cartEntry.picture,
                        priceEach: cartEntry.price
                    }
                    // console.log("New cart: ", newCart);
                    setCart(newCart);
                })
            })
        })
    }, [])

    return (
        <div className='Cart'>
            {Object.keys(cart).map((item) => (
                <div className="flex flex-row justify-start w-full align-center" key={item}>
                    <img src={cart[item].picture} / >
                    <div className="flex flex-col justify-center">
                        <p>{cart[item].name}</p>
                        <p>{parseInt(cart[item].quantity)}</p>
                    </div>
                    <p className="justify-self-end">{parseInt(cart[item].quantity) * parseInt(cart[item].priceEach)}</p>
                </div>
            ))}
        </div>
    )
}

export default Cart