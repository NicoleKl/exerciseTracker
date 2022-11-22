const exerciseModel = require("../models/exerciseModel");
const userModel = require("../models/userModel");
const exerciseValidation = require("../validators/exerciseValidation");

const response = require("./utils");

const exercisesController = {
  addExercise: (req, res) => {
    const userId = Number(req.params._id),
      description = req.body.description || "",
      duration = Number(req.body.duration),
      date = req.body.date || new Date().toISOString().split("T")[0];

    const params = [userId, description, duration, date];
    const exerciseValidationResult = exerciseValidation.addingExercise(params);

    if (exerciseValidationResult !== "success") {
      return response.errorResponse(res, 400, exerciseValidationResult);
    }

    userModel.findUserById(userId, (rows) => {
      if (rows.length === 0) {
        return response.errorResponse(
          res,
          404,
          `there is no user with ID ${userId}`
        );
      } else {
        exerciseModel.addExercise(params, (err, exId) => {
          return err
            ? response.errorResponse(res, 400, err.message)
            : response.successResponse(res, {
                userId,
                exerciseId: exId,
                description,
                duration,
                date,
              });
        });
      }
    });
  },
  getExercisesForUser: (req, res) => {
    const reqData = {
      userId: Number(req.params._id),
      from: req.query.from,
      to: req.query.to,
      limit: Number(req.query.limit),
    };

    const inputValidationResult = exerciseValidation.gettingExercises(reqData);
    if (inputValidationResult !== "success") {
      return response.errorResponse(res, 400, inputValidationResult);
    }

    userModel.findUserById(reqData.userId, (rows) => {
      if (rows.length === 0) {
        return response.errorResponse(
          res,
          404,
          `there is no user with ID ${reqData.userId}`
        );
      } else {
        exerciseModel.getExercises(reqData, (err, [rows, count]) => {
          if (err) {
            return response.errorResponse(res, 400, err.message);
          } else if (rows.length === 0) {
            return response.errorResponse(
              res,
              404,
              "there is no exercises for this user"
            );
          }
          return response.successResponse(res, { logs: rows, count });
        });
      }
    });
  },
};

module.exports = exercisesController;
