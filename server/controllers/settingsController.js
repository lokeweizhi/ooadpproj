// Import modules
var gravatar = require('gravatar');

var UsersModel = require('../models/users');
var DeactivationModel = require('../models/deactivationModel');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;


// List Settings
exports.list = function (req, res) {
    res.render('settings', {
        title: "Adamire - Settings",
        webTitle: "SETTINGS",
        user : req.user,
        avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d: 'retro'}, true),
        hostPath: req.protocol + "://" + req.get("host")
    });
};

// Update Settings
exports.update = function(req,res) {
    var record_num = req.user.id
    var updateData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        aboutMe: req.body.aboutMe,
        location: req.body.location,
        gender: req.body.gender,
    }
    UsersModel.update(updateData, { where: { id: record_num } }).then((updateRecord) => {
        if (!updateRecord || updateRecord == 0) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({ message: "Updated settings:" + record_num});
    })    
}

// Create and submit request to the admin
exports.create = function (req, res) {
    var deactivationData = {
        username: req.user.username,
        reasons: req.body.reasons,
        user_id: req.user.id
    }
    DeactivationModel.create(deactivationData).then((newRequest, created) => {
        if (!newRequest) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/settings');
    })
}

// Settings authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};