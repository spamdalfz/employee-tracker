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
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete department, role, or employee',
                'View department budget',
                'Exit'
            ]
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

// Export the prompt functions
module.exports = {
    mainPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt,
};