import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { EditableContext } from './Order';

const OrderInfo = (props) => {
    const {validate, volatile, displayText, state, setState} = props;

    //Dali e pritisnato kopceto edit
    const [isBeingEdited, setEdited] = useState(false);

    //Logiran user
    const user = useContext(UserContext);
    console.log(validate);

    const clickState = useContext(EditableContext);
    useEffect(() => {
        console.log("Ifhiefiehfiefheih");
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
                    if(volatile) setState("")
                    setEdited(true)
                }}>Edit</button>
            }
        </td>
    </tr>
  )
}

OrderInfo.defaultProps = {
    validate: new RegExp(""),
    volatile: false
}

export default OrderInfo