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
    UsersModel.find({
        where:{username: req.body.username}
    }).then(function (user) {
        console.log("**************************************USERRRRRRRRRRRRRRRR",req.body.rating);
        Profile.findAll({
            where:{targetUsername: req.body.username}
        }).then(function(profile){
            var jsonString = JSON.stringify(profile);
            //console.log(jsonString);
            var obj = JSON.parse(jsonString);
            totalRatings = 0; 
            numOfRatings = 0; 

            for (item in obj) {
                totalRatings += obj[item].rating;
                numOfRatings += 1;
                //console.log("*********obj[item].rating: ",obj[item].rating);
                //console.log("******item:",item);
            }
            //console.log("total = "+totalRatings);
            ave = (totalRatings/numOfRatings);
            //console.log("ave = "+ave);
            totalRatings= totalRatings + parseInt(req.body.rating);
            //console.log("total(include req.body.rating) = "+totalRatings);
            numOfRatings = numOfRatings + 1;
            //console.log("numOfRatings(include req.body.rating) = "+numOfRatings);
            ave = totalRatings/numOfRatings;
            //console.log("ave(include req.body.rating) = "+ave);
            
        }).then(function (profile){
            //console.log("!!!!!!!!ave:",ave);
            //console.log("!!!!!!!!numOfRatings:",numOfRatings);
            //console.log("!!!!!!!!req.body.username:",req.body.username);
            var ratingsData = {
                username: req.body.username,
                imageName: user.imageName,
                averageRating: ave,
                reviewCount: numOfRatings
            };
            var reviewData = {
                buyerOrSeller: req.body.buyerOrSeller,
                title: req.body.title,
                content: req.body.content,
                rating: req.body.rating,
                by: req.user.username,
                targetUsername: req.body.username,
                user_id: req.user.id,
            };
            Profile.create(reviewData).then((newReview, created) => {
                // if (numOfRatings==1){
                //     Reviews.create(ratingsData, { where: { username: req.body.username } }).then((newRatings) => {
                //         if (!newReview || !newRatings) { // ***** what if i accidentally delete the record?
                //             return res.send(400, {
                //                 message: "error"
                //             });
                //         }
                //         res.redirect('/profile/'+req.body.username);
                //     })
                // }
                // else{
                    Reviews.update(ratingsData, { where: { username: req.body.username } }).then((newRatings) => {
                        if (!newReview || !newRatings || newRatings == 0) { // ***** what if i accidentally delete the record?
                            return res.send(400, {
                                message: "error"
                            });
                        }
                        res.redirect('/profile/'+req.body.username);
                    })
                // }
            })
        });
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
}


// Reviews authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};