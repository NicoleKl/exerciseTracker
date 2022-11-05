var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "src/databases/users/users-db.sqlite";

let usersDB = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw Error("Cannot open database");
  } else {
    console.log("Connected to the SQLite database.");
    usersDB.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE
        )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = "INSERT INTO user (name) VALUES (?)";
          usersDB.run(insert, ["admin"]);
        }
      }
    );
  }
});

module.exports = usersDB;
