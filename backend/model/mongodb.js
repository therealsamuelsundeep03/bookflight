const { MongoClient } = require('mongodb');
require('dotenv').config()

const mongo = {
    db:null,

    async connect(){
        const client = new MongoClient(`mongodb+srv://samuel:plmqazsam123@guvi-experiment.etqqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
        await client.connect()
            .then(() => {
                console.log("connected to the database");
                this.db = client.db("bookflight");
                console.log("database selected"); 
            })
            .catch(err => {
                console.log("Error in connecting to the database::", err);
            })
       
    }
}

module.exports = mongo;