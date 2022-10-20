const mongo = require('../model/mongodb');

const helper = {
    // adding an user to the db
    addUserInfo (email,password,username,id) {
        return mongo.db.collection('auth').insertOne({email,password,username,id});
    },

    // google login
    addUserInfoGoogle (email,id) {
        return mongo.db.collection('auth').insertOne({email,id});
    } ,

    // user who is logged in using google wants to log in using app.
    addExistingUser (email,password,username){
    return mongo.db.collection('auth').updateOne({email},{$set:{password,username}})
    } 
}

module.exports = helper;