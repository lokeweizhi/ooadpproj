// get offers model
var OffersModel = require('../models/offers');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;

// Create Offers
exports.create = function (req, res) {
    console.log("creating offers")

    var offerData = {
        sellerUsername: req.body.sellerUsername,
        price: req.body.price,
        buyerUsername: req.user.username
    }
    OffersModel.create(offerData).then((newOffer, created) => {
        if (!newOffer) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/offers');
    })
}
// List Offers
exports.list = function (req, res) {
    OffersModel.findAll({
        attributes: ['id', 'sellerUsername', 'price', 'buyerUsername', 'createdAt'],
    }).then(function (offers) {
        res.render('offers', {
            title: "Adamire - Offers",
            offerList: offers,
            urlPath: req.protocol + "://" + req.get("host") + req.url,
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};

// delete offers
exports.delete = function (req, res) {
    var record_num = req.params.offers_id;
    console.log("deleting offers " + record_num);
    OffersModel.destroy({where: {id: record_num}}).then((deletedOffer)=> {
        if (!deletedOffer) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({ message: "Deleted offers :" + record_num});
    })
}

// Offers authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};