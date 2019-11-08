let inquirer = require("inquirer");
let mysql = require("mysql");

let products = [];
const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
}

let connection = mysql.createConnection(config);

function queryProducts() {
    connection.query("SELECT * FROM products", function (error, response) {

        if (error) {
            throw error;
        }

        for (let i = 0; i < response.length; i++) {

            let product = {
                item_id: response[i].item_id,
                product_name: response[i].product_name,
                department_name: response[i].department_name,
                price: response[i].price,
                stock_quantity: response[i].stock_quantity
            }

            products.push(product);

        }
        displayTable();
    });
}
function displayTable() {
    let displayProducts = [];

    for (let i = 0; i < products.length; i++) {
        let spacer = '';
        if (products[i].price < 10) {
            spacer = '  '
        } else if (products[i].price < 100) {
            spacer = ' '
        }
        
        let price = spacer + parseFloat(products[i].price).toFixed(2);

        displayProduct = {
            ID: products[i].item_id,
            Product: products[i].product_name,
            Department: products[i].department_name,
            Price: price,
            Stock: products[i].stock_quantity
        };
        displayProducts.push(displayProduct);
    }
    console.table(displayProducts);

    customerPrompt();
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
            let onHand = products[selectedItem - 1].stock_quantity;

            if (quantity <= onHand) {
                let newQuantity = products[selectedItem - 1].stock_quantity - quantity;
                updateQuantity(newQuantity, selectedItem);

                let item = products[selectedItem - 1].product_name;
                let totalPrice = quantity * products[selectedItem - 1].price;
                console.log(`\n\nQuantity: ${quantity} \nProduct: ${item} \nTotal: $${totalPrice}\n`);

            } else {
                console.log("Insufficient quantity!");
                displayTable();
            }
        });
}

function updateQuantity(quantity, selectedItem) {
    products[selectedItem - 1].stock_quantity = quantity;
    let sql = `UPDATE products SET stock_quantity = ${quantity} WHERE item_id = ${selectedItem}`;
    connection.query(sql, function (error, result) {
        if (error) {
            throw error;
        }
        displayTable();
    });
}

queryProducts();