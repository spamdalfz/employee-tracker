// Importing the main prompt and action functions from other files
const { mainPrompt } = require("./prompt");

const {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRoleAction,
    updateEmployeeManagerAction,
    deleteEntityAction,
    viewDepartmentBudget
} = require("./actions");

// Defining an object that maps user input to action functions
const actionHandlers = {
    "View all departments": viewAllDepartments,
    "View all roles": viewAllRoles,
    "View all employees": viewAllEmployees,
    "Add a department": addDepartment,
    "Add a role": addRole,
    "Add an employee": addEmployee,
    "Update an employee role": updateEmployeeRoleAction,
    "Update an employee's manager": updateEmployeeManagerAction,
    "Delete department, role, or employee": deleteEntityAction,
    "View department budget": viewDepartmentBudget,
};

// Function to print a welcome message to the console
const printWelcomeMessage = () => {
    console.log(`
    
                           ▄▀▄     ▄▀▄
                          ▄█░░▀▀▀▀▀░░█▄
                      ▄▄  █░░░░░░░░░░░█  ▄▄
                     █▄▄█ █░░▀░░┬░░▀░░█ █▄▄█
█▀▀ █▀▄▀█ █▀█ █   █▀█ █▄█ █▀▀ █▀▀   █▀▄▀█ ▄▀█ █▄ █ ▄▀█ █▀▀ █▀▀ █▀█
██▄ █ ▀ █ █▀▀ █▄▄ █▄█  █  ██▄ ██▄   █ ▀ █ █▀█ █ ▀█ █▀█ █▄█ ██▄ █▀▄


    `);
};

// Main function that handles user input and calls the appropriate action function
const main = async () => {
    printWelcomeMessage();
    let exit = false;
    while (!exit) {
        const { action } = await mainPrompt();

        if (action === "Exit") {
            exit = true;
        } else {
            const actionHandler = actionHandlers[action];
            if (actionHandler) {
                await actionHandler();
            } else {
                console.log('Unknown action:', action);
            }
        }
    }
};

// Call the main function to start the application
main();