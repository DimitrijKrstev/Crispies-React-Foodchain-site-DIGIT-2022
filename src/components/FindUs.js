import {React, useState} from 'react'
import FindUsCard from './FindUsCard'
import { collection, getDocs, getFirestore, doc } from '@firebase/firestore'

const getFromFS = async (setLocations) => {
  let db = getFirestore();
  const docRef = collection(db,"restaurants");
  const docSnap = await getDocs(docRef);
  
  let processedData = [];
  docSnap.forEach(entry => processedData.push({id:entry.id, ...entry.data()}));
  setLocations(processedData);
}

const FindUs = () => {
  const [locations, setLocations] = useState([]);
  
  getFromFS(setLocations);
  
  return (
    <div className='FindUs'>
        <h1>Find Us</h1>
        <p>Our locations:</p>
        {locations.map(l => 
          <FindUsCard key={l.id} name={l.name} address={l.address}/>
          )}
    </div>
  )
}

export default FindUs