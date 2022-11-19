const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

const usersRouter = require("./src/routes/usersRoutes");
const exercisesRouter = require("./src/routes/exercisesRoutes");
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.use("/api/users", usersRouter);
app.use("/api/users", exercisesRouter);

module.exports = app;
