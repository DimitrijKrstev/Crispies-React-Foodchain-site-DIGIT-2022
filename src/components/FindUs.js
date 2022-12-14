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
      <h1>Find Us</h1>
      <p>Our locations:</p>
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
      <div id="map">
        <img src={mapOpened} />
      </div>
    </div>
  )
}

export default FindUs