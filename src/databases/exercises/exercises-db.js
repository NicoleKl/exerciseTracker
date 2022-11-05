var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "src/databases/exercises/exercises-db.sqlite";

let exercisesDB = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    throw Error("Cannot open database");
  } else {
    exercisesDB.run(
      `CREATE TABLE exercise (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            description TEXT,
            duration INTEGER,
            date TEXT
        )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO exercise (userId, description, duration, date) VALUES (?,?,?,?)";
          exercisesDB.run(insert, ["2", "to do", "30", "2022-10-15"]);
        }
      }
    );
  }
});

module.exports = exercisesDB;
