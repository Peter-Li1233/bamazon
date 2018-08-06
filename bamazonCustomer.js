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
                    var stockQuantity = res[answers.id-1].stock_quantity - answers.quantity;
                    placeOrder(order, stockQuantity);
                } else {
                    console.log("Sorry, We don't have enough left!");
                    connection.end();
                }
               
            });
            
        }
    )
    
}

function placeOrder(order,stockQuantity) {
    console.log("Placing the order for you ...\n")
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
              stock_quantity: stockQuantity
            },
            {
              item_id: order.id
            }
        ],
        function(err,res) {
            if (err) throw err;
            console.log("You have sucessfully placed the order");
            connection.end();
        }
    )
}
