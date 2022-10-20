const allowedorigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://flighhighfront.netlify.app"
]

const corsOptions = {
    origin : (origin,callback) => {
        if(allowedorigins.indexOf(origin) !== -1 || !origin ){
            callback(null,true);
        }
        else{
            callback(new Error("Not allowed by cors"))
        }
    },
    optionSuccess  : 200
}

module.exports = corsOptions;