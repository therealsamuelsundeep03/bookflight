const express = require("express");
const app = express();
const cors = require('cors');

require('dotenv').config();

const mongo = require("./model/mongodb");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const loginRoute = require("./routes/login.routes");
const signinRouter = require("./routes/signin.routes");
const googleRouter = require("./routes/google.routes");
const flightRoute = require("./routes/flights.routes");
const buyRoute = require("./routes/book.routes");

(async() => {
    // middleware
    app.use(credentials);
    app.use(express.json());
    app.use(cors(corsOptions));

    // establishing connection
    await mongo.connect();
    
    // routes
    app.use('/login',loginRoute);
    app.use('/signin',signinRouter);
    app.use('/flights',flightRoute);
    app.use('/googlogin',googleRouter);
    app.use('/bookticket',buyRoute);
})()

app.listen(process.env.PORT,() => {
    console.log(`app is listening to the port ${process.env.PORT}`)
})