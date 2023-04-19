const { addEmployeePrompt, updateEmployeeRolePrompt } = require('./prompts');
const { Department, Role, Employee } = require('./queries');


// Define the main function that handles the user's choice
async function handleChoice(choice) {
    try {
        if (choice === "View All Employees") {
            const employees = await Employee.getAllEmployees();
            console.table(employees);
        }
        if (choice === "View All Departments") {
            const departments = await Department.getAllDepartments();
            console.table(departments);
        }
        if (choice === "View All Roles") {
            const roles = await Role.getAllRoles();
            console.table(roles);
        }
        if (choice === "Add Employee") {
            const employee = await addEmployeePrompt();
            await Employee.addEmployee(employee);
            console.log("Employee added successfully");
        }
        if (choice === "Update Employee Role") {
            const { employeeId, roleId } = await updateEmployeeRolePrompt();
            await Employee.updateEmployeeRole(employeeId, roleId);
            console.log("Employee role updated successfully");
        }
        if (choice === "Exit") {
            connection.end();
            process.exit();
        }
        if (!["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Update Employee Role", "Exit"].includes(choice)) {
            console.log(`Invalid choice: ${choice}. Please choose a valid option.`);
        }
    } catch (error) {
        console.log(`Error occurred: ${error.message}`);
    }
}

// Define the main function that prompts the user and executes SQL queries based on the user's choices
async function main() {
    // Prompt the user with the main prompt
    const { choice } = await inquirer.prompt(mainPrompt);

    // Handle the user's choice
    await handleChoice(choice);

    // Run the main function again to prompt the user for another choice
    main();
}

// Call the main function to start the program
main();