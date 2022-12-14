import React, { useState } from 'react'

const MenuCard = (props) => {
    const [count, updateCount] = useState(1);
    const decrement = () => {
        if (count > 1) updateCount(count - 1);
    }
    return (
        <div className='flex flex-col border-2 border-black m-2 items-center'>
            <img src={props.item.picture} className='h-40 w-40'></img>
            <p>{props.item.name}</p>
            <p>Price: {props.item.price}</p>
            <div className={'flex flex-row self-stretch' + (!props.authot ? " disabled" : '')}>
                <button onClick={decrement} className="cartButton border-t-2 border-black">-</button>
                <button className={'border-2 border-black border-b-0' + (!props.authot ? " disabled" : '')} onClick={props.addCart(props.item.id)}>
                    Add {(count > 1) && count} to cart</button>
                <button className="cartButton border-t-2 border-black" onClick={() => updateCount(count + 1)}>+</button>
            </div>
            {!props.authot && <button className='border-t-2 border-black' onClick={() => props.changeClick(true)}>Log In to add to cart</button>}
        </div>
    )
}

export default MenuCard