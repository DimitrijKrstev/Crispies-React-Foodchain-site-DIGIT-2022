import { onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import PaymentInfoItem from './PaymentInfoItem';
import { doc, setDoc } from '@firebase/firestore'
import { db } from '../index'
import '../css/Order.css'

export const EditableContext = React.createContext(false);

const PaymentInfo = ({ validPaymentInfo, setValidPaymentInfo }) => {

  const userState = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");


  let states = [fullName, deliveryAddress, cardNo, expiryDate, cvv, billingAddress];
  useEffect(() => {
    const valid = states.reduce((accumulator, item) => { return accumulator && item.valid }, true)
    const noneDefault = states.reduce((accumulator, item) => { return accumulator && item.data !== "" }, true)
    setValidPaymentInfo(valid && noneDefault);
  }, [...states])
  
  const [error, setError] = useState(false);

  useEffect(() => {
    userState.uid && onSnapshot(doc(db, "users", userState.uid), doc => {
      let data = doc.data();
      setFullName({ data: data.fullName, valid: true })
      setDeliveryAddress({ data: data.deliveryAddress, valid: true });
      setCardNo({ data: data.cardNo, valid: true });
      setExpiryDate({ data: data.expiryDate, valid: true });
      setCvv({ data: data.cvv, valid: true });
      setBillingAddress({ data: data.billingAddress, valid: true });
    })
  }, [userState])

  const [editable, setEditable] = useState(false);

  return (
    <div className="PaymentInfo mx-0 sm:mx-5 shrink max-w-full">
      {userState &&
        <div className='purchaseInformation shrink flex flex-col max-w-full mx-auto border-x-2 border-offblack bg-beige mt-8 textSignin'>
          <p className="p-2 textSignup text-center mb-2 bg-offblack w-full text-beige">Please confirm/complete your details below:</p>
          <EditableContext.Provider value={editable}>
            <div className="mx-4 sm:mx-10">
              <PaymentInfoItem displayText="Full name"
                state={fullName}
                setState={setFullName}
                validate={new RegExp(/[a-zA-Z]+\s[a-zA-Z]+/)} />
              <PaymentInfoItem displayText="Delivery address" state={deliveryAddress} setState={setDeliveryAddress} />
              <PaymentInfoItem displayText="Card no."
                state={cardNo}
                setState={setCardNo}
                validate={new RegExp(/^[0-9]{15,16}$/)}
                volatile={true}
              />
              <PaymentInfoItem displayText="Expiry date"
                state={expiryDate}
                setState={setExpiryDate}
                validate={new RegExp(/^[0-9]{2}\/[0-9]{2}$/)}
                volatile={true} />
              <PaymentInfoItem displayText="CVV"
                state={cvv}
                setState={setCvv}
                validate={new RegExp(/^[0-9]{3}$/)}
                volatile={true} />
              <PaymentInfoItem displayText="Billing address" state={billingAddress} setState={setBillingAddress} />
            </div>
          </EditableContext.Provider>
          <div className='flex justify-center flex-col'>
            {editable ?
            <button className="w-full text-2xl border-y-2 border-offblack text-offblack mt-4 btnHover textSignup bg-sea" onClick={() => {
              if (validPaymentInfo) {
                setEditable(false);
                setError(false);
                setDoc(doc(db, "users", userState.uid), {
                  fullName: fullName.data,
                  deliveryAddress: deliveryAddress.data,
                  cardNo: "*******-" + cardNo.data.substring(cardNo.data.length - 4),
                  expiryDate: expiryDate.data,
                  cvv: cvv.data,
                  billingAddress: billingAddress.data
                })
              }
              else setError(true);
            }}>Submit</button>:
            <button className='w-full text-2xl border-y-2 border-offblack text-beige bg-offblack mt-4 editBtnHover textSignup bg-sea' onClick={() => {
              setEditable(true);
            }}>Edit</button>}
            {error &&
              <div className="bg-offblack textSignin text-terra text-center w-full">Invalid data entered</div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default PaymentInfo