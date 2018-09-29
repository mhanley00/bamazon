// ______________________________________________________________________________
// DEPENDENCIES - npm packages + API keys
// -----–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var mysql = require("mysql");
var inquirer = require("inquirer");
var express = require("express"); //don't know if I need this but just in case


// ______________________________________________________________________________
// MYSQL - database connection
// -----–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // call functions here
});

// ______________________________________________________________________________
// EXPRESS - server setup
// -----–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
var app = express(); //we're making an express server
var PORT = process.env.PORT || 3000;

// don't think I need this part
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// ______________________________________________________________________________
//LISTENER - start server
// -----–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });