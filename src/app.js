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

main();

