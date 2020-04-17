/* IMPORTS */
const mongoose = require('mongoose');
const { Schema } = mongoose;

/* DEFINITION */
const MySchema = new Schema({
    // schema.org
    '@context': { type: String, default: 'http://schema.org' },
    '@type': { type: [ String ], default: ['Article'] },

    headline: String,
    articleBody: String
});

/* SET INDEX FOR SEARCH */
MySchema.index({
    headline: 'text',
    articleBody: 'text'
})

/* EXPORT */
module.exports = mongoose.model( 'post', MySchema );
