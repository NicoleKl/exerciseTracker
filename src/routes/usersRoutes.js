const express = require("express");
const app = express();
const usersController = require("../controllers/usersController")

app.get("/", usersController.getAllUsers);

app.post("/", usersController.addUser);

module.exports = app;
