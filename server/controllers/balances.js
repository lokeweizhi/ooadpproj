// get balances model
var ContactModel = require('../models/contacts');
var BalanceModel = require('../models/balances');
var myDatabase = require('./database');
var TransactionsModel = require('../models/transactions');
var sequelize = myDatabase.sequelize;

// List the balance in database
exports.list = function (req, res) {
    TransactionsModel.findAll({
        attributes: ['id', 'amount', 'contactName', 'username'],
        where:{username: req.user.username}
    }).then(function (transaction) {
        BalanceModel.findAll({
            attributes: ['id', 'balanceAmt', 'username'], 
            where:{username: req.user.username}
        }).then(function (balance) {
            ContactModel.findAll({
                attributes: ['id', 'contactName', 'username'],
                where:{username: req.user.username}
            }).then(function (contacts){
                console.log("**********",balance);
                console.log("**********",contacts);
                res.render('ewallet', {
                    title: "Adamire - Ewallet",
                    balanceList: balance,
                    itemList: contacts,
                    transactionList: transaction,
                    urlPath: req.protocol + "://" + req.get("host") + req.url,
                    user: req.user
                });
            })
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};

// Create Balance
exports.create = function (req, res) {
    console.log("creating balances")

    var balanceData = {
        balanceAmt: req.body.topUpAmount,
        username: req.user.username
    }

    BalanceModel.create(balanceData).then((newBalance, created) => {

        if (!newBalance) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/ewallet');
    })
}

// Comments authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};