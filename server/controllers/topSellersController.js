var ReviewsModel = require('../models/reviewsModel');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;

exports.list = function (req, res) {
    // [condition: must hv 10 '5/5' ratings and an average of 4.5/5]
    sequelize.query('SELECT * FROM reviews where averageRating > 4.4 and reviewCount>9 ORDER BY averageRating desc',  
        { model: ReviewsModel }
    ).then(function (reviews) {
        res.render('topSellers', {
            title: "Adamire - Top Sellers",
            sellersList: reviews,
            user: req.user,
            urlPath: req.protocol + "://" + req.get("host") + req.url
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};