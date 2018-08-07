DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45),
  department_name VARCHAR(45),
  department_id INTEGER(11),
  price DECIMAL(11,3),
  stock_quantity INTEGER(11),
  product_sales DECIMAL(11,3),
  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("lenovo", "computers", 1, 510.25, 100);
INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("bike", "sports&outdoors", 2, 100.50, 75);
INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("Gone with node.js", "E-readers&books", 3, 35, 50);
INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("peter's cake", "handmade", 4, 30.00, 20);
-- INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("imagine", "computers", 1, 1000.00, 15);
-- INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("Where is Peter?", "E-reader$books", 3, 27.99, 100);
-- INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("signature bread", "handmade", 4, 2.99, 60);
INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("Donald love Hillary (2)", "video", 5, 49.00, 30);
INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("emperor's pants 2018", "clothing", 6, 39.00, 110);
INSERT INTO products (product_name, department_name, department_id, price, stock_quantity) values ("the pig is sleeping", "music", 7, 10.50, 80);

CREATE TABLE departments(
department_id INTEGER(11) auto_increment NOT NULL,
department_name VARCHAR(45),
over_head_costs DECIMAL(11,3),

PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs) values ("computers", 1000.000);
INSERT INTO departments(department_name, over_head_costs) values ("sports&outdoors", 1500.000);
INSERT INTO departments(department_name, over_head_costs) values ("E-readers&books", 500.000);
INSERT INTO departments(department_name, over_head_costs) values ("handmade", 1000.000);
INSERT INTO departments(department_name, over_head_costs) values ("video", 400.000);
INSERT INTO departments(department_name, over_head_costs) values ("clothing", 1000.000);
INSERT INTO departments(department_name, over_head_costs) values ("music", 250.000);

SELECT * FROM products;
SELECT * FROM departments;