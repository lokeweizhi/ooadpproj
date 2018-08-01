// load passport module
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require('../models/users');
var Reviews = require('../models/reviewsModel');

module.exports = function (passport) {
    // passport init setup
    // serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    // using local strategy
    passport.use('local-login', new LocalStrategy({
        // change default username and password, to email and password
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            if (username)
                // format to lower-case
                username = username.toLowerCase();

            var isValidPassword = function (userpass, password) {
                return userpass === password;
            }
            // process asynchronous
            process.nextTick(function () {
                User.findOne({ where: { username: username } }).then((user) => {
                    // check errors and bring the mess  ages
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No such user found.'));
                    if (!isValidPassword(user.password, password))
                        return done(null, false, req.flash('loginMessage', 'Wrong password!'));
                    // everything ok, get user
                    else {
                        return done(null, user.get());
                    }
                }).catch((err) => {
                    console.log("Error:", err);
                    return done(err, false, req.flash('loginMessage', 'Error!'))
                });
            });
        }));
    // Signup local strategy
    passport.use('local-signup', new LocalStrategy({
        // change default username and password, to email and password
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, username, password, done) {
            if (username)
                // format to lower-case
                username = username.toLowerCase();
            // asynchronous
            process.nextTick(function () {
                // if the user is not already logged in:
                if (!req.user) {
                    User.findOne({ where: { username: username } }).then((user) => {
                    // **** validate username and email: doesn't work
                    //User.findOne({ or: [{ username: req.param('email')}, {email:req.param('username')}] }).then((user) => {    
                        // check email
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'Woops! The username` is already taken.'));
                        } else {
                            // create the user
                            var userData = {                          
                                accountType: 'User', // hard-coded
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                username: username,
                                email: req.body.email,
                                phoneNumber: req.body.phoneNumber,
                                password: password,
                                imageName: "default-avatar.png"
                            }
                            var reviewsData = {
                                username: username,
                                imageName: "default-avatar.png",
                                averageSellerRating: 0,
                                totalServiceRatings: 0,
                                totalPriceRatings: 0,
                                averageBuyerRating: 0,
                                sellerCount: 0,
                                buyerCount: 0
                            }

                            // save data
                            User.create(userData).then((newUser, created) => {
                                if (!newUser) {
                                    return done(null, false);
                                }
                                if (newUser) {
                                    return done(null, newUser);
                                }
                            })
                            Reviews.create(reviewsData).then((newReviews, created) => {
                                if (!newReviews) {
                                    return done(null, false);
                                }
                                if (newReviews) {
                                    return done(null, newUser);
                                }
                            })
                        }
                    }).catch((err) => {
                        console.log("Error:", err);
                        return done(err, false, req.flash('signupMessage', 'Error!'))
                    });
                } else {
                    return done(null, req.user);
                }
            });
        }));
};
