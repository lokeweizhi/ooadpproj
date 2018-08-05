var express = require("express");
var listingRouter = express.Router();

var multer = require('multer');
<<<<<<< HEAD
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == "BundlePic") {
            cb(null, 'public/uploads/bundleCover')
        }
        else if (file.fieldname == "itemImage"){
            cb(null, 'public/uploads/itemImage')
        }

    },
    filename: (req, file, cb) => {
      cb(null,  Date.now() + '-' + file.originalname)

    }
});
var upload = multer({storage: storage});
=======
var upload = multer({ dest:'./public/uploads/', limits: {fileSize: 1500000, files:1} });

>>>>>>> e8c28ea74d46790a9b51fa7dd75c637ab33ffa10
var auth = require('../controllers/auth');
var offers = require('../controllers/offers');

listingRouter.get("/listing", auth.isLoggedIn, auth.list);
listingRouter.get("/listingedit/:id", auth.isLoggedIn, auth.editRecord);
listingRouter.get("/listing/search/:name", auth.isLoggedIn, auth.searchThru);
<<<<<<< HEAD
=======
listingRouter.get("/listing/search/price", auth.isLoggedIn, auth.searchPrice);
>>>>>>> e8c28ea74d46790a9b51fa7dd75c637ab33ffa10
listingRouter.post("/listingnew", auth.isLoggedIn, upload.single("itemImage"), auth.insert);
listingRouter.post("/listingedit/:id", auth.isLoggedIn, auth.update);
listingRouter.delete("/listing/:id", auth.isLoggedIn, auth.delete);
listingRouter.get("/listing/:id", auth.isLoggedIn, auth.listRecord);
listingRouter.post("/listing/:id", auth.isLoggedIn, offers.create);
listingRouter.get("/createlisting", auth.isLoggedIn, auth.dispform);

module.exports = listingRouter;