var express = require('express');
var indexRouter = express.Router();

// Import home controller
var index = require('../controllers/index');

indexRouter.get('/', index.show);

module.exports = indexRouter;