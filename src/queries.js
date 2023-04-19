const connection = require('./db');

const getDepartments = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM department', (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const getRoles = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM role', (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const getEmployees = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM employee', (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const addDepartment = (name) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO department (name) VALUES (?)', [name], (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const addRole = (title, salary, department_id) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id], (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id], (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

const updateEmployeeRole = (employee_id, role_id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [role_id, employee_id], (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
