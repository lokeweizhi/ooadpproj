// Import modules
var gravatar = require('gravatar');

var UsersModel = require('../models/users');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;


// List Settings
exports.list = function (req, res) {
    // var login = (req.session.passport) ? req.session.passport.user : false;
    res.render('settings', {
        title: "Adamire - Settings",
        webTitle: "SETTINGS",
        user : req.user,
        avatar: gravatar.url(req.user.email ,  {s: '100', r: 'x', d: 'retro'}, true),
        hostPath: req.protocol + "://" + req.get("host")
        // req.protocol = http
        // req.get("host"): localhost:3000
        // req.url: /edit/2
    });
};

exports.update = function(req,res) {
    var record_num = req.user.id
    var updateData = {
        // firstName, lastName, email, phoneNumber, password, aboutMe, location, gender
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

// Settings authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};