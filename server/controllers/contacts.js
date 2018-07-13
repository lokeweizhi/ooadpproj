// get contacts model
var ContactModel = require('../models/contacts');
var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;

// List all the contacts in database
exports.list = function (req, res) {
    // ContactModel.findAll({
    //     attributes: ['id', 'username']
     ContactModel.findAll({
        attributes: ['id', 'contactName', 'username'], 
        where:{username: req.user.username}
    }).then(function (contacts) {
        res.render('ewallet', {
            title: "Adamire - Ewallet",
            itemList: contacts,
            urlPath: req.protocol + "://" + req.get("host") + req.url,
            user: req.user
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};

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