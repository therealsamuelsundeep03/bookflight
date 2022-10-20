import React,{ useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import axios from "../service/backend";
import "../css/ticket.css";

const Booking = () => {
  const {state:{flight,depart,adults,children,place}} = useLocation()
  const [email,setEmail] = useState("");

  let total = place === "Economy" ? (adults*flight.price + (flight.price-3000)*children) : (adults*(flight.price + 3000) + flight.price*children);

  const navigate = useNavigate();

  const user = localStorage.getItem("user");


  useEffect(() => {
    const fetchData = async() => {
      try{
        const id = localStorage.getItem("user");
        const { data:{email} } = await axios.get(`/login/getemail/${id}`);
        setEmail(email);
      }
      catch(err){
        console.log(err.response.data);
        if(err.response === "Please log in again and try again"){
          alert("Please log in again and try again");
          navigate("/login");
        }
      }
    }
    fetchData();
  },[])
  const handleClick = async(e) => {
    e.preventDefault();
    try{
      const { data } = await axios.post("/bookticket",{total,email,flight,depart,adults,children,place,from:flight.from.airport,to:flight.to.airport})
      if(data){
        alert("Ticket booked successfully");
        navigate("/");
      }
    }
    catch(err){
      console.log(err.response.message);
      if(err){
        alert("Please try again");
        navigate("/");
      }
    }
  }
  return (
    <>
      {user.length ? (
              <div className='booking'>
              <div className='ticket'>
                  <h3>Booking Summary</h3>
                  <div className='name'>Email : {email}</div>
                  <div>From : {flight.from.airport[0].toUpperCase() + flight.from.airport.slice(1)}</div>
                  <div>To : {flight.to.airport[0].toUpperCase() + flight.to.airport.slice(1)}</div>
                  <div>Scheduled Time : {flight.from.scheduled} </div>
                  <div>Scheduled Date : {depart}</div>
                  <div>Adult : {adults}x{place === "Economy" ? flight.price : flight.price + 3000}</div>
                  <div>Children : {children}x{place === "Economy" ? flight.price-3000 : flight.price}</div>
                  <div>Class : {place}</div>
                  <div>Total : {total}</div>
                  <div className='pay'>
                    <button onClick={handleClick}>PAY</button>
                  </div> 
              </div>
            </div>
      ) : navigate("/login")}
    </>
  )
}

export default Booking