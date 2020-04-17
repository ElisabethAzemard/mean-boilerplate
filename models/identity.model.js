/* IMPORTS */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');

/* DEFINITION */
const MySchema = new Schema({
    email: { unique: true, type: String },
    password: String,
    isValidated: { type: Boolean, default: true }
});

/* METHODS */
MySchema.methods.generateJwt = (identity) => {
    // set expiration
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 59);

    const jwtObj = {
        _id: identity._id,
        expireIn: '10s',
        exp: parseInt(expiry.getTime() / 100, 10)
    };

    // JWT creation
    return jwt.sign(jwtObj, process.env.JWT_SECRET )
};

/* EXPORT */
module.exports = mongoose.model('identity', MySchema);
