var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;
NotificationsModel = require('../models/notifications');
var moment = require('moment');

// Render Notification
exports.create = function (req, res) {
    var notificationData = {
        msg: req.body.msg,
        buyerUsername: req.body.buyerUsername,
        username: req.user.username
    }

    NotificationsModel.create(notificationData).then((newNotification, created) => {

        if (!newNotification) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/offers');
    })
}
exports.list = function (req, res) {
    NotificationsModel.findAll({
        attributes: ['id', 'msg', 'username', 'buyerUsername', 'createdAt'],
        where: {buyerUsername: req.user.username}
    }).then(function (notification) {
        res.render('notifications', {
            title: "Adamire - Notification",
            notificationList: notification,
            urlPath: req.protocol + "://" + req.get("host") + req.url,
            moment: moment
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};
exports.delete = function (req, res) {
    var record_num = req.params.notification_id;
    console.log("deleting notifications " + record_num);
    NotificationsModel.destroy({where: {id: record_num}}).then((deletedNotification)=> {
        if (!deletedNotification) {
            return res.send(400, {
                message: "error"
            });
        }

        res.status(200).send({ message: "Deleted notification :" + record_num});
    })
}
// Notification authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};