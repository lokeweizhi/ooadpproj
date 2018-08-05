// get transactions model
var TransactionsModel = require('../models/transactions');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;
var moment = require('moment');
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
            [Op.or]: [{username: req.user.username}, {contactName:req.user.username}] 
        }
    }).then(function (transaction) {
        res.render('transactions', {
            title: "Adamire - Transaction History",
            transactionList: transaction,
            urlPath: req.protocol + "://" + req.get("host") + req.url,
            user: req.user,
            moment: moment,
            currentUser: req.user.username
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};
exports.list2 = function (req, res) {
    TransactionsModel.findAll({
        attributes: ['id', 'amount', 'contactName', 'username', 'createdAt'],
    }).then(function (transactions) {
        res.render('manageTransactions', {
            title: "Adamire - Transactions Management",
            manageTransactionsList: transactions,
            urlPath: req.protocol + "://" + req.get("host") + req.url,
            moment: moment,
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};
exports.editTransaction = function(req, res) {
    var transactions_id = req.params.id;
    TransactionsModel.findById(transactions_id).then(function (transactions) {
        res.render('editTransaction', {
            title: "Adamire - Edit Transaction",
            transactionList: transactions,
            hostPath: req.protocol + "://" + req.get("host") + "/manageTransactions"
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};
exports.update = function (req,res) {
    var transactions_id = req.params.id;
    var updateData = {
        username : req.body.username,
        contactName : req.body.contactName,
        amount : req.body.amount,
    }
    TransactionsModel.update(updateData, { where: { id : transactions_id} }).then ((updateTransaction) => {
        if (!updateTransaction || updateTransaction == 0) {
            return res.send (400 , {
                message : "error"
            });
        }
        res.status(200).send({ message: "Update transaction details:" + transactions_id });
    })
}
// Comments authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};