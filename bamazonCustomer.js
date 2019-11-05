let inquirer = require("inquirer");

let selectedItem;


function customerPrompt() {
    inquirer
        .prompt([
            {
                name: "item_selected",
                message: "What would you like to buy (enter item_id)? "
            },
            {
                name: "quantity",
                message: "How many would you like? "
            }
        ])
        .then(function (answers) {
            let selectedItem = parseInt(answers.item_selected);
            let quantity = parseInt(answers.quantity);
            console.log(`Order ${quantity} of ${selectedItem}`);
        });
}


customerPrompt();
