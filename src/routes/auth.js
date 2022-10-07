const { Router } = require("express");
const { JWT_MAX_AGE_MILLISECONDS } = require("../constants");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/User");
const { generateJwt } = require("../utils");

const authRouter = Router();

authRouter.post("/login", asyncWrapper(
    async (request, response) => {
        const { email, password } = request.body;
        const userId = await User.login(email, password);
        const jwt = generateJwt(userId);
        response.cookie("jwt", jwt, { httpOnly: true, maxAge: JWT_MAX_AGE_MILLISECONDS });
        return response.json({ userId });
    }
));

authRouter.post("/signup", asyncWrapper(
    async (request, response) => {
        const { email, password } = request.body;
        const userId = await User.signup(email, password);
        const jwt = generateJwt(userId);
        response.cookie("jwt", jwt, { httpOnly: true, maxAge: JWT_MAX_AGE_MILLISECONDS });
        return response.status(201).json({ userId });
    }
));

authRouter.post("/logout", asyncWrapper(
    (request, response) => {
        response.cookie("jwt", "", { maxAge: 1 });
        return response.json({ message: "Logged out successfully." });
    }
));

module.exports = authRouter;