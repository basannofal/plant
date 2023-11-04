const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-farm",
});

conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB CONNECTED !");
  }
});

module.exports = conn;
