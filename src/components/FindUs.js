import {React, useEffect, useState} from 'react'
import FindUsCard from './FindUsCard'
import { db } from '../index'
import { collection, getDocs } from '@firebase/firestore'
import "../css/FindUs.css"
import ScrollContainer from 'react-indiana-drag-scroll'

const FindUs = () => {

  const [locations, setLocations] = useState([]);
  const [mapOpened, setMapOpened] = useState('https://firebasestorage.googleapis.com/v0/b/crispies-3dcb9.appspot.com/o/allLocations.jpg?alt=media&token=50acf22b-4505-48a9-abf5-c763b9dd354a');
  const [windowWidth, setWindowWidth] = useState(0);
  
  const handleResize = (e) => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
      let processedData = [];
      const docRef = collection(db,"restaurants");
      getDocs(docRef).then((data) => {
      data.forEach(entry => processedData.push({id:entry.id, ...entry.data()}));
      setLocations(processedData);
    })
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
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
      <ScrollContainer style={{
        overflow: "scroll",
        maxHeight: windowWidth <= 867 ? "calc(100vh - 148px - 66px - 144px - 1px)" : "calc(100vh - 124px - 66px - 144px - 1px)" 
      }} id="map">
          <img src={mapOpened} alt="map"/>
      </ScrollContainer>
    </div>
  )
}

export default FindUs