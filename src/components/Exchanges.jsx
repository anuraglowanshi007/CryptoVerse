import React, { useEffect, useState } from 'react'
import Headers from './Headers';
import axios from 'axios'
import { Baseurl } from './BaseUrl';
import Loader from './Loader';
import coin from '../coin.png'
import './Exchanges.css'
import OurModel from './OurModels'


function Exchanges() {
  const [loading,setloading] =useState(true);
  const[exchange,setExchange] = useState([]);
  useEffect(()=>{
    const getExchangesData=async()=>{
      // const res = await axios.get(url);
      // console.log(res.data);
      const {data} = await axios.get(`${Baseurl}/exchanges`);  // using Destructuring 
      console.log(data);
      setExchange(data);
      setloading(false);
    }
    getExchangesData();
  },[])

  return (
   <>
   {
    loading ? <Loader/> :
    <><Headers/>
    <OurModel/>

    <div>
      {
        exchange.map((item,i)=>{
          return(

          <div key={i} className="ex-cards">
      <div className="image">
         <img height={"80px"} src={item.image} alt=''/>
      </div>
      <div className="name">
           {item.name}
      </div>
      <div className="price">
         {item.trade_volume_24h_btc.toFixed(0)}
      </div>
      <div className="rank">
        {item.trust_score_rank}
      </div>
      </div>

          )
        })
        
      }
    </div>
    </>
   }
  
   <div>

   </div>
   </>
  )
}

export default Exchanges