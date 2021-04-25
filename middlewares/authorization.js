require('dotenv').config();
const expressJwt = require('express-jwt');

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: "auth"
});