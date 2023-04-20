const {
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt,
} = require("./prompt");

const {
    getDepartments,
    getRoles,
    getEmployees,
    createDepartment,
    createRole,
    createEmployee,
    updateEmployeeRole,
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
};

const addRole = async () => {
    const { roleTitle, roleSalary, roleDepartment } = await addRolePrompt();
    await createRole(roleTitle, roleSalary, roleDepartment);
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
};

const updateEmployeeRoleAction = async () => {
    const { employeeToUpdate, newRole } = await updateEmployeeRolePrompt();
    await updateEmployeeRole(employeeToUpdate, newRole);
};

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRoleAction
};