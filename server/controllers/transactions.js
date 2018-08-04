// get transactions model
var TransactionsModel = require('../models/transactions');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;
const Op = sequelize.Op;

// Create Transaction
exports.create = function (req, res) {
    console.log("creating transaction")

    var transactionData = {
        amount: req.body.amount,
        contactName: req.body.contactName,
        username: req.user.username,
        buyerStatus: "incomplete",
        sellerStatus: "incomplete"
    }

    TransactionsModel.create(transactionData).then((newTransaction, created) => {

        if (!newTransaction) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/ewallet');
    })
}
exports.list = function (req, res) {
    TransactionsModel.findAll({

        attributes: ['id', 'amount', 'contactName', 'username', 'buyerStatus','sellerStatus', 'createdAt'],
        where:{
            [Op.or]: [{username: req.user.username}, {contactName:req.user.username}] //added this for my review page
        }
    }).then(function (transaction) {
        res.render('transactions', {
            title: "Adamire - Transaction History",
            transactionList: transaction,
            urlPath: req.protocol + "://" + req.get("host") + req.url,
            user: req.user,
            currentUser: req.user.username
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};

// Comments authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};