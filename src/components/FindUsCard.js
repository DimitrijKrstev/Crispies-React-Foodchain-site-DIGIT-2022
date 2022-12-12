import React from 'react'

const FindUsCard = ({id, name, address}) => {
  return (
    <div id={id}>
        <h3>{name}</h3>
        <p>{address}</p>
    </div>
  )
}

export default FindUsCard