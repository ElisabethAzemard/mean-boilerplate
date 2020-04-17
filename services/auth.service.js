/* IMPORTS */
const JwtStrategy = require('passport-jwt').Strategy;
const Models = require('../models/index');

/* SERVICE DEFINITION */
// extract token from cookie
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies['blog-mean'];
    return token;
};

// JWT authentication
const authJwt = (passport) => {
    // #JWT Options for passport
    const opts = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
    };

    // #JWT strategy
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        Models.identity.findOne({ _id: jwtPayload._id }, (err, identity) => {
            if (err) { return done(err, false)}
            if (identity) {
                return done(null, identity)
            }
            else { return done(null, false) }
        });
    }));
};

/* SERVICE FUNCTIONS EXPORT */
module.exports = {
    setAuthentication: (passport) => {
        authJwt(passport);
    },
};
