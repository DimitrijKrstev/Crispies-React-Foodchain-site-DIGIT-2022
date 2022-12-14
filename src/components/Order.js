import { onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import OrderInfo from './OrderInfo';
import {doc, setDoc} from '@firebase/firestore'
import {db} from '../index'

const Order = () => {
  const userState = useContext(UserContext);

  const [fullName, setFullName] = useState("aaaaa");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  useEffect(() => {
    onSnapshot(doc(db,"users",userState.uid), doc => {
      let data = doc.data();
      setDeliveryAddress(data.deliveryAddress);
      setCardNo(data.cardNo);
      setExpiryDate(data.expiryDate);
      setCvv(data.cvv);
      setBillingAddress(data.billingAddress);
    })
  },[])

  return (
    <div className="Order">
      {userState && 
        <div className='purchaseInformation'>
          <h1>Ready to order?</h1>
          <p>Please confirm/complete your details below:</p>
          <table><tbody>
            <OrderInfo displayText="Full name" state={fullName} setState={setFullName}/>
            <OrderInfo displayText="Delivery address" state={deliveryAddress} setState={setDeliveryAddress}/>
            <OrderInfo displayText="Card no." state={cardNo} setState={setCardNo}/>
            <OrderInfo displayText="Expiry date" state={expiryDate} setState={setExpiryDate}/>
            <OrderInfo displayText="CVV" state={cvv} setState={setCvv}/>
            <OrderInfo displayText="Billing address" state={billingAddress} setState={setBillingAddress}/>
          </tbody></table>
          <button onClick={() => {
            setDoc(doc(db,"users",userState.uid), {
              fullName: fullName,
              deliveryAddress: deliveryAddress,
              cardNo: cardNo,
              expiryDate: expiryDate,
              cvv: cvv,
              billingAddress: billingAddress
            })
          }}>Set</button>
        </div>
      }
    </div>
  )
}

export default Order