class ErrorHandler {
    // not my errors
    static #sequelizeValidation = "SequelizeValidationError";
    static #sequelizeUnique = "SequelizeUniqueConstraintError";
    static #JSONWebToken = "JsonWebTokenError";

    // my errors
    static InvalidNullOrEmpty = "InvalidNullOrEmptyError";
    static InvalidCredentials = "InvalidCredentialsError";
    static InvalidToken = "InvalidTokenError";
    static DataNotFound = "DataNotFoundError";

    static handle(error, _req, res, _next) {
        console.log(error);
        let status = 500;
        let msg = "internal server error";

        // 400
        if (
            error.name === ErrorHandler.#sequelizeValidation ||
            error.name === ErrorHandler.#sequelizeUnique
        ) {
            status = 400;
            msg = error.errors.map((e) => e.message);
        }
        if (error.message === ErrorHandler.InvalidNullOrEmpty) {
            status = 400;
            msg = "input must not be empty";
        }

        // 401
        if (error.message === ErrorHandler.InvalidCredentials) {
            status = 401;
            msg = "invalid credentials";
        }
        if (
            error.name === ErrorHandler.#JSONWebToken || 
            error.message === ErrorHandler.InvalidToken
        ) {
            status = 401;
            msg = "invalid token";
        }

        // 404
        if (error.message === ErrorHandler.DataNotFound) {
            status = 404;
            msg = "not found";
        }

        res.status(status).json({ message: msg });
    }
}

module.exports = ErrorHandler;
