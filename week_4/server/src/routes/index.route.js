var productRoutes = require("./product.route.js");
var collectionRoutes = require("./collection.route.js");
var tagRoutes = require("./tag.route.js");

function route(app) {
    app.use("/tags", tagRoutes);
    app.use("/products", productRoutes);
    app.use("/collections", collectionRoutes);
}

module.exports = route;