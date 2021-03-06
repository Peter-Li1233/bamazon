var mysql = require("mysql");
var table = require("table");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  customerBid();
});

function customerBid() {
    connection.query(
        "SELECT * FROM products",
        function(err,res){

            var outputData =[["item ID", "Name","Price"]];

            for(i=0;i<res.length;i++) {
                var record=[];
                record.push(res[i].item_id);
                record.push(res[i].product_name);
                record.push(res[i].price);
                outputData.push(record);
            }
            
            console.log("Our Current Stock...");
            console.log("");
            console.log(table.table(outputData));

            inquirer.prompt([
                {
                    name: "id",
                    message: "Please let me know the item ID you want to order on?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return "Please input a valid Item number";
                    }
                },
                {
                    name:"quantity",
                    message: "How many do you want to order?",
                    validate: function(value) {
                        if (isNaN(value) === false) {
                          return true;
                        }
                        return "Please input a valid quantity number";
                    }
                }
            ]).then(function(answers){
                //console.log(answers);
                if (res[answers.id-1].stock_quantity > answers.quantity) {
                    var order = answers;
                    var unitCost = res[answers.id-1].price;
                    var stockQuantity = res[answers.id-1].stock_quantity;
                    var productSales = res[answers.id-1].product_sales;
                    placeOrder(order, stockQuantity, unitCost, productSales);
                } else {
                    console.log("Sorry, We don't have enough left!");
                    connection.end();
                }
               
            });
            
        }
    )
    
}

function placeOrder(order,stockQuantity, unitCost, productSales) {
    console.log("Placing the order for you ...\n")
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
              stock_quantity: stockQuantity - order.quantity,
              product_sales: parseInt(order.quantity) * unitCost + productSales
            },
            {
              item_id: order.id
            }
        ],
        function(err,res) {
            if (err) throw err;
            // console.log(typeof unitCost);
            // console.log(typeof order.quantity);
            var totalCost = parseInt(order.quantity) * unitCost;
            console.log("You have sucessfully placed the order");
            console.log("The total cost will be: $" + totalCost+ "!");
            connection.end();
        }
    )
}
