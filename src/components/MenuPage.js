import React from 'react'
import { useState, useEffect } from 'react';
import { collection, query, getDocs, updateDoc } from 'firebase/firestore';
import { ref, set } from "firebase/database";
import { auth, db, rtdb } from '../index';
import '../css/MenuPage.css'
import MenuCard from './MenuCard';

const Icon = (props) => {
  let icon;
  switch (props.type) {
    case 'burger': icon = 'https://cdn-icons-png.flaticon.com/512/1161/1161695.png'; break;
    case 'wrap': icon = 'https://cdn-icons-png.flaticon.com/512/5793/5793750.png'; break;
    case 'taco': icon = 'https://cdn-icons-png.flaticon.com/512/3946/3946513.png'; break;
  }
  return (
    <button className='border-2 border-black w-20 h-20 m-2'>
      <img src={icon}></img>
    </button>
  )
}

const MenuPage = (props) => {
  const [burgers, setBurgers] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'menuItems')/*,orderBy('timeCreated')*/);
    async function getItems() {
      let documents = [];
      const docs = await getDocs(q);
      docs.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id })
      });
      console.log(documents)
      setBurgers(documents)
      setReady(true);
    }
    getItems();
  }, [])

  const addCart = (id, count) => {
      set(ref(rtdb, 'users/' + props.authot.uid + "/" + id),
        count
      );
  }

  const Section = (props2) => {
    return (
      <div>
        <h1 className='text-center'>{props2.title}</h1>
        <div className='flex justify-center flex-wrap'>
          {props2.itemCards && props2.itemCards.map((item) => (<MenuCard item={item} authot={props.authot} addCart={addCart} changeClick={props.changeClick}></MenuCard>))}
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='mt-10 flex justify-center flex-wrap'>
        <Icon type={'burger'}></Icon><Icon type={'wrap'}></Icon><Icon type={'taco'}></Icon><Icon type={'burger'}></Icon>
        <Icon type={'burger'}></Icon><Icon type={'burger'}></Icon><Icon type={'burger'}></Icon>
      </div>
      <div className='mt-5 border-2 border-black flex flex-col w-[70%] items-center flex-wrap'>
        <Section title={"Combos"}></Section>
        <Section title={"Burgers"} itemCards={burgers}></Section>
        <Section title={"Burgers"}></Section>
        <Section title={"Snacks"}></Section>
        <Section title={"Fries"}></Section>
        <Section title={"Drinks"}></Section>
        <Section title={"Sauces"}></Section>
      </div>
    </div>
  )
}

export default MenuPage