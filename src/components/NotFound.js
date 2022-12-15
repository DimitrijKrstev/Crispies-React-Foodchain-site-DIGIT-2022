import React from 'react'
import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto flex flex-col border-2 border-offblack max-w-[500px] mt-16">
      <div className="flex justify-between bg-beige">
      <h1 className="textSignin text-offblack text-4xl ml-3">Error...</h1>
        <Link to="/"><button className="textSignin bg-terra text-offblack p-2 px-4 border-l-2 border-offblack">X</button></Link>
      </div>
        <div className="flex flex-col bg-beigeLight border-t-2 border-offblack text-center border-b-8 py-16">
            <h1 className="textSignin text-8xl">404</h1>
            <h1 className="textSignin text-2xl">Crispy Chicken not found...</h1>
        </div>
    </div>
  )
}

export default NotFound