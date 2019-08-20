// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "fnx6frzmhxw45qcb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "ro571fjz4ymc534q",
  password: "px4npuzk03ot5qme",
  database: "f5l76euw1k6c1zvo"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
