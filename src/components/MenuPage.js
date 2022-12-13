import React from 'react'
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const MenuPage = () => {
  const [itemCards, setItems] = useState();
  useEffect(() => {
    
  }, [])
  return (
    <div className='flex justify-center'>
      <div className='border-2 border-black'>

      </div>
    </div>
  )
}

export default MenuPage