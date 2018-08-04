// var AccountModel = require('../models/accountModel'); // don't need this bc we only need to retrieve data FROM the login page.
var UsersModel = require('../models/users');
var myDatabase = require('./database');
var reviews = require('../models/reviewsModel');
var sequelizeInstance = myDatabase.sequelizeInstance;

//Add a new account to the database
exports.insert = function (req,res) {
    var accountData = {
        accountType: "User",
        username: req.body.username,
        imageName: "default-avatar.png",
        password: req.body.password,
        email: req.body.email,
        // dateofbirth: req.body.dateofbirth,
        // -- What I added:(delete if you dw the extra codes)
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        gender: req.body.gender
    }
    var reviewsData = { // added this for my individual reviews
        username: req.body.username,
        imageName: "default-avatar.png",
        averageSellerRating: 0,
        totalServiceRatings: 0,
        totalPriceRatings: 0,
        averageBuyerRating: 0,
        verificationStatus: "nope"
    }
    // AccountModel.create(accountData).then((newAccount, created) => {
    reviews.create(reviewsData).then((newReview, created) => {
        UsersModel.create(accountData).then((newAccount, created) => {
            if (!newAccount) {
                return res.send(400, {
                    message: "error"
                });
            }
            res.redirect('/admin');
        })
    })
};

//List all the student records in database
exports.list = function(req,res) {
    // AccountModel.findAll({
    //     attribute: ['id','username','password','email','dateofbirth']
    UsersModel.findAll(// UsersModel retrieves data from the signup table; the one that you were using(AccountModel) is to retrieve data from a NEW table(no relationship with the signup/login table so it is not usable)
        { where: { accountType: 'User' } }, // To only list out 'User' account and not 'Admin'
        { attribute: ['id','firstName','lastName','username','email','phoneNumber','location', 'gender','password' ]
    }).then (function (accounts) {
        res.render('Admin', {
            title: "Admin Page - Account Management",
            itemList: accounts,
            urlPath : req.protocol + "://" + req.get ("host") + req.url
        });
    }).catch ((err) => {
        return res.status(400).send ({
            messager: err
        });
    });
};

//list one specific student record from database
exports.editAccount = function (req,res) {
    var record_num = req.params.id;
    // AccountModel.findById(record_num).then(function (accountRecord) {
    UsersModel.findById(record_num).then(function (accountRecord) {
        res.render('editAccount' , {
            title: "Admin page - Edit Account Information",
            item: accountRecord,
            hostPath: req.protocol + "://" + req.get("host") + "/admin"
        });
    }).catch((err) => {
        return res.status(400).send({
            message : err
        });
    });
};

//update student record in database
exports.update = function (req,res) {
    var record_num = req.params.id;
    var updateData = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        // dateofbirth : req.body.dateofbirth <--- No dateofbirth in models/user Table
    }
    // AccountModel.update(updateData, { where: { id : record_num} }).then ((updateAccount) => {
    UsersModel.update(updateData, { where: { id : record_num} }).then ((updateAccount) => {
        if (!updateAccount || updateAccount == 0) {
            return res.send (400 , {
                message : "error"
            });
        }
        res.status(200).send({ message: "Update account details:" + record_num });
    })
}

//delete a student record from the database
exports.delete = function (req,res) {
    var record_num = req.params.id;
    console.log("deleting " + record_num);
    // AccountModel.destroy({ where: {id: record_num } }).then((deletedAccount) => {
    UsersModel.destroy({ where: {id: record_num } }).then((deletedAccount) => {
        if (!deletedAccount) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({ message: "Delete Account:" +record_num });
    });
}

// Settings authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};