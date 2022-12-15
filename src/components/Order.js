import React from 'react'
import PaymentInfo from './PaymentInfo'
import Cart from './Cart'
import { useState } from 'react'
const Order = ({setCartItemsNum}) => {
  const [validPaymentInfo, setValidPaymentInfo] = useState(false);

  return (
    <>
    <PaymentInfo validPaymentInfo = {validPaymentInfo} setValidPaymentInfo = {setValidPaymentInfo}/>
    <Cart setCartItemsNum={setCartItemsNum} validPaymentInfo = {validPaymentInfo}/>
    </>
  )
}

export default Order