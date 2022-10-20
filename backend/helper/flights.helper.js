const mongo = require("../model/mongodb");

const helper = {
    flights(){
        return mongo.db.collection("flights").find({});
    },
    getFlight(from,to){
        // return mongo.db.collection("flights").find({"from.airport":{'$regex': from, $options: '?-i'}},{"to.airport":{'$regex': to, $options: '?-i'}})
        return mongo.db.collection("flights").find({"from.airport":from},{"to.airport":to})
    }
}

module.exports = helper;