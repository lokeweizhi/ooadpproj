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
        if (!user){
            return res.status(400).send({
                message: "Invalid user!"
            });
        }
        Profile.findAll({
            where:{targetUsername: req.body.username}
        }).then(function(profile){
            var jsonString = JSON.stringify(profile);
            //console.log(jsonString);
            var obj = JSON.parse(jsonString);

            totalSellerRatings = 0; // Sellers: Total
            totalBuyerRatings = 0; // Buyers: Total

            numOfSellerRatings = 0;
            numOfBuyerRatings = 0; 

            totalServiceRatings = 0; // Sellers: Service Ratings
            totalPriceRatings = 0; // Sellers: Price Ratings

            aveSeller = 0;
            aveBuyer = 0;

            for (item in obj) {
                totalServiceRatings += obj[item].serviceRating;
                totalPriceRatings += obj[item].priceRating;
                totalBuyerRatings += obj[item].buyerRating;

                if (obj[item].buyerOrSeller == "Buyer") {
                    numOfSellerRatings += 1;
                } else if(obj[item].buyerOrSeller == "Seller"){
                    numOfBuyerRatings += 1;
                }
                    
                // console.log("*********obj[item].serviceRating: ",obj[item].serviceRating);
                // console.log("*********obj[item].priceRating: ",obj[item].priceRating);
                // console.log("*********obj[item].buyerRating: ",obj[item].buyerRating);
            }

            console.log("totalServiceRatings = "+totalServiceRatings);
            console.log("totalPriceRatings = "+totalPriceRatings);
            console.log("totalBuyerRatings = "+totalBuyerRatings);

            totalServiceRatings = totalServiceRatings + parseInt(req.body.serviceRating);
            console.log("totalServiceRatings(include req.body.rating) = "+totalServiceRatings);

            totalPriceRatings = totalPriceRatings + parseInt(req.body.priceRating);
            console.log("totalPriceRatings(include req.body.rating) = "+totalPriceRatings);

            totalBuyerRatings = totalBuyerRatings + parseInt(req.body.buyerRating);
            console.log("totalBuyerRatings(include req.body.rating) = "+totalBuyerRatings);

            // priceRating: 65% & serviceRating: 35%
            totalSellerRatings = (totalServiceRatings*0.35) + (totalPriceRatings*0.65);
            console.log("total(include req.body.rating) = " + totalSellerRatings);

            if (req.body.buyerOrSeller == "Buyer") {
                numOfSellerRatings += 1;
            } else if(req.body.buyerOrSeller == "Seller") {
                numOfBuyerRatings += 1;
            }
            console.log("Result(req.body.buyerOrSeller):" +req.body.buyerOrSeller);
            console.log("numOfSellerRatings(include req.body.rating) = "+numOfSellerRatings);
            console.log("numOfBuyerRatings(include req.body.rating) = "+numOfBuyerRatings);

            if (totalSellerRatings==0 && numOfSellerRatings==0){
                console.log("this is being passed in")
                aveSeller=0;
            }else{
                console.log("nahhh")
                aveSeller = totalSellerRatings/numOfSellerRatings;
                totalServiceRatings = totalServiceRatings/numOfSellerRatings;
                totalPriceRatings = totalPriceRatings/numOfSellerRatings;
                console.log("aveSeller(include req.body.rating) = "+aveSeller);
            }
            if (totalBuyerRatings==0 && numOfBuyerRatings==0){
                console.log("this is being passed in")
                aveBuyer=null;
            }else{
                aveBuyer = totalBuyerRatings/numOfBuyerRatings;
                console.log("aveBuyer(include req.body.rating) = "+aveBuyer);
            }
            
        }).then(function (profile){
            // console.log("!!!!!!!!ave:",aveSeller);
            // console.log("!!!!!!!!req.body.username:",req.body.username);
            // console.log("!!!!!!!!totalServiceRatings:",totalServiceRatings);
            // console.log("!!!!!!!!totalPriceRatings:",totalPriceRatings);
            
            var ratingsData = { // aka reviews
                username: req.body.username,
                imageName: user.imageName,
                averageSellerRating: aveSeller,
                totalServiceRatings: totalServiceRatings,
                totalPriceRatings: totalPriceRatings,
                averageBuyerRating: aveBuyer,
                sellerCount: numOfSellerRatings,
                buyerCount: numOfBuyerRatings
            };
            var reviewData = { //aka profiles
                buyerOrSeller: req.body.buyerOrSeller,
                title: req.body.title,
                content: req.body.content,
                serviceRating: req.body.serviceRating,
                priceRating: req.body.priceRating,
                buyerRating: req.body.buyerRating,
                by: req.user.username,
                targetUsername: req.body.username,
                user_id: req.user.id // stores user who submitted the reviews
            };
            Profile.create(reviewData).then((newReview, created) => {
                Reviews.update(ratingsData, { where: { username: req.body.username } }).then((newRatings) => {
                    if (!newReview || !newRatings || newRatings == 0) { // ***** what if i accidentally delete the record?
                        return res.send(400, {
                            message: "error"
                        });
                    }
                    res.redirect('/profile/'+req.body.username);
                })
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