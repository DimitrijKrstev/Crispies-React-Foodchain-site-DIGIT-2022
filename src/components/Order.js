import React, { useContext } from 'react'
import { UserContext } from '../App';

const Order = () => {

  const userState = useContext(UserContext);
  // const userState = true;

  return (
    <div className="Order">
      {userState && 
        <div className='purchaseInformation'>
          <h1>Ready to order?</h1>
          <p>Please confirm/complete your details below:</p>
          <table><tbody>
            <tr><th>Name</th><td><input id="name">{}</input></td></tr>
            <tr><th>Card no.</th><td><input id="name">{}</input></td></tr>
            <tr><th>Expiry date</th><td><input id="name">{}</input></td></tr>
            <tr><th>CVV</th><td><input id="name">{}</input></td></tr>
            <tr><th>Billing address</th><td><input id="name"></input></td></tr>
            <tr><th>Delivery address</th><td><input id="name"></input></td></tr>
            <tr><th></th><td><input id="name"></input></td></tr>
          </tbody></table>
          <button>Set</button>
        </div>
      }
    </div>
  )
}

export default Order