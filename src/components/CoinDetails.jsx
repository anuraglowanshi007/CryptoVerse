import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Baseurl } from './BaseUrl';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CoinDetails.css'
import {BiSolidUpArrow, BiSolidDownArrow} from 'react-icons/bi'
import {IoPulseOutline} from 'react-icons/io5'
import CoinChart from './CoinChart';


function CoinDetails() {
  const {id} = useParams();
  const[coin,setCoin] = useState([]);
  const [loading,setLoading] = useState(true);
  const[currency,setCurrency] = useState('inr');
  const profit = coin.market_data?.price_change_percentage_24h >0;
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  useEffect(()=>{
       const getCoin=async()=>{
        try{
          const {data} = await axios.get(`${Baseurl}/coins/${id}`)
          console.log(data);
          setCoin(data);
          setLoading(false);
        }catch(error){
          console.log(error);
          setLoading(false);
        }
       }
       getCoin();
       
  },[id])
  return (
   <>
   {
    loading ? <Loader/> : 
    <>
    <div className='coin-detail' style={{display:'flex' ,justifyContent:'space-evenly'}}>
      <div className='coin-info'>
      <div className='btn'>
          <button onClick={()=>{setCurrency('inr')}}>inr</button>
          <button onClick={()=>{setCurrency('usd')}}>usd</button>
      </div>
        <div className="time">
         {coin.last_updated}
        </div>
        <div className="coin-image">
          <img height={"150px" }src={coin.image.large} alt="" />
        </div>
        <div className="coin-name">
          {coin.name}
        </div>
        <div className="coin-price">
        {currencySymbol}{coin.market_data.current_price[currency]}
        </div>
        <div className="coin-profit">
           {profit ? <BiSolidUpArrow style={{color:'green'}}/>:<BiSolidDownArrow style={{color:'red'}}/>}{coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </div>
        <div className="market-rank">
          <IoPulseOutline color='orange'/>
           #{coin.market_cap_rank}
        </div>
        <div className="coin-des">
          <p>{coin.description['en'].split('.')[0]}</p>
        
        </div>

      </div>
      <CoinChart currency={currency}/>
    </div>
    </>
   }
   </>
  )
}

export default CoinDetails;