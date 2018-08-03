var ReviewsModel = require('../models/reviewsModel');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;

exports.list = function (req, res) {
    var login = (req.session.passport) ? req.session.passport.user : false;
    // [condition: must hv 5 '5/5' ratings and an average of 4.5/5]
    sequelize.query('SELECT * FROM reviews where averageSellerRating > 4.4 and sellerCount> 4 ORDER BY averageSellerRating desc',  
        { model: ReviewsModel },
    ).then(function (reviews) {
        res.render('topSellers', {
            title: "Adamire - Top Sellers",
            sellersList: reviews,
            user: req.user,
            login: login,
            urlPath: req.protocol + "://" + req.get("host") + req.url
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};