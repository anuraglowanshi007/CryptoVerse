import React from 'react'
import Loader from './Loader';
import { useState ,useEffect } from 'react';
import axios from 'axios';
import { Baseurl } from './BaseUrl';
import Headers from './Headers';
import { Link } from 'react-router-dom';

function Coins() {

  const [loading,setloading] =useState(true);
  const[Coins,setCoins] = useState([]);
  const[currency,setCurrency] = useState('usd');
  const [search,setSearch] = useState('');
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  useEffect(()=>{
    const getCoinsData=async()=>{
       try{
      // const res = await axios.get(url);
      // console.log(res.data);
      const {data} = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`);  // using Destructuring 
      console.log(data);
      setCoins(data);
      setloading(false);
      }catch (error) {
        console.log('error');
        setloading(false);
      }

    }
    getCoinsData();
  },[currency])
  return (
    <>
    {
      loading ? <Loader/> : <>
      <Headers/>
      <div className='search-bar'>
      <input type="text" placeholder=' Search Your Coins' 
      style={{height:"2rem",width:"20rem", position:"absolute",top:"1%" ,left:"35%",paddingLeft:"5px"}}
      onChange={(e) => setSearch(e.target.value)} 
       />
      </div>
      <div className='btns'>
          <button onClick={()=>{setCurrency('inr')}}>inr</button>
          <button onClick={()=>{setCurrency('usd')}}>usd</button>
      </div>
      
      {
        Coins.filter((data)=>{
          if(data == ''){
            return data;
        }else if(data.name.toLowerCase().includes(search.toLowerCase())){
          return data;
        }
        }).map((coindata,i)=>{
          return(
                 <CoinCard coindata={coindata} i={i} id={coindata.id} currencySymbol={currencySymbol}/>
          )
        })
        
      }
  
      </>
    }
    </>
  )
}

// Create child component
const CoinCard=({i,coindata,currencySymbol,id})=>{
  const profit = coindata.price_change_percentage_24h>0;
  return(
    <Link to={`/coins/${id}`} style={{color:"white", textDecoration:"none"}}>
    <div key={i} className="ex-cards">
    <div className="image">
       <img height={"80px"} src={coindata.image} alt=''/>
    </div>
    <div className="name">
         {coindata.name}
    </div>
    <div className="price">
       {currencySymbol}{coindata.current_price.toFixed(0)}
    </div>
    <div style={profit ? {color:"green"}:{color:"red"}} className="rank">
      {profit ? '+'+ coindata.price_change_percentage_24h.toFixed(2) :coindata.price_change_percentage_24h.toFixed(2) }
    </div>
    </div>
    </Link>
  )
}

export default Coins