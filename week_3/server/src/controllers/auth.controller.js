const jwt = require ("jsonwebtoken");

class AuthController {
    async login(ctx) {
        try {
            let user = ctx.request.body;
            if (user.username === "john" && user.password === "1234") {
                let payload = {
                    userName: user.username,
                    password: user.password
                }
                
                const token = jwt.sign(payload, '123456789', {
                    expiresIn: "1y",
                });
 
                ctx.status = 200; 
                ctx.body = { success: true, token };
            } else {
                ctx.status = 401; // Unauthorized
                ctx.body = { success: false, message: "Incorrect username or password" };
            }
        } catch (e) {
            ctx.status = 500; // Internal Server Error
            ctx.body = { success: false, message: e.message };
        }

    }
}

module.exports = new AuthController();