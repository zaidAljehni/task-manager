const { Router } = require("express");
const asyncWrapper = require("../middlewares/asyncWrapper");
const Task = require("../models/Task");
const User = require("../models/User");

const accountRouter = Router();

accountRouter.delete("/", asyncWrapper(
    async (request, response) => {
        await Task.deleteMany({ "user": request.user._id });
        const user = await User.findOneAndDelete({ "_id": request.user._id });
        if (!user) {
            return response.status(404).json({ message: "No User with the specified ID: " + request.user._id })
        }

        response.cookie("jwt", "", { maxAge: 1 });
        return response.json({ message: "Deletef account successfully." });
    }
));

module.exports = accountRouter;