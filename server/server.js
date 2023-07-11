const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const morgan = require("morgan")
const chalk = require("chalk")
const userRoutes = require("./routes/userRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const projectRoutes = require("./routes/projectRoutes")
const taskRoutes = require("./routes/taskRoutes")
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        chalk.bgGreen.bold(tokens.method(req, res)),
        chalk.bold(tokens.status(req, res)),
        chalk.green.bold(`"${tokens.url(req, res)}"`),
        chalk.yellow("in " + tokens['response-time'](req, res) + ' ms'),
        chalk.yellow('from ' + tokens.referrer(req, res))
    ].join(' ');
})
);

app.use("/users", userRoutes)
app.use("", dashboardRoutes)
app.use("/", projectRoutes)
app.use("/", taskRoutes)

const PORT = process.env.PORT || 5000;
const MONGOOSE_URL = process.env.MONGO_URI;

mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    }))
    .catch(err => {
        console.log(err)
    })