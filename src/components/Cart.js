import React, { useContext, useEffect } from 'react'

import { db, rtdb } from '../index'
import {ref, onValue, remove, set} from 'firebase/database'
import { UserContext } from '../App'
import { useState } from 'react'
import {doc, getDoc} from 'firebase/firestore'
import "../css/Cart.css"


async function getFromFS(rawCartObj, setCart) {
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

const Cart = ({validPaymentInfo}) => {

    const currentUser = useContext(UserContext);
    const cartRef = ref(rtdb, `users/${currentUser.uid}`);

    const [cart, setCart] = useState({});

    const removeCartItem = (id) => {
        console.log(`removeCartItem(${id})`);
        const removeReference = ref(rtdb,`users/${currentUser.uid}/${id}`);
        remove(removeReference);
    }

    const totalCost = () => {
        return Object.keys(cart).reduce((accumulator, item) => {
            return accumulator + (cart[item].quantity * cart[item].priceEach)
        }, 0)
    }
    const processOrder = () => {
        if (validPaymentInfo) {
            alert(`Purchase for ${totalCost()} has gone through`)
            set(ref(rtdb,`users/${currentUser.uid}`), {});
        }
    }

    useEffect(() => {
        onValue(cartRef, (snapshot) => {
            const rawCartObj = snapshot.val();
            getFromFS(rawCartObj,setCart);
        })
    }, [])

    console.log(cart);

    return (
        <div className='Cart bg-terra'>
            {Object.keys(cart).map((item) => (
                <div className="CartItem flex flex-row justify-start w-full align-center" key={item}>
                    <img src={cart[item].picture} / >
                    <div className="flex flex-col justify-center">
                        <p>{cart[item].name}</p>
                        <p>Quantity: {parseInt(cart[item].quantity)}</p>
                    </div>
                    <p className="flex flex-col justify-center ml-auto">
                        {parseInt(cart[item].quantity) > 1 && cart[item].quantity + " x " + cart[item].priceEach + " = "}
                        {parseInt(cart[item].quantity) * parseInt(cart[item].priceEach)}</p>
                    <div className="flex flex-col justify-center">
                        <button onClick={() => removeCartItem(item)}>Remove</button>
                    </div>
                </div>
            ))}
            {Object.keys(cart).length !== 0 && <>
                <div className='flex flex-row justify-space'>
                    <p>Total:</p>
                    <p>{totalCost()}</p>
                </div>
                <button onClick={processOrder}>Checkout</button>
            </>}
        </div>
    )
}

export default Cart