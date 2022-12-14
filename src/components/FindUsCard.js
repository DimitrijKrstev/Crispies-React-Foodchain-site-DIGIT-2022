import React, { useState } from 'react'

const FindUsCard = ({id, name, address, imgUrl, showOnMap}) => {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <div id={id} className="FindUsCard flex grow-1 md:w-1/4 flex-col bg-beigeLight text-offblack text-center">
        <h3 className="text-2xl text-offblack w-full mt-3">{name}</h3>
        <p>{address}</p>
        <div className=" border-t-2 border-offblack mt-3 w-full">
            <button className="px-3 py-2 w-full bg-sea btnHover" onClick={() => {
              if (window.innerWidth <= 850)
                setMapOpen(!mapOpen);
              showOnMap(imgUrl)
              }}>
                <span className="mapButtonHorizontal">Map</span>
                {!mapOpen && <span className="mapButtonVerticalShow">Show Map</span>}
                {mapOpen && <span className="mapButtonVerticalHide">Hide Map</span>}
            </button>
        </div>
        {mapOpen && <img className="verticalMap" src={imgUrl}/>}
    </div>
  )
}

export default FindUsCard;