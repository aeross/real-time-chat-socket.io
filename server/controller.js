const { comparePasswordWithHash } = require("./helpers/bcrypt");
const { encode } = require("./helpers/jwt");
const ErrorHandler = require("./middlewares/error");
const { User } = require("./models/index");

class Controller {
    static async register(req, res, next) {
        try {
            const { username, password } = req.body;

            // create new user
            await User.create({ username, password });

            return res.status(201).json({
                message: "Success - registered new user"
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body;

            // verify username
            const user = await User.findOne({ where: { username } });
            if (!user) throw new Error(ErrorHandler.InvalidCredentials);

            // verify password
            const isValidPassword = comparePasswordWithHash(password, user.password);
            if (!isValidPassword) throw new Error(ErrorHandler.InvalidCredentials);

            // encode token
            const token = encode({ username, password });

            return res.status(200).json({
                message: "Success - login",
                token
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;