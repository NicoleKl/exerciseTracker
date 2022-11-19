const userModel = require("../models/userModel");
const userValidation = require("../validators/userValidation");
const response = require("./utils");

const usersController = {
  getAllUsers: (_, res) => {
    userModel.getAllUsers((err, rows) => {
      if (err) {
        return response.errorResponse(res, 400, err.message);
      } else {
        if(rows.length === 0) {
          return response.errorResponse(res, 400, "users not found");
        } else {
          return response.successResponse(res, rows);
        }
      }
    });
  },
  addUser: (req, res) => {
    const username = req.body.username;
    if (!userValidation.usernameIsValid(username)) {
      return response.errorResponse(res, 400, "username invalid");
    }

    userModel.addUser(username, (err, lastId) => {
      if (err) {
        return err.errno === 19
          ? response.errorResponse(
              res,
              403,
              "user with this name already exists"
            )
          : response.errorResponse(res, 400, err.message);
      } else {
        return response.successResponse(res, {
          id: lastId,
          username,
        });
      }
    });
  }
};

module.exports = usersController;