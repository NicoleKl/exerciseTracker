const dateIsValid = require("./dateValidation");

const inputValidation = {
  userIdIsValid: (userId) => {
    return !(Number.isNaN(userId) || userId <= 0);
  },
  descriptionIsValid: (desc) => {
    return !(desc.length < 3);
  },
  durationIsValid: (duration) => {
    return !(Number.isNaN(duration) || duration <= 0);
  },
  limitIsValid: (limit) => {
    return !(Number.isNaN(limit) || limit <= 0);
  },
};

const exerciseValidation = {
  addingExercise: ([userId, description, duration, date]) => {
    if (!inputValidation.userIdIsValid(userId)) return "invalid user id";
    if (!inputValidation.descriptionIsValid(description))
      return "description should be longer";
    if (!inputValidation.durationIsValid(duration)) return "invalid duration";
    if (!dateIsValid(date)) return "invalid date";

    return "success";
  },
  gettingExercises: (data) => {
    if (!inputValidation.userIdIsValid(data.userId)) return "invalid user id";
    if (data.from && !dateIsValid(data.from)) return "invalid 'from' date";
    if (data.to && !dateIsValid(data.to)) return "invalid 'to' date";
    if (!inputValidation.limitIsValid(data.limit))
      return "invalid limit";

    return "success";
  }
};

module.exports = exerciseValidation;
