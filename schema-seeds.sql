DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT, -- unique id for each item
  product_name VARCHAR(50) NOT NULL, 
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL NOT NULL,
  stock_quantity INTEGER NULL, -- this can be null ie if item stock is zero
  PRIMARY KEY (item_id)
  );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tracksmith Sports Bra", "Activewear", 90.00, 50), 
("Tracksmith Merino Pullover", "Activewear", 140.00, 43),
("Tracksmith Greyboy Tank", "Activewear", 52.00, 61),
("Tracksmith Split Shorts", "Activewear", 48.00, 19),
("Tracksmith Team Hoodie", "Activewear", 88.00, 37),
("Tracksmith x Noah NYC Tank", "Activewear", 48.00, 19),
("Tracksmith x Noah NYC Shorts", "Activewear", 50.00, 19),
("Tracksmith Merino Harrier Tank", "Activewear", 52.00, 19),
("Tracksmith Terry Jogger", "Activewear", 50.00, 19),
("Tracksmith Split Shorts", "Activewear", 48.00, 19);
