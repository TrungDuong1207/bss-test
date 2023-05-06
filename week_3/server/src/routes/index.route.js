const Router = require('koa-router');
const deviceRoutes = require('./device.route');
const logRoutes = require('./log.route');
const authRoutes = require('./auth.route');
const verifyAccessToken = require("../middlewares/checkAuth")
const router = new Router();

router.use("/auth", authRoutes.routes());
router.use('/devices', verifyAccessToken, deviceRoutes.routes());
router.use('/logs', verifyAccessToken, logRoutes.routes());

function route(app) {
    app.use(router.routes());
}

module.exports = route;
