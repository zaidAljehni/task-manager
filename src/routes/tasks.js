const { Router } = require("express");
const Task = require("../models/Task");

const tasksRouter = Router();

tasksRouter.get("/", async (request, response) => {
    try {
        const tasks = await Task.find({ "user": request.user._id });
        return response.json({ tasks });
    } catch (exception) {
        return response.status(500).json({ message: exception });
    }
});

tasksRouter.get("/:id", async (request, response) => {
    try {
        const { id: taskId } = request.params;
        const task = await Task.findOne({ "_id": taskId, "user": request.user._id });

        if (!task) {
            return response.status(404).json({ message: "No task with the specified ID: " + taskId })
        }

        return response.json({ task });
    } catch (exception) {
        return response.status(500).json({ message: exception });
    }
});

tasksRouter.post("/", async (request, response) => {
    try {
        const { name, completed } = request.body;
        const task = await Task.create({ name, completed, user: request.user });
        return response.json({ task });
    } catch (exception) {
        return response.status(500).json({ message: exception });
    }
});

tasksRouter.patch("/:id", async (request, response) => {
    try {
        const taskId = request.params.id;
        const { name, completed } = request.body;
        const task = await Task.findOneAndUpdate({ "_id": taskId, "user": request.user._id }, { name, completed });
        return response.json({ task });
    } catch (exception) {
        return response.status(500).json({ message: exception });
    }
});

tasksRouter.delete("/:id", async (request, response) => {
    try {
        const taskId = request.params.id;
        const task = await Task.findOneAndDelete({ "_id": taskId, "user": request.user._id });

        if (!task) {
            return response.status(404).json({ message: "No task with the specified ID: " + taskId })
        }

        return response.json({ task });
    } catch (exception) {
        return response.status(500).json({ message: exception });
    }
});

module.exports = tasksRouter;