import React, { useContext, useState } from 'react'
import { rtdb } from '../index'
import { ref, remove, set } from 'firebase/database'
import { UserContext } from '../App'
import { CartContext } from '../App'
import Notification from './Notification'
import { showNotif } from './Notification'
import "../css/Cart.css"

const Cart = ({ validPaymentInfo }) => {

    const currentUser = useContext(UserContext);
    const cart = useContext(CartContext);

    const removeCartItem = (id) => {
        const removeReference = ref(rtdb, `users/${currentUser.uid}/${id}`);
        remove(removeReference);
    }

    const totalCost = () => {
        return Object.keys(cart).reduce((accumulator, item) => {
            return accumulator + (cart[item].quantity * cart[item].priceEach)
        }, 0)
    }

    const [notifObj, setNotifObj] = useState({text: "",timestamp: 0});

    const processOrder = () => {
        if (validPaymentInfo) {
            showNotif(`Purchase for ${totalCost()} has gone through`, setNotifObj)
            set(ref(rtdb, `users/${currentUser.uid}`), {});
        }
        else {
            showNotif("Complete your purchase information before proceeding.", setNotifObj)
        }
    }

    return (
        <div>
            <Notification input={notifObj}></Notification>
            {Object.keys(cart).length !== 0 && 
            <div className='Cart bg-beige textSignin mt-8'>
                {Object.keys(cart).map((item) => (
                    <div className="CartItem flex flex-row justify-start w-full align-center" key={item}>
                        <img src={cart[item].picture} />
                        <div className="flex flex-col justify-center text-xs sm:text-base">
                            <p className='font-bold'>{cart[item].name}</p>
                            <p>Quantity: <span className='font-bold'>{parseInt(cart[item].quantity)}</span></p>
                        </div>
                        <p className="flex flex-col justify-center ml-auto mr-1 text-xs sm:text-base p-0">
                            {parseInt(cart[item].quantity) > 1 && cart[item].quantity + " x " + cart[item].priceEach + " = "}
                            {parseInt(cart[item].quantity) * parseInt(cart[item].priceEach)}</p>
                            <button className='bg-terra button btnHoverRed font-bold' onClick={() => removeCartItem(item)}>Remove</button>
                    </div>
                ))}
                <div className='flex flex-col items-center bg-beigeLight'>
                    <p className='text-center mt-3 mb-3'>Total: <span className='font-bold text-2xl'>{totalCost()} MKD</span></p>
                    <button className='bg-sea border-t-2 border-offblack p-1 w-full font-bold btnHover' onClick={processOrder}>Checkout</button>
                </div>
            </div>
            }
    </div>
    )
}

export default Cart