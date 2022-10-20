const helper = require("../helper/flights.helper");

const service = {
    async getFlights(req,res){
        try{
            const flights = [];
            const response = await helper.flights().forEach(doc => flights.push(doc));
            res.status(200).send(flights);
        }
        catch(err){
            console.log("Error in getting the flights::", err);
            res.status(500)
        }
    },

    async getFlight(req,res){
       try{
            const{from,to} = req.params;

            if(from && to){
                const flights = [];
                const response = await helper.getFlight(from,to).forEach((flight)=>{
                    if(flight.from.airport === from && flight.to.airport === to){
                        flights.push(flight)
                    }
                });
                console.log(flights);
                res.status(200).send(flights);
            }else{
                res.status(403).send("insufficent info")
                console.log("Error in getting the flight::, insufficent info");
            }
       }
        catch(err){
            console.log("Error in getting the flight::", err);
            res.status(500)
       }
    }   
}

module.exports = service