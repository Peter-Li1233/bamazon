DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45),
  department_name VARCHAR(45),
  price DECIMAL(11,3),
  stock_quantity INTEGER(11),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ("lenovo", "computers", 510.25, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("bike", "sports&outdoors", 100.50, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Gone with node.js", "E-readers&books", 35, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("peter's cake", "handmade", 30.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("imagine", "computers", 1000.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Where is Peter?", "E-reader$books", 27.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("signature bread", "handmade", 2.99, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("Donald love Hillary (2)", "video", 49.00, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("emperor's pants 2018", "clothing", 39.00, 110);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ("the pig is sleeping", "music", 10.50, 80);


SELECT * FROM products;