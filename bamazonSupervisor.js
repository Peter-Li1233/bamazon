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

  mainMenu();
});

function mainMenu() {

    var supervisorChoice =[
    "View Product Sales by Department",
    "Create New Department",
    "Logout"
    ];
    inquirer.prompt([
        {
            name: "action",
            message: "What would you like to do ?",
            type: "rawlist",
            choices: supervisorChoice
        }
      ]).then(function(answers){
            //console.log(answers);
            switch (answers.action) {
                case supervisorChoice[0]:
                    viewDepartmentSales();
                    break;
                case supervisorChoice[1]:
                    createNewDepartment();
                    break;
                case supervisorChoice[2]:
                    logout();
                    
            }
      });
}

function viewDepartmentSales(){
    var sql = "SELECT departments.department_id, departments.department_name, over_head_costs, SUM(product_sales) as product_sales FROM departments LEFT JOIN products ON products.department_id = departments.department_id GROUP BY departments.department_name";
    connection.query(
        sql,
        function(err,res){
            if(err) throw err;
            //console.log(res);

            var outputData =[["department_id", "department_name","over_head_costs", "total_Profit"]];

            for(i=0;i<res.length;i++) {
                var record=[];
                record.push(res[i].department_id);
                record.push(res[i].department_name);
                record.push(res[i].over_head_costs);
                record.push(res[i].product_sales - res[i].over_head_costs);
                outputData.push(record);
            }
            
            console.log("Dear Supervisor, Here you go...");
            console.log("");
            console.log(table.table(outputData));
            mainMenu();
            //connection.end()
        }
    );

}

function createNewDepartment() {
    // console.log("All Right");
    // mainMenu();
    inquirer.prompt([
        {
            name: "name",
            message: "What's the department name you want to create?"
            
        },
        {
            name: "cost",
            message:"How much over head cost will you assume for this department?",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return "Please input a valid Cost number";
            }
        }
    ]).then(function(answers) {

        //var stockQuantity = res[answers.itemID-1].stock_quantity + parseInt(answers.quantity);
        //console.log(stockQuantity);
        connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answers.name,
                over_head_costs: parseFloat(answers.cost)
            },
            function(err, res) {

            console.log("Your department has been successfully created!");
            mainMenu();
            //connection.end();
            
            }
        );

    });
}


function logout() {
    console.log("Bye! See you next time");
    connection.end();
}