// get Profile model
var Profile = require('../models/profileModel');
var Reviews = require('../models/reviewsModel');
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
    var totalRatingsPerUser=0;
    var numOfRatings = 0;
    var avg = -1;
    Profile.findAll({where:{targetUsername: req.body.username}}).then(function(profile,callback){
        var deferred = $.Deferred();
        for (let i = 0; i < profile.length; i++) {
            console.log(profile[i].rating);
            totalRatingsPerUser += profile[i].rating;
            numOfRatings += 1;
        }
        // profile.forEach(item=>{
        //     console.log("rating:",item.rating);
        //     totalRatingsPerUser += item.rating;
        //     numOfRatings += 1;
        // });
        totalRatingsPerUser = totalRatingsPerUser + parseInt(req.body.rating);
        numOfRatings = numOfRatings + 1;
        avg = totalRatingsPerUser/numOfRatings;
        deferred.resolve(avg);
        return deferred.promise();
        // console.log("**********",numOfRatings);
        // console.log("total:",totalRatingsPerUser);
        // console.log("Avg:", avg);
    })
    // async function getRatings(){
    //     var listOfRatings = await Profile.findAll({where:{targetUsername: req.body.username}}).then(function(profile){
    //         return profile;
    //     });
    //     for (let i = 0; i < listOfRatings.length; i++) {
    //         console.log(listOfRatings[i].rating);
    //         totalRatingsPerUser += listOfRatings[i].rating;
    //         numOfRatings += 1;
    //     }
    //     totalRatingsPerUser = totalRatingsPerUser + parseInt(req.body.rating);
    //     numOfRatings = numOfRatings + 1;
    //     avg = totalRatingsPerUser/numOfRatings;

    //     return avg;
    // }
    // getRatings().then(function(avg){console.log("")})
    var reviewData = {
        buyerOrSeller: req.body.buyerOrSeller,
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating,
        by: req.user.username,
        targetUsername: req.body.username,
        user_id: req.user.id,
    }

    var ratingsData = {
        username: req.body.username,
        averageRating: avg
    }
    Profile.create(reviewData).then((newReview, created) => {
        Reviews.update(ratingsData, { where: { username: req.body.username } }).then((newRatings) => {
            // if (!newReview && !newRatings || newRatings == 0) {
            if (!newReview && !newRatings) {
                return res.send(400, {
                    message: "error"
                });
            }
            res.redirect('/profile/'+req.body.username);
        })
    })
}

// Reviews authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};