import React from 'react'
import {Link} from  "react-router-dom"
import './Headers.css'
import { FaEthereum} from "react-icons/fa"

function Headers() {
  return (
    <div className='navbar'>

      <div className="logo">
        <h1>CryptoVerse</h1>
         <FaEthereum color='orange' size={"25"}/>
      </div>

      <ul>
        <li><Link to='/'> Home</Link></li>
        <li><Link to='coins'>Coins</Link></li>
      </ul>

    </div>
  )
}

export default Headers;