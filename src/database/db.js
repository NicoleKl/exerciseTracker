var sqlite3 = require("sqlite3").verbose();

const DBSOURCE =
  process.env.NODE_ENV === "test"
    ? "src/database/test-db.sqlite"
    : "src/database/db.sqlite";

let DB = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw Error("Cannot open database");
  } else {
    DB.run(
      `CREATE TABLE IF NOT EXISTS exercise (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            description TEXT,
            duration INTEGER,
            date TEXT
        )`
    );
    DB.run(
      `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE
        )`
    );
  }
});

module.exports = DB;
