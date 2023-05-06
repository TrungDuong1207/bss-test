const jwt = require("jsonwebtoken");

async function verifyAccessToken(ctx, next) {
  try {
    const authHeader = ctx.request.headers.authorization;
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    const decoded = await jwt.verify(token, "123456789");
    ctx.state.user = decoded;
    return await next();
  } catch (err) {
    ctx.throw(401, err.message);
  }
}

module.exports = verifyAccessToken ;
