const exercisesDB = require("../databases/exercises/exercises-db");

const exerciseModel = {
  addExercise: (params, callback) => {
    const sql =
      "INSERT INTO exercise (userId, description, duration, date) VALUES (?,?,?,?)";

    exercisesDB.run(sql, params, function (err) {
      return callback(err, this.lastID);
    });
  },
  getExercises: (data, callback) => {
    const fromSql =
      (data.from && data.from.length > 0) ? `AND date >= ? ` : "";
    const toSql = (data.to && data.to.length > 0) ? `AND date <= ? ` : "";
    const limitSql = (data.limit && data.limit.length > 0) ? `LIMIT ? ` : "";

    const params = Object.values(data).filter(x => x !== "");
    const sqlCount =
      "SELECT COUNT(*) as cct FROM exercise WHERE userId = ? " +
      fromSql +
      toSql;
     
    let exerciseCount = 0;
    exercisesDB.get(sqlCount, params, (_, count) => {
      exerciseCount = count.cct;
    });

    const sqlEx =
      "SELECT * FROM exercise WHERE userId = ? " +
      fromSql +
      toSql +
      "ORDER BY date ASC " +
      limitSql;    
    
    exercisesDB.all(sqlEx, params, (err, rows) => {
      return callback(err, [rows, exerciseCount])
    });
  }
};

module.exports = exerciseModel;
