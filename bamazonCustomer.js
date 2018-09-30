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

// 5. Running this application will first display all of the items available for sale. 
//Include the ids, names, and prices of products for sale. ✅

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.✅
//    * The second message should ask how many units of the product they would like to buy.✅

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request..✅

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through..✅

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity. ✅
//    * Once the update goes through, show the customer the total cost of their purchase.✅
let userPurchase; 
let totalCost;

function showMerch(pawnProducts) {
    // query the database for all items being auctioned
    let query = connection.query("SELECT * FROM products",
        function (err, res) {
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
    connection.query("SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            inquirer.prompt([{
                    name: "selectItem",
                    type: "input",
                    message: "\nWhich expensive Tracksmith item would you like to purchase today? Please enter the id.",
                    function (value) { //make sure customer enters number, from inquirer documentation
                        let valid = !isNaN(parseFloat(value));
                        return valid || "\nPlease enter the item id of the item you would like to purchase";
                    },
                    filter: Number
                },
                {
                    name: "qty",
                    type: "input",
                    message: "\nHow many of those would you like to purchase?",
                    function (value) { //make sure customer enters number, from inquirer documentation
                        let valid = !isNaN(parseFloat(value));
                        return valid || "\nI'm sorry, that wasn't a number. Please enter a number.";
                    },
                    filter: Number
                }
            ]).then(answers => {
                for (let i = 0; i < res.length; i++) {
                    if (answers.selectItem === res[i].item_id) {
                        userPurchase = res[i];
                        totalCost = (userPurchase.price * answers.qty);
                        if (userPurchase.stock_quantity >= parseInt(answers.qty)) {
                            let productLeft = (userPurchase.stock_quantity - answers.qty); //the expensive Tracksmith item customer has selected to purchase 
                            //b/c userPurchase.stock_quantity is really res[i].stock_quantity
                            // and ansers.qty is from the .then(answers), built in q name:qty
                             connection.query( // let query =
                                "UPDATE products SET ? WHERE ?",
                                [{
                                        stock_quantity: productLeft
                                    },
                                    {
                                        item_id: userPurchase.item_id
                                    }
                                ],
                                function (error) {
                                    if (error) throw err;
                                    console.log("Thank you for your purchase! You look faster already. 🏃🏽‍♀️💨");
                                    console.log("\nHere's your receipt. You can return an item for up to 30 days after purchase.");
                                    // console.log(JSON.stringify(answers, null, '  ')); // basic receipt
                                    console.log(`Item #: ${userPurchase.item_id} | Product Name: ${userPurchase.product_name} | Quantity: ${answers.qty} | Price: $${totalCost} \n`);
                                    console.log(`stock_quantity after: ${userPurchase.stock_quantity} \n`);

                                }
                            );
                        } else {
                            //classic Tracksmith, they ran out
                            console.log(`I'm sorry, we don't have any ${userPurchase.product_name} left 😓. Is there anything else you'd like to purchase?`);
                            // start();
                        }

                    }
                }
            });

        });
};