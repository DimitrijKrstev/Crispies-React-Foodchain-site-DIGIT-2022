import React from 'react'
import FindUsCard from './FindUsCard'

const FindUs = () => {
  const locations = [
    {id: 1, name:'Debar Maalo', address:'132 Orce Nikolov Str.'},
    {id: 2, name:'Aerodrom', address:'16 Vidoe Smilevski Bato Str.'}
  ]
  return (
    <div className='FindUs'>
        <h1>Find Us</h1>
        <p>Our locations:</p>
        {locations.map(l => 
          <FindUsCard id={l.id} name={l.name} address={l.address}/>
          )}
    </div>
  )
}

export default FindUs