const express = require("express");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT | 3000;

app.use("/", authRouter);
app.use("/api/tasks", tasksRouter);

app.listen(PORT, console.log(`Server is up and running on port ${PORT}...`))