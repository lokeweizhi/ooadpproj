var express = require("express");
var ewalletRouter = express.Router();

// Import ewallet controller
var ewallet = require('../controllers/contacts');

// Setup ewallet routes
ewalletRouter.get("/ewallet", ewallet.hasAuthorization, ewallet.list);
ewalletRouter.post("/ewallet", ewallet.hasAuthorization, ewallet.create);
ewalletRouter.delete("/ewallet/:contacts_id", ewallet.hasAuthorization, ewallet.delete);

module.exports = ewalletRouter;