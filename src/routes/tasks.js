const { Router } = require("express");
const asyncWrapper = require("../middlewares/asyncWrapper");
const Task = require("../models/Task");

const tasksRouter = Router();

tasksRouter.get("/", asyncWrapper(
    async (request, response) => {
        const tasks = await Task.find({ "user": request.user._id });
        return response.json({ tasks });
    }
));

tasksRouter.get("/:id", asyncWrapper(
    async (request, response) => {
        const { id: taskId } = request.params;
        const task = await Task.findOne({ "_id": taskId, "user": request.user._id });

        if (!task) {
            return response.status(404).json({ message: "No task with the specified ID: " + taskId })
        }

        return response.json({ task });
    }
));

tasksRouter.post("/", asyncWrapper(
    async (request, response) => {
        const { name, completed } = request.body;
        const task = await Task.create({ name, completed, user: request.user });
        return response.json({ task });
    }
));

tasksRouter.patch("/:id", asyncWrapper(
    async (request, response) => {
        const taskId = request.params.id;
        const { name, completed } = request.body;
        const task = await Task.findOneAndUpdate({ "_id": taskId, "user": request.user._id }, { name, completed });
        return response.json({ task });
    }
));

tasksRouter.delete("/:id", asyncWrapper(
    async (request, response) => {
        const taskId = request.params.id;
        const task = await Task.findOneAndDelete({ "_id": taskId, "user": request.user._id });

        if (!task) {
            return response.status(404).json({ message: "No task with the specified ID: " + taskId })
        }

        return response.json({ task });
    }
));

module.exports = tasksRouter;