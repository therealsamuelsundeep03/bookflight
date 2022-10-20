const helper = require("../helper/book.helper");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken")
require('dotenv').config();

const service = {
    async buyTicket(req,res){
        try{    
           const{email,total,flight,depart,adults,children,place,from,to} = req.body;
           if(email && total && flight && depart && adults && children && place && from && to){
                    res.status(200).send("booked");
                    const html = `
                        <h1>Ticket booked</h1>
                        <div>Flight: ${flight.flightName}</div>
                        <div>From: ${from}</div>
                        <div>To: ${to}</div>
                        <div>Class: ${place}</div>
                        <div>Adults: ${adults}</div>
                        <div>Children: ${children}</div>
                        <div>Total: ${total}</div>
                        `
                  
                    // if email doesn't exists then send a verification to the user email
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 587,
                        auth: {
                        user: `${process.env.EMAIL}`,
                        pass: `${process.env.PASS}`,
                        },
                    });
        
                    transporter.sendMail({
                        from: '"Fligh High" <hebestore6@gmail.com>', 
                        to: email, 
                        subject: "Ticket booked", 
                        text: "Ticket details", 
                        html: html
                    }).then(info => {
                        console.log(info);
                    }).catch(err => {
                        console.log(err)
                        res.status(500).send("Please try again");
                    })
           }else{
            res.status(500).send("please try again")
           }
        } catch(err){
            console.log("Error in getting the response::", err);
            res.status(500);
        }
    }
}

module.exports = service;

// const html = `
// <h1>Ticket booked</h1>
// <div>Flight: ${flightName}</div>
// <div>From: ${from}</div>
// <div>To: ${to}</div>
// <div>Class: ${place}</div>
// <div>Adults: ${adults}</div>
// <div>Children: ${children}</div>
// <div>Total: ${total}</div>
// `