import {React, useEffect, useState} from 'react'
import FindUsCard from './FindUsCard'
import { db } from '../index'
import { collection, getDocs, doc } from '@firebase/firestore'
import "../css/FindUs.css"

const FindUs = () => {
  const [locations, setLocations] = useState([]);
  const [mapOpened, setMapOpened] = useState('default');
  
  useEffect(() => {
      console.log("RENDERED");
      let processedData = [];
      const docRef = collection(db,"restaurants");
      getDocs(docRef).then((data) => {
      data.forEach(entry => processedData.push({id:entry.id, ...entry.data()}));
      setLocations(processedData);
    })
  }, [])
  
  return (
    <div className='FindUs'>
      <h1 className=" border-b-2 border-offblack text-4xl text-center bg-beige titleLocations py-3">Our locations</h1>
      <div className='flex justify-evenly flex-wrap'>
      {locations.map(l => 
        <FindUsCard key={l.id} 
          name={l.name} 
          address={l.address}
          imgUrl={l.imgUrl}
          showOnMap = {(imgUrl) => {
            setMapOpened(imgUrl) 
          }}
          />
        )}
      </div>
      <div id="map" className='w-full'>
        <img src={mapOpened} />
      </div>
    </div>
  )
}

export default FindUs