const jsonwebtoken = require("jsonwebtoken");
const { JWT_MAX_AGE_SECONDS } = require("../constants");
require("dotenv").config();

const generateJwt = (userId) => {
    return jsonwebtoken.sign({ userId },
        process.env.JWT_SECRET || "test",
        { expiresIn: JWT_MAX_AGE_SECONDS }
    );
}

const decodeJwt = (jwt) => {
    return jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
}

module.exports = {
    generateJwt,
    decodeJwt
}