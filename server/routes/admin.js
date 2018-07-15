var express = require("express");
var adminRouter = express.Router();

// Import admin controller
var accountController = require("../controllers/accountController");

// Setup admin routes
adminRouter.get("/admin", accountController.hasAuthorization, accountController.list);
adminRouter.get("/admin/edit/:id", accountController.hasAuthorization, accountController.editAccount);
adminRouter.post("/new", accountController.hasAuthorization,accountController.insert);
adminRouter.post("/admin/edit/:id", accountController.hasAuthorization, accountController.update);
adminRouter.delete("/admin/:id", accountController.hasAuthorization, accountController.delete);

module.exports = adminRouter;