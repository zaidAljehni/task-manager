const { Router } = require("express");
const { JWT_MAX_AGE_MILLISECONDS } = require("../constants");
const User = require("../models/User");
const { generateJwt } = require("../utils");

const authRouter = Router();

authRouter.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body;
        const userId = await User.login(email, password);
        const jwt = generateJwt(userId);
        response.cookie("jwt", jwt, { httpOnly: true, maxAge: JWT_MAX_AGE_MILLISECONDS });
        return response.json({ userId });
    } catch (exception) {
        return response.status(500).json({ message: exception.message });
    }
});

authRouter.post("/signup", async (request, response) => {
    try {
        const { email, password } = request.body;
        const userId = await User.signup(email, password);
        const jwt = generateJwt(userId);
        response.cookie("jwt", jwt, { httpOnly: true, maxAge: JWT_MAX_AGE_MILLISECONDS });
        return response.status(201).json({ userId });
    } catch (exception) {
        return response.status(500).json({ message: exception.message });
    }
});

authRouter.post("/logout", (request, response) => {
    response.cookie("jwt", "", { maxAge: 1 });
    response.json({ message: "Logged out successfully." });
})

module.exports = authRouter;