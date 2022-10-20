const { v4 : uuidv4 } = require ('uuid');
const jwt = require('jsonwebtoken');

const loginHelper = require("../helper/login.helper");
const signinHelper = require("../helper/signin.hepler");

const service = {
    async googleLogin (req,res) {
        try{
            const { email } = req.body;

            if(email){
                const isUserExists = await loginHelper.getUser(email);

                const accessToken = jwt.sign(
                    {email},
                    `${process.env.ACCESS_TOKEN}`,
                    {expiresIn:'1m'}
                )

                const id = isUserExists ? isUserExists.id : uuidv4();
                res.status(200).send({accessToken,id});

                console.log("gmail logged in");

                if(!isUserExists){
                    const addUser = await signinHelper.addUserInfoGoogle(email,id);
                    console.log("user added into auth by google::", addUser);
                }
            }else{
                res.status(403).send("Please try again.")
            }
        }
        catch(err){
            console.log("Error in google login::", err);
            if(res.headerSent){
                res.status(500).send("Check internet connectivity or try again")
            }
        }
    } 
}

module.exports = service