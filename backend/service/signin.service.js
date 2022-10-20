const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { v4 : uuidv4 } = require ('uuid');

const helper = require("../helper/signin.hepler");
const loginHelper = require('../helper/login.helper');


require('dotenv').config();

const service = {
    string:null,
    username:null,
    email:null,
    password:null,
    accountExists:null,

    async adduser (req,res) {
        try{
            const { email,password,confirmpassword,username } = req.body;

            // if all the inputs are received then proceed or else send an error message.
            if(email && password && confirmpassword && username){
                this.username=username;
                this.email=email;
                this.password=password;

                const checkUser = await loginHelper.getUser(email); 
                console.log("user exists? ::",checkUser)

                // if either there is no user or there is an user with no password send a mail
                if(!checkUser || !checkUser.password){
                    jwt.sign(
                        {email},
                        `${process.env.ACCESS_TOKEN}`,
                        {expiresIn:'5m'},
                        (err,emailToken) => {
                        if(err){
                            console.log(err)
                            res.status(500).send("Please try again");
                            console.log("Erron in generating the token in signin::", err);
                        }else{
                            res.status(200).send("Check mail");

                            // sending the mail with a token token for verifcation
                            this.string = emailToken;
                            // console.log(process.env.SERVER)
                            const link = `${process.env.SERVER}/signin/confirmation/${emailToken}`;
                
                            const html = `
                            <h1>Let's confirm your email address, To sign in please click on the link below</h1>
                            <a href=${link} target="_self" style="text-decoration:none;color: #fff;"><button style="outline:none;border:none;padding: 10px;width: 20rem;height:5rem;color: #fff;border-radius:5px;background-color: rgb(37, 58, 95);font-size:18px;color: #fff;font-size:18px">Click Here</button></a>
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
                                subject: "Email Confirmation", 
                                text: "Let's confirm your email address", 
                                html: html
                            }).then(info => {
                                console.log(info);
                            }).catch(err => {
                                console.log(err)
                                res.status(500).send("Please try again");
                            })

                            if(!checkUser){
                                // if the user does not exists add him to the database
                                this.accountExists = false
                            }else if(!checkUser.password){
                                // if the user does exist add his credentials to the database
                                this.accountExists = true
                            }
                        }}
                    )
                }else if(checkUser.email && checkUser.password){
                    // send an error that email arlready exists.
                    res.status(403).send("Email already exists.")  //forbidden
                    console.log("signin info:: email and pass already exists");
                } 
                
            }else{
                console.log("Error in signing the user::  Fill all the user inputs.");
                res.status(403).send("Fill all the user inputs.");
            }
        }
        catch(err){
            console.log("Error in signing the user::", err);
            if(!res.headersSent){
                res.status(500).send("Error in verifing the email link. Please try again.")
            }
        }
    },

    async siginlink (req,res) {

        // check the password if the link matches then add the user into the db or else send an error message.
        try{
            const checkLink = req.params.id;

            console.log(checkLink === this.string)
            if(this.string === checkLink){
                const salt = await bcryptjs.genSalt(10);
                this.password = await bcryptjs.hash(this.password,salt);

                const id = uuidv4();
                console.log(this.accountExists)
                if(this.accountExists){
                    const response = await helper.addExistingUser(this.email,this.password,this.username,id)
                    res.redirect(`${process.env.CLIENT}/user-login`)
                    console.log("sigin link confirmation::existing user added to the database::",response)                
                }else{
                    const response = await helper.addUserInfo(this.email,this.password,this.username,id);
                    res.redirect(`${process.env.CLIENT}/login`)
                    console.log("sigin link confirmation:: user added to the database::",response)
                }
            }
            else{
                res.status(401).send("Please try again link do not match");
                console.log("sigin link confirmation::  link do no match")
            }
        }
        catch(err){
            if(!res.headersSent){
                res.status(500).send("Error in verifing the email link. Please try again.")
            }
            console.log("Error in verifing the link::", err)
        }
    }
}

module.exports = service
