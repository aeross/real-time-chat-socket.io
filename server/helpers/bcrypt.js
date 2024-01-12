const bcrypt = require("bcryptjs");

function hashPassword(password) {
    return bcrypt.hashSync(password);
}

function comparePasswordWithHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, comparePasswordWithHash }