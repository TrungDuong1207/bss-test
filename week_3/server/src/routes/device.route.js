const DeviceController = require ("../controllers/device.controller")
const Router = require('koa-router');

const deviceRoutes = new Router();

deviceRoutes.get("/", ctx => DeviceController.getDevices(ctx));
deviceRoutes.post("/", ctx => DeviceController.createDevices(ctx));
deviceRoutes.post("/", ctx => DeviceController.filterDevices(ctx));


module.exports = deviceRoutes;
