var express = require('express');
var CollectionController = require('../controllers/collection.controller.js');

var collectionRoutes = express.Router();

collectionRoutes.get("/", CollectionController.getCollections);

module.exports = collectionRoutes;
