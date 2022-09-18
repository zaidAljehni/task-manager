const express = require("express");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/tasks");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", authRouter);
app.use("/api/tasks", tasksRouter);


const start = () => {
    connectDB(process.env.DB_URI)
    .then(() => {
        console.log("Connected to DB...");
        app.listen(process.env.PORT, console.log(`Server is up and running on port ${process.env.PORT}...`));
    })
    .catch((error) => {
        console.error("FAILED to start the server...");
        console.error(error.message);
        process.exit(1);
    });
}

start();