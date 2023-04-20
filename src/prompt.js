const { getDepartments, getRoles, getEmployees, getManagers } = require('./dbOperations');
const inquirer = require('inquirer');

// Prompt for main menu actions
const mainPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Update an employee's manager",
                "Delete department, role, or employee",
                "View department budget",
                "Exit",
            ],
        }
    ]);
};

// Prompt for adding a new department
const addDepartmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ]);
};

// Prompt for adding a new role
const addRolePrompt = async () => {
    const departmentChoices = await getDepartments();
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Which department does this role belong to?',
            choices: departmentChoices
        }
    ]);
};

// Prompt for adding a new employee
const addEmployeePrompt = async () => {
    const roleChoices = await getRoles();
    const managerChoices = await getManagers();
    return inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the role of the employee?',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'Who is the manager of the employee?',
            choices: [...managerChoices, { name: 'None', value: null }]
        }
    ]);
};

// Prompt for updating an employee role
const updateEmployeeRolePrompt = async () => {
    const employeeChoices = (await getEmployees()).map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));

    const roleChoices = await getRoles();

    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeToUpdate',
            message: 'Which employee do you want to update?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'What is the new role for this employee?',
            choices: roleChoices
        }
    ]);
};

// Prompt for updating an employee manager
const updateEmployeeManagerPrompt = async () => {
    const employeeChoices = (await getEmployees()).map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
    const managerChoices = await getManagers();

    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeToUpdate',
            message: 'Which employee do you want to update?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'newManager',
            message: 'Who is the new manager for this employee?',
            choices: [...managerChoices, { name: 'None', value: null }]
        }
    ]);
};

// Prompt for deleting department, role, or employee
const deleteEntityPrompt = async () => {
    const departmentChoices = await getDepartments();
    const roleChoices = await getRoles();
    const employeeData = await getEmployees(); // Await the result of getEmployees()
    const employeeChoices = employeeData.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));

    return inquirer.prompt([
        {
            type: 'list',
            name: 'entityType',
            message: 'What do you want to delete?',
            choices: [
                { name: 'Department', value: 'department' },
                { name: 'Role', value: 'role' },
                { name: 'Employee', value: 'employee' }
            ]
        },
        {
            type: 'list',
            name: 'departmentToDelete',
            message: 'Which department do you want to delete?',
            choices: departmentChoices,
            when: (answers) => answers.entityType === 'department'
        },
        {
            type: 'list',
            name: 'roleToDelete',
            message: 'Which role do you want to delete?',
            choices: roleChoices,
            when: (answers) => answers.entityType === 'role'
        },
        {
            type: 'list',
            name: 'employeeToDelete',
            message: 'Which employee do you want to delete?',
            choices: employeeChoices,
            when: (answers) => answers.entityType === 'employee'
        }
    ]);
};

// Prompt for viewing department budget
const viewDepartmentBudgetPrompt = async () => {
    const departmentChoices = await getDepartments();

    return inquirer.prompt([
        {
            type: 'list',
            name: 'departmentToView',
            message: 'Which department budget do you want to view?',
            choices: departmentChoices
        }
    ]);
};

// Export the prompt functions
module.exports = {
    mainPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt,
    updateEmployeeManagerPrompt,
    deleteEntityPrompt,
    viewDepartmentBudgetPrompt
};