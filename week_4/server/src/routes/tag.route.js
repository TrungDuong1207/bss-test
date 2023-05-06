var express = require('express');
var TagController = require('../controllers/tag.controller.js');

var tagRoutes = express.Router();

tagRoutes.get("/", TagController.getTags);
tagRoutes.post("/", TagController.createTags);

module.exports = tagRoutes;
