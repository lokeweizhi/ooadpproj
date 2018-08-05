var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;

// Render Notification
exports.show = function (req, res) {
    res.render('notifications', {
        title: "Adamire - Notification",
    });
};

// Notification authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};