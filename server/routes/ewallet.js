var express = require("express");
var ewalletRouter = express.Router();

// Import ewallet controller
var ewallet = require('../controllers/contacts');
var balances = require('../controllers/balances');
var transactions = require('../controllers/transactions');

// Setup ewallet routes
// ewalletRouter.get("/ewallet", ewallet.hasAuthorization, ewallet.list);
ewalletRouter.post("/ewallet", ewallet.hasAuthorization, ewallet.create);
ewalletRouter.delete("/ewallet/:contacts_id", ewallet.hasAuthorization, ewallet.delete);

// Balances Routes
ewalletRouter.get("/ewallet", balances.hasAuthorization, balances.list);
ewalletRouter.post("/ewalletBalance", balances.hasAuthorization, balances.create);

// Transaction Routes
ewalletRouter.post("/ewalletSendMoney", transactions.hasAuthorization, transactions.create);
ewalletRouter.get("/transactions", transactions.list);

module.exports = ewalletRouter;