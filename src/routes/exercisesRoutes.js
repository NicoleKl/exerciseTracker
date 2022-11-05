const express = require("express");
const app = express();
const exercisesController = require("../controllers/exercisesController");

app.post("/:_id/exercises", exercisesController.addExercise);
app.get("/:_id/logs", exercisesController.getExercisesForUser);
module.exports = app;
