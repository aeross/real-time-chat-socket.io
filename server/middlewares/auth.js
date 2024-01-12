// the authentication process is via json web token
// the token is stored inside client's local storage,
// and sent to the server via req.headers
const { decode } = require("../helpers/jwt");
const { User } = require("../models/index");
const ErrorHandler = require("./error");

async function verifyLogin(req, _res, next) {
    try {
        // get access token from req.headers
        const accessToken = req.headers.token;
        if (!accessToken) throw new Error(ErrorHandler.InvalidToken);

        // decode and verify access token
        const decoded = decode(accessToken);
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) throw new Error(ErrorHandler.InvalidToken);

        // save user data
        req.loginInfo = {
            userId: decoded.id,
            username: decoded.username,
        };

        // slide to the controller
        next();
    } catch (error) {
        // slide to the error handler
        next(error);
    }
}

module.exports = verifyLogin;