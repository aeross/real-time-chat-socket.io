const { comparePasswordWithHash } = require("./helpers/bcrypt");
const { encode } = require("./helpers/jwt");
const ErrorHandler = require("./middlewares/error");
const { User } = require("./models/index");
const { Op } = require("sequelize");

class Controller {
    static async register(req, res, next) {
        try {
            const { username, password } = req.body;
            console.log(username, password);

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
            const token = encode({ id: user.id, username, password });

            return res.status(200).json({
                message: "Success - login",
                token
            })
        } catch (error) {
            next(error);
        }
    }

    static async getCurrentUser(req, res, next) {
        try {
            return res.status(200).json(req.loginInfo);
        } catch (error) {
            next(error);
        }
    }

    static async getUsers(req, res, next) {
        try {
            // find all users except the currently logged in user
            const users = await User.findAll({
                where: { 
                    id: { [Op.not]: req.loginInfo.userId } 
                },
                attributes: { exclude: ["password"] } 
            });
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getUser(req, res, next) {
        try {
            // find user by id
            const id = req.params.id;
            const user = await User.findOne({ 
                where: { id },
                attributes: { exclude: ["password"] },
            });
            if (!user) {
                throw new Error(ErrorHandler.DataNotFound);
            }

            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;