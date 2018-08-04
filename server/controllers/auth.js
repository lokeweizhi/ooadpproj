// get gravatar icon from email
var fs = require('fs');
var mime = require('mime');
var gravatar = require('gravatar');
var passport = require('passport');
//set image file types
var IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

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
var fs = require('fs');
var mime = require('mime');
// set image file types
var IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

exports.list = function (req, res) {
    ListingModel.findAll({
        attributes: ['id', 'name', 'group', 'hobby', 'category']
    }).then(function (listings) {
        res.render('listing', {
            title: "Listings",
            hostPath: req.protocol + "://" + req.get("host"),
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
    var src;
    var dest;
    var targetPath;
    var tempPath = req.file.path;
    console.log("req.file.path*****************************",tempPath);
    // get the mime type of the file
    var type = mime.lookup(req.file.mimetype);
    // get the file extension
    var extension = req.file.path.split(/[. ]+/).pop();
    // check support file types
    if (IMAGE_TYPES.indexOf(type) == -1) {
        return res.status(415).send('Supported image formats: jpeg, jpg, jpe, png.');
    }
    // Set new path to images
    targetPath = './public/images/itemImage/' + req.file.originalname;
    // using read stream API to read the file
    src = fs.createReadStream(tempPath);
    // using a write stream API to write file
    dest = fs.createWriteStream(targetPath);
    src.pipe(dest);

    // Show error
    src.on('error', function(err) {
        if (err) {
            return res.status(500).send({
                message: error
            });
        }
    });

    // Save file process
    src.on('end', function() {
        var listingData = {
            name: req.body.name,
            itemImage: req.file.originalname,
            group: req.body.group,
            hobby: req.body.hobby,
            category: req.body.category,
            by: req.user.username,
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
        fs.unlink(tempPath, function (err) {
            if (err) {
                return res.status(500).send('Something bad happened here');
            }
            res.redirect('listing');
        });
    });
};

//list one specific student record from database
exports.editRecord = function (req, res) {
    var record_num = req.params.id;
    ListingModel.findById(record_num).then(function (ListingRecord) {
        res.render('editRecord', {
            title: "Edit Listings",
            itemList: ListingRecord,
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
        hobby: req.body.hobby,
        category: req.body.category
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

//listing one specific record
exports.listRecord = function (req, res) {
    var record_num = req.params.id;
    
    ListingModel.findById(record_num).then(function (ListingRecord) {
        res.render('individualListing', {
            title: "Listing",
            // item: ListingRecord,
            // itemList: ListingRecord,
            hostPath: req.protocol + "://" + req.get("host")
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};

exports.listRecord = function (req, res) {
    var record_num = req.params.id;
    ListingModel.findById(record_num).then(function (ListingRecord) {
        console.log(ListingRecord)
        res.render('indivlisting', {
            title: "Listings",
            itemList: ListingRecord,
            hostPath: req.protocol + "://" + req.get("host")
        });
    }).catch((err) => {
        return res.status(400).send({
            message: err
        });
    });
};

exports.dispform = function (req, res) {
    ListingModel.findAll({
        attributes: ['id', 'name', 'group', 'hobby']
    }).then(function (listings) {
        res.render('createlisting', {
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

exports.searchThru = function(req, res) {
    var itemName = '%' + req.params.name + '%';
    sequelizeInstance.query('SELECT * FROM listings WHERE name LIKE :name',
{
    replacements: { name: itemName}, type: sequelizeInstance.QueryTypes.SELECT
}).then(listings => {
    console.log(listings)
    res.render('listing', {
        title: "Searched Listings",
        itemList: listings,
        urlPath: req.protocol + "://" + req.get("host") + "/listing"
    });
})
}

exports.searchPrice = function(req, res) {
    var price = req.body.minAmount + " and " + req.body.maxAmount;
    sequelizeInstance.query('SELECT * FROM listings WHERE price between :price',
{
    replacements: { price: price }, type: sequelizeInstance.QueryTypes.SELECT
}).then(listings => {
    console.log(listings)
    res.render('listing', {
        title: "Searched Listings",
        itemList: listings,
        urlPath: req.protocol + "://" + req.get("host") + "/listing"
    });
})
}
