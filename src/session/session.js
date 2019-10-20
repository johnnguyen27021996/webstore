const session = require('express-session');
module.exports = session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 9999999
    }
});