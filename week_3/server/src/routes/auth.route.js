const AuthController = require ("../controllers/auth.controller")
const Router = require('koa-router');

const authRoutes = new Router();

authRoutes.post("/login",   ctx => AuthController.login(ctx));

module.exports = authRoutes;