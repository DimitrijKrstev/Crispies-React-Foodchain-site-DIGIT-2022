import React from 'react'
import PaymentInfo from './PaymentInfo'
import Cart from './Cart'
import { useState } from 'react'
const Order = ({ setCartItemsNum }) => {
  const [validPaymentInfo, setValidPaymentInfo] = useState(false);

  return (
    <>
      <h1 className=" border-b-2 border-offblack text-4xl text-center bg-beige titleLocations py-3">Ready to Order?</h1>
      <div className='paymentContainer flex flex-row justify-center flex-wrap'>
        <PaymentInfo validPaymentInfo={validPaymentInfo} setValidPaymentInfo={setValidPaymentInfo} />
        <Cart setCartItemsNum={setCartItemsNum} validPaymentInfo={validPaymentInfo} />
      </div>
    </>
  )
}

export default Order