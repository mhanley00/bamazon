// ______________________________________________________________________________
// DEPENDENCIES - npm packages + API keys
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

// 5. Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale. ✅

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.✅
//    * The second message should ask how many units of the product they would like to buy.✅

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

function showMerch(pawnProducts) {
    // query the database for all items being auctioned
    let query = connection.query("SELECT * FROM products",
    function(err, res) {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");
        console.log("Welcome to the Bamazon Tracksmith Popup Shop!🎽🐇🏃‍♂️");
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + 
            res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
        }
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");
        pawnProducts(); //put inside database call to make sure this code runs before pawnProducts();
        //pass function as variable
    })
    console.log(query.sql);
}

function pawnProducts() {
    let query = connection.query("SELECT * FROM products",
    function(err, res) {
        if (err) throw err;
    inquirer
      .prompt([
          {
        name: "selectItem",
        type: "input",
        message: "\nWhich expensive Tracksmith item would you like to purchase today? Please enter the id.",
        function(value) { //make sure customer enters number, from inquirer documentation
            let valid = !isNaN(parseFloat(value));
            return valid || "\nPlease enter the item id of the item you would like to purchase";
          },
          filter: Number
      },
      {
        name: "qty",
        type: "input",
        message: "\nHow many of those would you like to purchase?",
        function(value) {  //make sure customer enters number, from inquirer documentation
            let valid = !isNaN(parseFloat(value));
            return valid || "\nI'm sorry, that wasn't a number. Please enter a number.";
          },
          filter: Number    
        }
      ]).then(answers => { //trying out this arrow function thing again 🙌
            // get the information of the chosen item
            let userPurchase;
            for (let i = 0; i < res.length; i++) {
              if (res[i].product_name === answers.choice) {
                userPurchase = res[i];
                console.log(userPurchase);
              }
            }
            console.log(query.sql);

        //     // determine if bid was high enough
        //     if (userPurchase.highest_bid < parseInt(answers.bid)) {
        //       // bid was high enough, so update db, let the user know, and start over
        //       connection.query(
        //         "UPDATE auctions SET ? WHERE ?",
        //         [
        //           {
        //             highest_bid: answers.bid
        //           },
        //           {
        //             id: userPurchase.id
        //           }
        //         ],
        //         function(error) {
        //           if (error) throw err;
        //           console.log("Bid placed successfully!");
        //           start();
        //         }
        //       );
        //     }
        //     else {
        //       // bid wasn't high enough, so apologize and start over
        //       console.log("Your bid was too low. Try again...");
        //       start();
        //     }
        //   });
        
        
        
        
        console.log("\nHere's your receipt. You can return an item for up to 30 days after purchase.");
        console.log(JSON.stringify(answers, null, '  '));
      //.then(function(answers) {
        // based on their answers, either call the bid or the post functions
        // if (answers.postOrBid.toUpperCase() === "POST") {
        //   postAuction();
        // }
        // else {
        //   bidAuction();
        // }
      });
 })}