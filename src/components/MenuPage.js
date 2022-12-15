import React from 'react'
import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { ref, set, get, child, getDatabase } from "firebase/database";
import { db, rtdb } from '../index';
import '../css/MenuPage.css'
import MenuCard from './MenuCard';

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
  const [notifCount, setNotifCount] = useState(0);

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
        <h1 className='text-center'>{props2.title}</h1>
        <div className='flex justify-center flex-wrap'>
          {filtered.map((item) => (<MenuCard item={item} authot={props.authot} addCart={addCart} changeClick={props.changeClick}
            setNotifCount={setNotifCount}></MenuCard>))}
        </div>
      </div>
    )
  }

  function Searching(e) {
    setItems(fullItems.filter(item => item.name.toUpperCase().includes(e.target.value.toUpperCase())));
  }

  return (
    <div>
      <div className='fixed top-0 z-10'>
        <div id="notif" className='hide'>
          <p>Successfully added {notifCount} items to the cart.</p>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div className='mt-10 flex justify-center flex-wrap'>
          <Icon type={'Combos'}></Icon><Icon type={'Burgers'}></Icon><Icon type={'Snacks'}></Icon><Icon type={'Fries'}></Icon>
          <Icon type={'Drinks'}></Icon><Icon type={'Sauces'}></Icon>
        </div>
        <input className='w-[65%] text-center' type="text" placeholder='Search...' onChange={Searching}></input>
        <div className='mt-5 mb-5 border-2 border-black flex flex-col w-[70%] items-center flex-wrap'>
          {!ready &&
            <div className='w-full h-[40rem] flex items-center justify-center bg-gray-300'>
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