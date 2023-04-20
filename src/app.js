const { mainPrompt } = require("./prompt");

const {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRoleAction,
} = require("./actions");

const actionHandlers = {
    "View all departments": viewAllDepartments,
    "View all roles": viewAllRoles,
    "View all employees": viewAllEmployees,
    "Add a department": addDepartment,
    "Add a role": addRole,
    "Add an employee": addEmployee,
    "Update an employee role": updateEmployeeRoleAction,
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
    let exitApp = false;

    while (!exitApp) {
        const { action } = await mainPrompt();

        if (action in actionHandlers) {
            await actionHandlers[action]();
        } else if (action === "Exit") {
            exitApp = true;
        } else {
            console.log("Unknown action:", action);
        }
    }
};

main();

