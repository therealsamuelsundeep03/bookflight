const mongo = require("../model/mongodb");

const helper = {
    getUser(email){
        return mongo.db.collection('auth').findOne({email});
    },
    getEmail(id){
        return mongo.db.collection('auth').findOne({id});
    }
}

module.exports = helper;