import React, { useState } from 'react'

const FindUsCard = ({id, name, address, imgUrl, showOnMap}) => {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div id={id} className="FindUsCard flex grow flex-col items-center">
        <h3>{name}</h3>
        <p>{address}</p>
        <button onClick={() => {
          if (window.innerWidth <= 850)
            setMapOpen(!mapOpen);
          showOnMap(imgUrl)
          }}>
            <span className="mapButtonHorizontal">Map</span>
            {!mapOpen && <span className="mapButtonVerticalShow">Show Map</span>}
            {mapOpen && <span className="mapButtonVerticalHide">Hide Map</span>}
        </button>
        {mapOpen && <img className="verticalMap" src={imgUrl}/>}
    </div>
  )
}

export default FindUsCard;