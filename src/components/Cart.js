import React, { useContext } from 'react'
import { rtdb } from '../index'
import { ref, remove, set } from 'firebase/database'
import { UserContext } from '../App'
import { CartContext } from '../App'
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
    const processOrder = () => {
        if (validPaymentInfo) {
            alert(`Purchase for ${totalCost()} has gone through`)
            set(ref(rtdb, `users/${currentUser.uid}`), {});
        }
    }

    return (
        (Object.keys(cart).length !== 0) && 
            <div className='Cart bg-terra'>
                {Object.keys(cart).map((item) => (
                    <div className="CartItem flex flex-row justify-start w-full align-center" key={item}>
                        <img src={cart[item].picture} />
                        <div className="flex flex-col justify-center">
                            <p className='font-bold'>{cart[item].name}</p>
                            <p>Quantity: <span className='font-bold'>{parseInt(cart[item].quantity)}</span></p>
                        </div>
                        <p className="flex flex-col justify-center ml-auto">
                            {parseInt(cart[item].quantity) > 1 && cart[item].quantity + " x " + cart[item].priceEach + " = "}
                            {parseInt(cart[item].quantity) * parseInt(cart[item].priceEach)}</p>
                            <button className='bg-sea button font-bold' onClick={() => removeCartItem(item)}>Remove</button>
                    </div>
                ))}
                <div className='flex flex-col items-center'>
                    <p className='text-center mt-4 mb-2'>Total: <span className='font-bold'>{totalCost()} MKD</span></p>
                    <button className='bg-sea border-t-2 border-offblack p-1 w-full font-bold btnHover' onClick={processOrder}>Checkout</button>
                </div>
            </div>
    )
}

export default Cart