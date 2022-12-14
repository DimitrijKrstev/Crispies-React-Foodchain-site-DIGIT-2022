import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { EditableContext } from './PaymentInfo';

const PaymentInfoItem = (props) => {
    const {validate, volatile, displayText, state, setState} = props;

    //Dali e pritisnato kopceto edit
    const [isBeingEdited, setEdited] = useState(false);

    //Logiran user
    const user = useContext(UserContext);

    const clickState = useContext(EditableContext);
    useEffect(() => {
        setEdited(false);
    }, [clickState])

  return (
    <tr>
        <th>
            {displayText}
        </th>
        <td>
            <input style={{color: state.valid ? 'black' : 'red'}} disabled={!isBeingEdited} onChange={(event) => {
                    setState({
                        data: event.target.value,
                        valid: validate.test(event.target.value)
                    })
            }} value={state.data} />
        </td>
        <td>
            {!isBeingEdited && 
                <button onClick={() => {
                    if(volatile) setState({data: "", valid: false})
                    setEdited(true)
                }}>Edit</button>
            }
        </td>
    </tr>
  )
}

PaymentInfoItem.defaultProps = {
    validate: new RegExp(""),
    volatile: false
}

export default PaymentInfoItem