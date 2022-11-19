var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "tests/dbMocks/testUser-db.sqlite";

let usersDB = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw Error("Cannot open database");
  } else {
    console.log("Connected to the SQLite database.");
    usersDB.run(
      `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE
        )`
    );
  }
});

module.exports = usersDB;
