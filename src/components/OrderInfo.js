import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'

const OrderInfo = ({displayText, state, setState}) => {
    //Dali e pritisnato kopceto edit
    const [isBeingEdited, setEdited] = useState(false);
    //Logiran user
    const user = useContext(UserContext);

  return (
    <tr>
        <th>
            {displayText}
        </th>
        <td>
            <input disabled={!isBeingEdited} onChange={(event) => {
                setState(event.target.value)
            }} value={state} />
        </td>
        <td>
            {isBeingEdited ? 
            <button onClick={() => {setEdited(false)}}>Save</button> : 
            <button onClick={() => setEdited(true)}>Edit</button>
            }
        </td>
    </tr>
  )
}

export default OrderInfo