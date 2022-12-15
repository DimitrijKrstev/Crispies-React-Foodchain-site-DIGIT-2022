import React, { useState } from 'react'

const MenuCard = (props) => {
    const [count, updateCount] = useState(1);
    const decrement = () => {
        if (count > 1) updateCount(count - 1);
    }
    function fadeNotif() {
        let notifDiv = document.getElementById("notif");
        setTimeout(() => (notifDiv.className = "hide"), 1000);
        notifDiv.className = "";
        props.setNotifCount(count);
    }
    function logInClicked(e, changeClick){
        e.nativeEvent.stopImmediatePropagation();
        changeClick(true);
    }
    function clicked(id){
        props.addCart(id, count);
        fadeNotif();
    }
    return (
        <div className='flex flex-col border-2 border-offblack m-1 items-stretch grid max-w-sm bg-beige w-80 mt-4'>
            <img src={props.item.picture} className='flex border-b-2 border-offblack' alt="item picture"></img>
            <p className='text-center textSignin text-2xl mt-4'>{props.item.name}</p>
            <p className='text-center textSignin text-1xl mb-4'>Price: {props.item.price}</p>
            <div className={'flex flex-row self-stretch' + (!props.authot ? " disabled" : '')}>
                <button onClick={decrement} className="cartButton border-t-2 border-black bg-terra grow-0 px-8 btnHoverRed">-</button>
                <button className={'border-2 border-black border-b-0 w-full bg-offblack text-beige textSignin text-1xl btnHoverCart' + (!props.authot ? " disabled" : '')} onClick={() => clicked(props.item.id)}>
                    Add {(count > 1) && count} to cart</button>
                <button className="cartButton border-t-2 border-black bg-sea grow-0 px-8 btnHover" onClick={() => updateCount(count + 1)}>+</button>
            </div>
            {!props.authot && <button className='border-t-2 border-black flex-1' onClick={(e) => logInClicked(e, props.changeClick)}>Log In to add to cart</button>}
        </div>
    )
}

export default MenuCard