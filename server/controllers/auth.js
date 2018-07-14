// get gravatar icon from email
var gravatar = require('gravatar');
var passport = require('passport');

// Signin GET
exports.signin = function(req, res) {
    // List all Users and sort by Date
    res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
};
// Signup GET
exports.signup = function(req, res) {
    // List all Users and sort by Date
    res.render('signup', { title: 'Signup Page', message: req.flash('signupMessage') });

};

// Logout function
exports.logout = function () {
    req.logout();
    res.redirect('/');
};

// check if user is logged in
exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};


//=================================================================================================================================================
//list all the student recs in db
var ListingModel = require('../models/listingModel');
var myDatabase = require('./database');
var sequelizeInstance = myDatabase.sequelizeInstance;

exports.list = function (req, res) {
    ListingModel.findAll({
        attributes: ['id', 'name', 'group', 'hobby']
    }).then(function (listings) {
        res.render('listing', {
            title: "Listings",
            itemList: listings,
            urlPath: req.protocol + "://" + req.get("host") + req.url
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};
exports.insert = function (req, res) {
    console.log("****************req.body.name: "+req.body.name);
    var listingData = {
        name: req.body.name,
        group: req.body.group,
        hobby: req.body.hobby,
        by: req.user.username
    }
    ListingModel.create(listingData).then((newRecord, created) => {
        if (!newRecord) {
            return res.send(400, {
                message: "error"
            });
        }
        
    }).then(function(){
        res.redirect('/listing');
    })
};

//list one specific student record from database
exports.editRecord = function (req, res) {
    var record_num = req.params.id;
    ListingModel.findById(record_num).then(function (ListingRecord) {
        res.render('editRecord', {
            title: "Edit Listings",
            item: ListingRecord,
            hostPath: req.protocol + "://" + req.get("host")
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};

//update record in db
exports.update = function (req, res) {
    console.log("update reached")
    var record_num = req.params.id;
    var updateData = {
        name: req.body.name,
        group: req.body.group,
        hobby: req.body.hobby
    }
    console.log(updateData)
    ListingModel.update(updateData, { where: { id: record_num } }).then((updatedRecord) => {
        console.log(updatedRecord)
        if (!updatedRecord || updatedRecord == 0) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({ message: "Updated listing: " + record_num});
    })
}

//delete a record 
exports.delete = function (req, res) {
    var record_num = req.params.id;
    console.log("deleting " + record_num);
    ListingModel.destroy({ where: { id: record_num } }).then((deleteRecord) => {
        if (!deleteRecord) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({ message: "Deleted Listing: " + record_num });
    });
}