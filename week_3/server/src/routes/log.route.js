const LogController = require ("../controllers/log.controller")
const Router = require('koa-router');

const logRoutes = new Router();

logRoutes.get("/", ctx => LogController.getLogs(ctx));


module.exports = logRoutes;
