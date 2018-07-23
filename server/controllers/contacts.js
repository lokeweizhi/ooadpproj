// get contacts model
var ContactModel = require('../models/contacts');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;

// Create Contacts
exports.create = function (req, res) {
    console.log("creating contacts")

    var contactData = {
        contactName: req.body.contactName,
        username: req.user.username
    }

    ContactModel.create(contactData).then((newContact, created) => {

        if (!newContact) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/ewallet');
    })
}
// delete contacts
exports.delete = function (req, res) {
    var record_num = req.params.contacts_id;
    console.log("deleting comments " + record_num);
    ContactModel.destroy({where: {id: record_num}}).then((deletedContact)=> {
        if (!deletedContact) {
            return res.send(400, {
                message: "error"
            });
        }

        res.status(200).send({ message: "Deleted comments :" + record_num});
    })
}

// Comments authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};