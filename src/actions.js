const {
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt,
    updateEmployeeManagerPrompt,
    deleteEntityPrompt,
    viewDepartmentBudgetPrompt,
} = require("./prompt");

const {
    getDepartments,
    getRoles,
    getEmployees,
    createDepartment,
    createRole,
    createEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteEntity,
    getDepartmentBudget,
} = require("./dbOperations");

const viewAllDepartments = async () => {
    const departments = await getDepartments();
    console.table(departments);
};

const viewAllRoles = async () => {
    const roles = await getRoles();
    console.table(roles);
};

const viewAllEmployees = async () => {
    const employees = await getEmployees();
    console.table(employees);
};

const addDepartment = async () => {
    const { departmentName } = await addDepartmentPrompt();
    await createDepartment(departmentName);
    console.log(`\n Successfully added ${departmentName} to the database \n`);
};

const addRole = async () => {
    const { roleTitle, roleSalary, roleDepartment } = await addRolePrompt();
    await createRole(roleTitle, roleSalary, roleDepartment);
    console.log(`\n Successfully created ${roleTitle} role with a salary of ${roleSalary} \n`);
};

const addEmployee = async () => {
    const {
        employeeFirstName,
        employeeLastName,
        employeeRole,
        employeeManager,
    } = await addEmployeePrompt();
    await createEmployee(
        employeeFirstName,
        employeeLastName,
        employeeRole,
        employeeManager
    );
    console.log(`\n Successfully added ${employeeFirstName} ${employeeLastName} to the database \n`);
};

const updateEmployeeRoleAction = async () => {
    const { employeeToUpdate, newRole } = await updateEmployeeRolePrompt();
    await updateEmployeeRole(employeeToUpdate, newRole);
    console.log('\n Successfully updated employee role \n')
};

const updateEmployeeManagerAction = async () => {
    const { employeeToUpdate, newManager } = await updateEmployeeManagerPrompt();
    await updateEmployeeManager(employeeToUpdate, newManager);
    console.log(`\n Successfully updated employee manager \n`)
};

const deleteEntityAction = async () => {
    const { entityType, departmentToDelete, roleToDelete, employeeToDelete } = await deleteEntityPrompt();
    await deleteEntity(entityType, departmentToDelete || roleToDelete || employeeToDelete);
    console.log(`\n Successfully deleted ${entityType} \n`);

};

const viewDepartmentBudget = async () => {
    const { departmentToView } = await viewDepartmentBudgetPrompt();
    const budget = await getDepartmentBudget(departmentToView);
    console.log(`\n The budget for the selected department is: ${budget} \n`);
};

module.exports = {
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
};