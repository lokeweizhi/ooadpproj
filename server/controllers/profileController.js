// Import modules
var fs = require('fs');
var mime = require('mime');
var gravatar = require('gravatar');
// set image file types
var IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// get models
var ListingModel = require('../models/listingModel');
var Profile = require('../models/profileModel');
var UsersModel = require('../models/users');
var ReviewsModel = require('../models/reviewsModel');
var ReportModel = require('../models/reportUserModel');

var myDatabase = require('./database');
var sequelize = myDatabase.sequelize;
// for date-time ejs
var moment = require('moment');
var sortBy = require('sort-by');

exports.list = function(req, res){
    Profile.findAll({
        where:{targetUsername: req.user.username}
    }).then(function(profile){
        profile = profile.sort(sortBy('-created'))
        //console.log("***********************profile",profile)
        ReviewsModel.find({
            attributes: ['id', 'averageSellerRating', 'totalServiceRatings', 'totalPriceRatings', 'averageBuyerRating','sellerCount', 'buyerCount'],
            where: {username: req.user.username}
        }).then(function(review){
            ReviewsModel.findAll({
                attributes: ['id', 'username' ,'imageName', 'averageSellerRating', 'averageBuyerRating', 'sellerCount', 'buyerCount']
            }).then(function (totalReviews) {
                //console.log("***********************totalReview",totalReviews)
                ListingModel.findAll({
                    attributes: ['id', 'name', 'group', 'hobby'],
                    where:{by: req.user.username}
                }).then(function (listings) {
                    res.render("profile", {
                        title: 'Adamire - @'+ req.user.username,
                        webTitle: 'Profile:',
                        profile: profile,
                        review: review,
                        totalReviews: totalReviews,
                        itemList: listings,
                        urlPath: req.protocol + "://" + req.get("host") + req.url,
                        user: req.user,
                        moment: moment
                    });
                })
            })

        })
    }).catch((err)=> {
        return res.status(400).send({
            message: err
        });
    });
};

exports.uploadImage = function(req,res){
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
    targetPath = './public/images/profileImages/' + req.file.originalname;
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
        var record_num = req.user.id
        var updateData = {
            imageName: req.file.originalname,
        }
        // Save to database
        UsersModel.update(updateData, { where: { id: record_num } }).then((updateRecord) => {
            if (!updateRecord || updateRecord == 0) {
                return res.send(400, {
                    message: "error"
                });
            }
            res.status(200).send({ message: "Updated settings:" + record_num});
        })
        fs.unlink(tempPath, function (err) {
            if (err) {
                return res.status(500).send('Something bad happened here');
            }
            res.redirect('profile');
        });
    });    
}


// delete reviews
exports.delete = function (req, res) {
    var record_num = req.params.profile_id;
    console.log("deleting reviews " + record_num);
    Profile.destroy({where: {id: record_num}}).then((deletedReview)=> {
        if (!deletedReview) {
            return res.send(400, {
                message: "error"
            });
        }

        res.status(200).send({ message: "Deleted reviews :" + record_num});
    })
}


// redirects to another profile page
exports.browseProfiles = function (req, res) {
    var record_username = req.params.username;
    if (record_username == req.user.username){
        res.redirect('/profile');
    }
    else{
        UsersModel.find({
            where:{username: record_username
            }}).then(function(profilesRecord){
            var username = profilesRecord.username
            Profile.findAll({
                where:{targetUsername: username}
            }).then(function(profile){
                ListingModel.findAll({
                    attributes: ['id', 'name', 'group', 'hobby'],
                    where:{by: record_username}
                }).then(function (listings) {
                    res.render('browseProfiles', {
                        title: "Adamire - @" + profilesRecord.username,
                        webTitle: "User - " + profilesRecord.username,
                        item: profilesRecord,
                        profile: profile,
                        itemList: listings,
                        urlPath: req.protocol + "://" + req.get("host") + "/profile"
                    });
                })
            }) 
        }).catch((err) => {
            return res.status(400).send({
                message: err
            });
        });
    }
};

// Create and submit request to the admin
exports.create = function (req, res) {
    var reportData = {
        username: req.body.username,
        reasons: req.body.reasons,
        by: req.user.username
    }
    ReportModel.create(reportData).then((newRequest, created) => {
        if (!newRequest) {
            return res.send(400, {
                message: "error"
            });
        }
        res.redirect('/profile');
    })
}

// Profile authorization middleware
exports.hasAuthorization = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};