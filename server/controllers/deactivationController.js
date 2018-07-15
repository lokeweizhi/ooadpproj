var deactivationModel = require('../models/deactivationModel');
var UsersModel = require('../models/users');
var myDatabase = require('./database');
var sequelizeInstance = myDatabase.sequelizeInstance;


//List all the deactivation requests in the database
exports.list = function(req,res) {
    // AccountModel.findAll({
    //     attribute: ['id','username','password','email','dateofbirth']
    deactivationModel.findAll(// UsersModel retrieves data from the signup table; the one that you were using(AccountModel) is to retrieve data from a NEW table(no relationship with the signup/login table so it is not usable)
        { attribute: ['id','username','reason','user_id']
    }).then (function (accounts) {
        console.log("********accounts:",accounts);
        res.render('deactivationRequest', {
            title: "Admin Page - Deactivation Requests",
            itemList: accounts,
            urlPath : req.protocol + "://" + req.get ("host") + req.url
        });
    }).catch ((err) => {
        return res.status(400).send ({
            messager: err
        });
    });
};

//delete a deactivation from the database
exports.delete = function (req,res) {
    var record_num = req.params.id;
    console.log("deleting " + record_num);
    // AccountModel.destroy({ where: {id: record_num } }).then((deletedAccount) => {
    deactivationModel.destroy({ where: {id: record_num } }).then((deletedAccount) => {
        if (!deletedAccount) {
            return res.send(400, {
                message: "error"
            });
        }
        res.status(200).send({ message: "Delete Deactivation Request:" +record_num });
    });
}