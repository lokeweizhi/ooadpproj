// get Profile model
var Profile = require('../models/profileModel');
var UsersModel = require('../models/users');

var myDatabase = require('./database');

// List reviews & details from reviews
exports.show = function(req, res) {
	// Render home screen
	res.render('activity', {
        title: 'Adamire - Activity',
        webTitle: 'Activity:'
	});
};

// Create Reviews
exports.create = function (req, res) {
    console.log("*********req.body.username:",req.body.username);
    console.log("*********req.body.rating:",req.body.rating);
    console.log("**********",isNaN(req.body.rating));
    var reviewData = {
        buyerOrSeller: req.body.buyerOrSeller,
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        by: req.user.username,
        targetUsername: req.body.username,
        user_id: req.user.id,
    }

    Profile.create(reviewData).then((newReview, created) => {
        if (!newReview) {
            return res.send(400, {
                message: "error"
            });
        }

        res.redirect('/profile/'+req.body.username);
    })
}

// Reviews authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};