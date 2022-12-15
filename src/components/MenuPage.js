import React from 'react'
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { ref, set, get, child, getDatabase } from "firebase/database";
import { db, rtdb } from '../index';
import '../css/MenuPage.css'
import MenuCard from './MenuCard';
import Notification from './Notification';

const Icon = (props) => {
  let icon;
  switch (props.type) {
    case 'Burgers': icon = 'https://cdn-icons-png.flaticon.com/512/1161/1161695.png'; break;
    case 'Snacks': icon = 'https://cdn-icons-png.flaticon.com/512/5793/5793750.png'; break;
    default: icon = 'https://cdn-icons-png.flaticon.com/512/1161/1161695.png'
  }
  return (
    <a href={"#" + props.type}className='border-2 border-black w-20 h-20 m-2' title={props.type}>
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
        <h1 className='text-center textSignin text-3xl my-8'>{props2.title}</h1>
        <div className='flex justify-center flex-wrap'>
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
        <div className='mt-2 flex justify-center flex-wrap'>
          <Icon type={'Combos'}></Icon><Icon type={'Burgers'}></Icon><Icon type={'Snacks'}></Icon><Icon type={'Fries'}></Icon>
          <Icon type={'Drinks'}></Icon><Icon type={'Sauces'}></Icon>
        </div>
        <input className='w-[65%] text-center border-2 border-offblack' type="text" placeholder='Search...' onChange={Searching}></input>
        <div className='mt-5 mb-5  border-black flex flex-col w-full items-center flex-wrap w-9/12'>
          {!ready &&
            <div className='w-full h-[40rem] flex items-center justify-center bg-beige text-offblack text-4xl textSignin'>
              Loading..
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