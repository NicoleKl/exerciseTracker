const usersDB = require("../databases/users/users-db");

const userModel = {
    getAllUsers: (callback) => {
        usersDB.all("SELECT * FROM user", [], (err, rows) => {
          return callback(err, rows);
        });
    },
    addUser: (username, callback) => {
        const sql = "INSERT INTO user (name) VALUES (?)";

        usersDB.run(sql, [username], function (err) {
          return callback(err, this.lastID);
        });
    },
    findUserById: (userId, callback) => {
        usersDB.all("SELECT * FROM user WHERE id = ?", [userId], (err, rows) => {
            return callback(rows);
        });
    }
};

module.exports = userModel;