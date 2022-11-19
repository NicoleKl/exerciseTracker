var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "tests/dbMocks/testExercises-db.sqlite";

let exercisesDB = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw Error("Cannot open database");
  } else {
    exercisesDB.run(
      `CREATE TABLE IF NOT EXISTS exercise (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            description TEXT,
            duration INTEGER,
            date TEXT
        )`
    );
  }
});

module.exports = exercisesDB;