let inquirer = require("inquirer");
let mysql = require("mysql");

let products = [];

let connection = mysql.createConnection({

    host: "localhost",
    port: 3306,

    user: "root",
    password: "root",
    database: "bamazon_db"
});

function queryProducts() {
    connection.query("SELECT * FROM products", function (error, response) {
        
        if (error) {
            throw error;
        }
           
        for (let i = 0; i < response.length; i++) {
            
            let product = {
                ID: response[i].item_id,
                Product: response[i].product_name,
                Department: response[i].department_name,
                Price: response[i].price,
                In_Stock: response[i].stock_quantity
            }

            products.push(product);
            
        }
        //console.clear();
        //console.table(products, ['ID', 'Product', 'Department', 'Price', 'In_Stock']);

        console.log('| ID | Product | Department | Price | In Stock |');
        console.log('------------------------------------------------');
        
        for(let i = 0; i < products.length; i++) {
            console.log(`|${products[i].ID} | ${products[i].Product} | ${products[i].Department} | ${products[i].Price} | ${products[i].In_Stock} |`);
        }       
        
        customerPrompt();
    });
}

function customerPrompt() {
    inquirer
        .prompt([
            {
                name: "item_selected",
                message: "What would you like to buy (enter ID)? "
            },
            {
                name: "quantity",
                message: "How many would you like? "
            }
        ])
        .then(function (answers) {
            let selectedItem = parseInt(answers.item_selected);
            let quantity = parseInt(answers.quantity);
            let onHand = products[selectedItem-1].In_Stock;
            console.log(`Want: ${quantity} Have: ${onHand}`);
            
            if (quantity <= onHand){
                let newQuantity = products[selectedItem-1].In_Stock - quantity;
                updateQuantity(newQuantity, selectedItem);
            } else {
                console.log("Insufficient quantity!");
                customerPrompt();
            }
        });
}

function updateQuantity(quantity, selectedItem) {
    var sql = `UPDATE products SET stock_quantity = ${quantity} WHERE item_id = ${selectedItem}`;
    connection.query(sql, function (error, result) {
      if (error) { 
          throw error;
      }
      console.log();
    });
    queryProducts();
}

queryProducts();

