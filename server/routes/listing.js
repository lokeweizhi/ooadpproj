var express = require("express");
var listingRouter = express.Router();

var auth = require('../controllers/auth');

listingRouter.get("/listing", auth.list);
listingRouter.get("/listingedit/:id", auth.editRecord);
listingRouter.post("/listingnew", auth.insert);
listingRouter.post("/listingedit/:id", auth.update);
listingRouter.delete("/listing/:id", auth.delete);

module.exports = listingRouter;