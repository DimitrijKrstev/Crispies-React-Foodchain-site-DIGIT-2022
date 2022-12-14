import React, { useContext, useEffect } from 'react'

import { db, rtdb } from '../index'
import {ref, onValue, remove} from 'firebase/database'
import { UserContext } from '../App'
import { useState } from 'react'
import {doc, getDoc} from 'firebase/firestore'
import "../css/Cart.css"


async function getFromFS(rawCartObj, cart, setCart) {
    const newCart = {};
    for(let menuItemId in rawCartObj) {
        const item = await getDoc(doc(db,"menuItems",menuItemId));
        const cartEntry = item.data();
        // console.log(cartEntry);
        newCart[menuItemId] = {
            name: cartEntry.name,
            quantity: rawCartObj[menuItemId],
            picture: cartEntry.picture,
            priceEach: cartEntry.price
        }
        // console.log("New cart: ", newCart);
    }
    setCart(newCart);
}

const Cart = () => {
    const currentUser = useContext(UserContext);
    const cartRef = ref(rtdb, `users/${currentUser.uid}`);

    const [cart, setCart] = useState({});

    const removeCartItem = (id) => {
        console.log(`removeCartItem(${id})`);
        const removeReference = ref(rtdb,`users/${currentUser.uid}/${id}`);
        remove(removeReference);
    }

    useEffect(() => {
        onValue(cartRef, (snapshot) => {
            const rawCartObj = snapshot.val();
            getFromFS(rawCartObj,cart,setCart);
        })
    }, [])

    console.log(cart);

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
                    <button onClick={() => removeCartItem(item)}>Remove</button>
                </div>
            ))}
        </div>
    )
}

export default Cart