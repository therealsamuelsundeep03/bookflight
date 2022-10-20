const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helper = require("../helper/login.helper");

const service = {
    async findUser (req,res) {
        try{
            const { email,password } = req.body;

            if(email && password){
                const isUserExists = await helper.getUser(email);

                if(!isUserExists){
                    console.log("user login info:: Email doesn't exists.")
                    res.status(403).send("Email doesn't exists.")
                }
                if(!isUserExists.password){
                    console.log("user login info:: signed in before by google")
                    res.status(403).send("Sign in to login") //forbidden
                }else if(isUserExists){
                    const match = await bcryptjs.compare(password,isUserExists.password);

                    if(match){
                        const accessToken = jwt.sign(
                            {email},
                            `${process.env.ACCESS_TOKEN}`,
                            {expiresIn:'1m'}
                        )
        
                        const refreshToken = jwt.sign(
                            {email},
                            `${process.env.REFRESH_TOKEN}`,
                            {expiresIn:'1m'}
                        )
        
                        res.cookie('jwt',refreshToken);
                        res.status(200).send({accessToken,user:isUserExists.id});
                    }else{
                        console.log("user login info:: Password doesn't match")
                        res.status(401).send("Password doesn't match") //forbidden
                    }
                }
            }
            else{
                console.log("user login info:: Fill all the inputs.")
                res.status(403).send("Fill all the inputs.") //forbidden
            }
        }catch(err){
            console.log("Error in logging::", err);
            if(!res.headersSent){
                res.status(500).send("Error in logging the user");
            }
        }
    },

    async findmail(req,res){
        try{
            const { id } = req.params;
            if(id){
                const response = await helper.getEmail(id);
                res.status(200).send({"email":response.email});
                console.log(response)
                if(!response) res.status(401).send("Please log in again and try again");
            }
            else{
                console.log("Error in getting the mail for provider login:: didn't get the user id")
                res.status(403).send("Please login and try again");
            }
        }
        catch(err){
            console.log("Error in getting the mail for provider login:;", err);
            if(!res.headersSent){
                res.status(500).send("Error in getting the mail")
            }
        }
    }
}
module.exports =service;
