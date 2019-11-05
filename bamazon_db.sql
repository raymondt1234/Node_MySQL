CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (13,2) NULL,
    stock_quantity INTEGER NULL,
    
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spoon", "Kitchen", 1.00, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fish bowl", "Pets", 15.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knife", "Kitchen", 0.90, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Food", "Pets", 20.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plate", "Kitchen", 5.00, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 199.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("VCR", "Electronics", 75.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Video Game", "Electronics", 15.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 1.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Outdoors", 250.00, 10);