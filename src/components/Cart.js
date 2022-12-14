import React, { useContext, useEffect } from 'react'

import { rtdb } from '../index'
import {ref, onValue} from 'firebase/database'
import { UserContext } from '../App'
import { useState } from 'react'

const Cart = () => {
    const currentUser = useContext(UserContext);
    const cartRef = ref(rtdb, currentUser.uid);

    useEffect(() => {
        onValue(cartRef, (snapshot) => {
            
            Object.keys(snapshot).map()
        })
    }, [])

    const [cart, setCart] = useState({});
    Object.keys(cart).forEach(el => console.log(el)) 

    return (
        <div className='cart'>
            {Object.keys(cart).map((item) => (
                <div>{item}</div>
            ))}
        </div>
    )
}

export default Cart