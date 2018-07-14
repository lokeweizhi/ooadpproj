var express = require("express");
var adminRouter = express.Router();

// Import admin controller
var accountController = require("../controllers/accountController");

// Setup admin routes
adminRouter.get("/admin", accountController.list);
adminRouter.get("/admin/edit/:id", accountController.editAccount);
adminRouter.post("/new", accountController.insert);
adminRouter.post("/admin/edit/:id", accountController.update);
adminRouter.delete("/admin/:id", accountController.delete);

module.exports = adminRouter;