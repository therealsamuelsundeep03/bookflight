const mongo = require("../model/mongodb");

const helper = {
    vacancyCheck(time,airport){
        return mongo.db.collection("flights").findOne({"from.scheduled":time},{"from.airport":airport})
    },

    buyTicket(time,airport,seats){
        return mongo.db.collection("flights").updateOne({"from.scheduled":time},{"from.airport":airport},{$set:{"seats":{...seats}}})
    }
}

module.exports = helper;