import React, { useEffect, useState } from 'react';
import {  useLocation,useNavigate } from "react-router-dom";

import Header from "../components/Header";
import axios from "../service/backend";
import "../css/flights.css";

const Flights = () => {
  const [disable,setDisable] = useState(false);

  const [data,setData] = useState([]);
  let {state:{ticketDet:{from,to,depart,person:{adults,children,place}}}} = useLocation();
  const user = localStorage.getItem("user");
  
  useEffect(() => {
    const fetchData = async() => {
      try{
        let { data } = await axios.get(`/flights/${from.toLowerCase()}/${to.toLowerCase()}`);
        // console.log(data)

        // manipulating the price based on months
        let departYear = +depart.split("-")[0].slice(2)
        let departMonth = +depart.split("-")[1]
        let departDate = +depart.split("-")[2]
        let todayMonth = new Date().getMonth();
        let todayDate = new Date().getDate();
        let todayYear = Number(new Date().getYear().toString().slice(1));
        let yearDiff = departYear - todayYear
        let offer = (12 * yearDiff - todayMonth + departMonth -1)
        offer < 0 && setDisable(true);

        // if the user is trying to book tickets before today then diable
        if(departYear === todayYear){
          if(departMonth < todayMonth) setDisable(true);
          else if(departMonth === todayMonth+1 && departDate < todayDate){
            setDisable(true);
          }
        }


        let res = data.map(flights => {return {
          ...flights,
          price: offer >= 6 ? +flights.price - 3000  : 
          offer >= 5 && offer < 6 ? +flights.price - 2000 :
          offer >= 4 && offer < 5 ? +flights.price - 1000  : +flights.price
      }})
        setData(res);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[])

  const navigate = useNavigate();
  // console.log(disable)

  const currentTime = +(new Date().getHours()+""+(new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes()));

  return (
    <>
      {user.length ? (
        <div className={`flights ${disable ? "disableClick" : ""}`} >
        <Header />
        
        <div className='fromTo'>
          <div className='ticketDetailsft'>
            <div className='citiesft'>{from} - {to}</div>
            <div className='departft'>{depart}</div>
          </div>

          <div className='trav'>{adults} Adult | {children} children | {place}</div>
        </div>
        
        <div className='flightsDet'>
          {/* flights */}
          {data.map((flight,idx) => {
            return (
              <>
              {/* {console.log(+flight.from.scheduled.replace(":","") < currentTime)} */}
              {/* ${+depart.split("-")[2] === new Date().getDate() && +flight.from.scheduled.replace(":","") < currentTime ? "disableClick" : ""} */}
                <div 
                className={`flight ${(+depart.split("-")[0].slice(2) === +(new Date().getYear().toString().slice(1))) && (new Date().getMonth() === +depart.split("-")[1]) && (+depart.split("-")[2] === new Date().getDate() && +flight.from.scheduled.replace(":","") < currentTime ? "disableClick" : "")}`} 
                key={idx} disabled={+flight.from.scheduled.replace(":","") < currentTime}>

                  {/* image */}
                  <div className='cityimage'>
                      <img src = "https://content.skyscnr.com/m/2141e25d48558df4/original/fillter-illu_NB.svg?resize=500px:500px&quality=90" alt="https://content.skyscnr.com/m/2141e25d48558df4/original/fillter-illu_NB.svg?resize=500px:500px&quality=90" />
                  </div>

                  {/* flight details */}
                  <div className='flightname'>
                    {/* <span className="material-symbols-outlined flighticon">
                      flight
                    </span> */}
                    {flight.flightName}
                  </div>
                  <div className='timingsft'>
                        <div>
                          <div className='scheduledft'>{flight.from.scheduled}</div>
                          <div className='cityft'>{flight.from.airport}</div>
                        </div>
                        <span className="material-symbols-outlined arrow">
                          trending_flat
                        </span>
                        <div>
                          <div className='scheduledft'>{flight.to.scheduled}</div>
                          <div className='cityft'>{flight.to.airport}</div>
                        </div>
                  </div>

                  {/* select flight */}
                  <div className='priceft'>
                    <button disable={disable} onClick={() => {navigate("/booking",{state:{flight,depart,adults,children,place}})}}>₹ {place === "Economy" ? Number(flight.price).toLocaleString() :  Number(flight.price+3000).toLocaleString() }</button>
                  </div>
                </div>
              </>
            ) 
          })}
        </div>
    </div>
      ): navigate("/login")}
    </>
  )
}

export default Flights;
