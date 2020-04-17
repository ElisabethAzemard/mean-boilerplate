/*
Import
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
//

/*
Definition
*/
    const MySchema = new Schema({
        identity: String,
        firstname: String,
        lastname: String,
        birthdate: String,
    });
//

/*
Export
*/
    module.exports = mongoose.model( 'user', MySchema );
//