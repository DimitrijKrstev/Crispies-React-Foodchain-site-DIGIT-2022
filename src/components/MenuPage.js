import React from 'react'
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { ref, set, get, child, getDatabase } from "firebase/database";
import { db, rtdb } from '../index';
import '../css/MenuPage.css'
import MenuCard from './MenuCard';
import Notification from './Notification';
import burgerImg from '../images/Burger2.svg'
import combosImg from '../images/Combos2.svg'
import snacksImg from '../images/Snacks2.svg'
import drinksImg from '../images/Drinks2.svg'
import friesImg from '../images/Fries2.svg'
import saucesImg from '../images/sauces2.svg'
const Icon = (props) => {
  let icon;
  switch (props.type) {
    case 'Burgers': icon = burgerImg; break;
    case 'Combos': icon = combosImg; break;
    case 'Snacks': icon = snacksImg; break;
    case 'Drinks': icon = drinksImg; break;
    case 'Sauces': icon = saucesImg; break;
    case 'Fries': icon = friesImg; break;
    default: icon = 'https://cdn-icons-png.flaticon.com/512/1161/1161695.png'
  }
  return (
    <a href={"#" + props.type}className='border-l-2 border-y-2 border-offblack pt-2 px-2 border-black max-w-[90px] w-[16vw]  mt-2 bg-sea mb-2 categoryIcons btnHover shrink-1' title={props.type}>
      <img src={icon}></img>
    </a>
  )
}

async function getItems(q, setItems, setFullItems, setReady) {
  let documents = [];
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    documents.push({ ...doc.data(), id: doc.id })
  });
  setItems(documents);
  setFullItems(documents);
  setReady(true);
}

const MenuPage = (props) => {
  const [items, setItems] = useState();
  const [ready, setReady] = useState(false);
  const [fullItems, setFullItems] = useState();
  const [notifObj, setNotifObj] = useState({text:'', timestamp:0});

  useEffect(() => {
    const q = query(collection(db, 'menuItems')/*,orderBy('timeCreated')*/);
    getItems(q, setItems, setFullItems, setReady);
  }, [])

  const addCart = (id, count) => {
    let rtdbRef = ref(getDatabase());
    get(child(rtdbRef, `users/${props.authot.uid}/${id}`)).then((value) => {
      set(ref(rtdb, 'users/' + props.authot.uid + "/" + id),
        value.val() + count
      );
    })
  }

  const Section = (props2) => {
    let filtered = [];
    if (props2.itemCards) filtered = props2.itemCards.filter((item) => item.type === props2.title);
    return (
      filtered.length > 0 && <div id={props2.id}>
        <h1 className='text-center textSignin text-3xl mb-8 font-bold'>{props2.title}</h1>
        <div className='flex justify-center flex-wrap mx-auto last-of-type:mb-8'>
          {filtered.map((item) => (
            <MenuCard item={item} 
            authot={props.authot} 
            addCart={addCart} 
            changeClick={props.changeClick}
            setNotifObj={setNotifObj}>
            </MenuCard>))}
        </div>
      </div>
    )
  }

  function Searching(e) {
    setItems(fullItems.filter(item => item.name.toUpperCase().includes(e.target.value.toUpperCase())));
  }

  return (
    <div>
      <Notification input={notifObj}></Notification>
      <h1 className=" border-b-2 border-offblack text-4xl text-center bg-beige titleLocations py-3">Menu</h1>

      <div className='flex flex-col items-center'>
        <div className='mt-4 flex justify-center'>
          <Icon type={'Combos'}></Icon><Icon type={'Burgers'}></Icon><Icon type={'Snacks'}></Icon><Icon type={'Fries'}></Icon>
          <Icon type={'Drinks'}></Icon><Icon type={'Sauces'}></Icon>
        </div>

        <div className='mt-4 mb-4 mx-auto flex flex-col w-full items-center flex-wrap max-w-[1150px] bg-beigeLight border-2 border-offblack'>
          <input className='text-center text-offblack bg-sea border-0 border-b-2 border-offblack w-full textSignin py-3 text-2xl mb-8 placeholder-beigeLight' type="text" placeholder='Search...' onChange={Searching}></input>
          {!ready &&
          <div className="mx-auto flex flex-col border-2 border-offblack max-w-[500px] mt-16 mb-10">
            <div className="flex justify-between bg-beige">
              <h1 className="textSignin text-offblack text-3xl ml-3">Loading</h1>
              <button className="textSignin bg-terra text-offblack p-2 px-4 border-l-2 border-offblack">...</button>
            </div>
            <div className="flex flex-col bg-beigeLight border-t-2 border-offblack text-center border-b-8 py-16">
              <h1 className="textSignin text-6xl px-4">Wrapping up...</h1>
            </div>
          </div>}
          <Section title={"Combos"} itemCards={items} id="Combos"></Section>
          <Section title={"Burgers"} itemCards={items} id="Burgers"></Section>
          <Section title={"Snacks"} itemCards={items} id="Snacks"></Section>
          <Section title={"Fries"} itemCards={items} id="Fries"></Section>
          <Section title={"Drinks"} itemCards={items} id="Drinks"></Section>
          <Section title={"Sauces"} itemCards={items} id="Sauces"></Section>
        </div>
      </div>
    </div>
  )
}

export default MenuPage