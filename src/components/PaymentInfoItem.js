import React, { useContext, useEffect } from 'react'
import { EditableContext } from './PaymentInfo';

const PaymentInfoItem = (props) => {
    const {validate, volatile, displayText, state, setState} = props;
    const editable = useContext(EditableContext);

    useEffect(() => {
        if (volatile && editable)
            setState({data: "", valid: false});
    }, [editable])

  return (
    <div className='flex flex-row justify-between align-center mt-1'>
        <p className='shrink-0 w-36 self-center'>{displayText}</p>
        <input style={{color: state.valid ? 'black' : 'red'}} className="pl-2 pt-1 mx-1 bg-white min-w-0 shrink basis-52" disabled={!editable} onChange={(event) => {
                setState({
                    data: event.target.value,
                    valid: validate.test(event.target.value)
                })
        }} value={state.data} />
    </div>
  )
}

PaymentInfoItem.defaultProps = {
    validate: new RegExp(""),
    volatile: false
}

export default PaymentInfoItem