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

var managerChoice =[
    "View Product for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product",
    "Logout"
];

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
//   inquirer.prompt([
//     {
//         name: "action",
//         message: "What would you like to do ?",
//         type: "rawlist",
//         choices: managerChoice
//     }
//   ]).then(function(answers){
//         //console.log(answers);
//         switch (answers.action) {
//             case managerChoice[0]:
//                 viewProduct();
//                 break;
//             case managerChoice[1]:
//                 viewLowInventory();
//                 break;
//             case managerChoice[2]:
//                 addToInventory();
//                 break;
//             case managerChoice[3]:
//                 addNewProduct();
//                 break;
//             case managerChoice[4]:
//                 logout();
                
//         }
//   });
mainMenu();
});

function mainMenu() {
    inquirer.prompt([
        {
            name: "action",
            message: "What would you like to do ?",
            type: "rawlist",
            choices: managerChoice
        }
      ]).then(function(answers){
            //console.log(answers);
            switch (answers.action) {
                case managerChoice[0]:
                    viewProduct();
                    break;
                case managerChoice[1]:
                    viewLowInventory();
                    break;
                case managerChoice[2]:
                    addToInventory();
                    break;
                case managerChoice[3]:
                    addNewProduct();
                    break;
                case managerChoice[4]:
                    logout();
                    
            }
      });
}

function viewProduct() {
    //console.log("we get here!");
    connection.query(
        "SELECT * FROM products",
        function(err,res){

            var outputData =[["item ID", "Name","Price", "Quantity"]];

            for(i=0;i<res.length;i++) {
                var record=[];
                record.push(res[i].item_id);
                record.push(res[i].product_name);
                record.push(res[i].price);
                record.push(res[i].stock_quantity);
                outputData.push(record);
            }
            
            console.log("Dear Manager, Here you go...");
            console.log("");
            console.log(table.table(outputData));
            mainMenu();
            //connection.end()
        }
    );
}

function viewLowInventory() {
    //console.log("we get here!");
    connection.query(
        "SELECT * FROM products Where stock_quantity < 50",
        // {
        //     stock_quantity: 5
        // },
        function(err,res){

            var outputData =[["item ID", "Name","Price", "Quantity"]];

            for(i=0;i<res.length;i++) {
                var record=[];
                record.push(res[i].item_id);
                record.push(res[i].product_name);
                record.push(res[i].price);
                record.push(res[i].stock_quantity);
                outputData.push(record);
            }
            
            console.log("Dear Manager, Here you go...");
            console.log("");
            console.log(table.table(outputData));
            mainMenu();
            //connection.end()
        }
    );
}

function addToInventory() {
    connection.query(
        "SELECT * FROM products",
        function(err,res){

            var outputData =[["item ID", "Name","Price", "Quantity"]];

            for(i=0;i<res.length;i++) {
                var record=[];
                record.push(res[i].item_id);
                record.push(res[i].product_name);
                record.push(res[i].price);
                record.push(res[i].stock_quantity);
                outputData.push(record);
            }
            
            console.log("Dear Manager, Here are all we have in stock...");
            console.log("");
            console.log(table.table(outputData));
            update(res);
        }
    );

    function update(res) {
        inquirer.prompt([
            {
                name: "itemID",
                message: "Which item do you want to add?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return "Please input a valid Item number";
                }
            },
            {
                name: "quantity",
                message:"How many will you add to this item?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return "Please input a valid Item number";
                }
            }
        ]).then(function(answers) {

            var stockQuantity = res[answers.itemID-1].stock_quantity + parseInt(answers.quantity);
            //console.log(stockQuantity);
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                {
                    stock_quantity: stockQuantity
                },
                {
                    item_id: parseInt(answers.itemID)
                }
                ],
                function(err, res) {

                console.log("Your Inventory has been successfully added!");
                mainMenu();
                //connection.end();
                
                }
            );

        });
    }
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "name",
            message: "what's the product name you want to add?"
        },
        {
            name: "department",
            message: "What department does your product belongs to?"
        },
        {
            name: "price",
            message: "what's the price do you want to set as? ",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return "Please input a valid Item number";
            }
        },
        {
            name: "quantity",
            message:"how many do you want to add? ",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return "Please input a valid Item number";
            }
        }

    ]).then(function(answers){
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answers.name,
                department_name: answers.department,
                price:answers.price,
                stock_quantity: answers.quantity
            },
            function(err,res) {
                if(err) throw err;
                console.log("Your item has been successfully Added");
                mainMenu();

            }
        );

    });
}

function logout() {
    console.log("Bye! See you next time");
    connection.end();
}