import { Routes,Route } from "react-router-dom";
import React from 'react';

// pages
import Login from "../container/Login";
import Signin from "../container/Signin";
import Home from "../container/Home";
import Flights from "../container/Flights";
import Booking from "../container/Booking";

const Router = () => {
  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/flight-details" element={<Flights/>}/>
            <Route path = "/booking" element={<Booking/>} />
        </Routes>
    </>
  )
}

export default Router