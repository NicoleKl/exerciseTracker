const exercisesDB = require("../databases/exercises/exercises-db");
const testDB = require("../../tests/dbMocks/testExercises-db");

const db = process.env.NODE_ENV === "test" ? testDB : exercisesDB;

const exerciseModel = {
  addExercise: (params, callback) => {
    const sql =
      "INSERT INTO exercise (userId, description, duration, date) VALUES (?,?,?,?)";

    db.run(sql, params, function (err) {
      return callback(err, this.lastID);
    });
  },
  getExercises: (data, callback) => {
    let sql = "WHERE userId = ? ";
    let params = [data.userId];

    if(data.from && data.from.length > 0) {
      sql += `AND date >= ? `;
      params.push(data.from);
    } 
    if(data.to && data.to.length > 0) {
      sql += `AND date <= ? `;
      params.push(data.to);
    }
 
    const sqlCount = "SELECT COUNT(*) as cct FROM exercise " + sql;
    
    let exerciseCount = 0;
    db.get(sqlCount, params, (_, count) => {
      exerciseCount = count.cct;
    });
    
    sql += "ORDER BY date ASC "; 
    if (data.limit) {
      sql += `LIMIT ? `;
      params.push(data.limit);
    }
    const sqlEx = "SELECT * FROM exercise " + sql;

    db.all(sqlEx, params, (err, rows) => {
      return callback(err, [rows, exerciseCount]);
    });
  }
};

module.exports = exerciseModel;
