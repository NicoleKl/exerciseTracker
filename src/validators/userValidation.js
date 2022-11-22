const userValidation = {
  usernameIsValid: (username) => {
    return typeof username === "string" && username.length >= 3;
  },
};

module.exports = userValidation;
