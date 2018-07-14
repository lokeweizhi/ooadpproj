var express = require("express");
var authRouter = express.Router();

// passport stuffs
var passport = require('passport');
// Passport configuration
require('../config/passport')(passport);

// Import login controller
var auth = require('../controllers/auth');

authRouter.get('/login', auth.signin);
authRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

authRouter.get('/signup', auth.signup);
authRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/settings',
    failureRedirect: '/signup',
    failureFlash: true
}));

// Logout Page
authRouter.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = authRouter;