/* IMPORTS */
const mongoose = require('mongoose');

/* SERVICE DEFINITION */
const initClient = () => {
    return new Promise( (resolve, reject) => {
        mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then( db => resolve( { db: db, url: process.env.MONGO_URL } ))
        .catch( error => reject(`MongoDB not oops`, error) )
    })
}
//

/* SERVICE FUNCTIONS EXPORT */
module.exports = { initClient };
