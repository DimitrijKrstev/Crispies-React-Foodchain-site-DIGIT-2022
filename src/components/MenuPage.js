import React from 'react'
import { useState, useEffect } from 'react';
import { collection, query, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../index';
import '../css/MenuPage.css'
import MenuCard from './MenuCard';

const Icon = (props) => {
  let icon;
  switch(props.type){
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
  const [itemCards, setItems] = useState();
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
      setItems(documents)
      setReady(true);
    }
    getItems();
  }, [])

  const addCart = (id) => {
    
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='mt-10 flex justify-center'>
        <Icon type={'burger'}></Icon><Icon type={'wrap'}></Icon><Icon type={'taco'}></Icon>
      </div>
      <div className='mt-5 border-2 border-black flex flex-col w-1/2 items-center'>
        <h1>Burgers</h1>
        <div className='flex justify-center'>
          {ready && itemCards && itemCards.map((item) => (<MenuCard item={item} authot={props.authot} addCart={addCart} changeClick={props.changeClick}></MenuCard>))}
        </div>
      </div>
    </div>
  )
}

export default MenuPage