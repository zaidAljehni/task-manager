const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User");
const { decodeJwt } = require("../utils");
require("dotenv").config();

const authenticate = async (request, response, next) => {
    try {
        const jwt = request.cookies["jwt"];
        if (!jwt) {
            throw Error("Not authorized to access this url");
        }

        decodedToken = decodeJwt(jwt);
        if (!decodedToken) {
            throw Error("Not authorized to access this url");
        }
        const user = await User.findById(decodedToken["userId"]);
        request.user = user;
        next();
    } catch (error) {
        response.status(403).json({ message: error.message });
    }
}

module.exports = authenticate;