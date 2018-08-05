var express = require("express");
var offersRouter = express.Router();

var offers = require('../controllers/offers');
var notifications = require('../controllers/notifications');

offersRouter.get("/offers", offers.hasAuthorization, offers.list);
offersRouter.post("/offers", (req, res)=> {
    var type = req.body.type;
    var reply = {
        message: ""
    };
    switch(type) {
        case 1: {
            reply.message = "Your offer has been accepted";
            res.send(reply);
            break;
        }
        case 2: {
            reply.message = "Your offer has been rejected";
            res.send(reply);
            break;
        }
        default: {
            reply.message = "No such type";
            res.status(400).send(reply);
        }
    }
})
offersRouter.post("/newNotification", notifications.create);
offersRouter.delete("/offers/:offers_id", offers.hasAuthorization, offers.delete);

module.exports = offersRouter;
