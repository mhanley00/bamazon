// ______________________________________________________________________________
// DEPENDENCIES - npm packages + database
// -----–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const mysql = require("mysql");
const inquirer = require("inquirer");
const express = require("express");


// ______________________________________________________________________________
// MYSQL - database connection
// -----–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // call functions here
    // console.log("pawnproducts: "+ pawnProducts);n
    showMerch(pawnProducts);

    // pawnProducts();
});

// ______________________________________________________________________________
// EXPRESS - server setup
// -----–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const app = express(); //we're making an express server
const PORT = process.env.PORT || 3000;

// don't think I need this part
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// ______________________________________________________________________________
//LISTENER - start server
// -----–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});


// * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.