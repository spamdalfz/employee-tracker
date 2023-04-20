const mysql = require('mysql2/promise');
require('dotenv').config();

// Configure the database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};


const getDepartments = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            const [rows] = await connection.query('SELECT * FROM departments');
            return rows.map(row => ({ name: row.name, value: row.id }));
        } catch (err) {
            console.error('Error fetching departments:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

const getRoles = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            const [rows] = await connection.query('SELECT * FROM roles');
            return rows.map(row => ({ name: row.title, value: row.id }));
        } catch (err) {
            console.error('Error fetching roles:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

const getEmployees = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            const [rows] = await connection.query('SELECT * FROM employees');
            return rows.map(row => ({
                name: `${row.first_name} ${row.last_name}`,
                value: row.id
            }));
        } catch (err) {
            console.error('Error fetching employees:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Create a new department in the database
const createDepartment = async (departmentName) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            await connection.query('INSERT INTO departments SET ?', { name: departmentName });
        } catch (err) {
            console.error('Error creating department:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Create a new role in the database
const createRole = async (roleTitle, roleSalary, roleDepartment) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            await connection.query('INSERT INTO roles SET ?', {
                title: roleTitle,
                salary: roleSalary,
                department_id: roleDepartment
            });
        } catch (err) {
            console.error('Error creating role:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Create a new employee in the database
const createEmployee = async (employeeFirstName, employeeLastName, employeeRole, employeeManager) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            await connection.query('INSERT INTO employees SET ?', {
                first_name: employeeFirstName,
                last_name: employeeLastName,
                role_id: employeeRole,
                manager_id: employeeManager
            });
        } catch (err) {
            console.error('Error creating employee:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Update an employee's role in the database
const updateEmployeeRole = async (employeeId, roleId) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            await connection.query(
                'UPDATE employees SET role_id = ? WHERE id = ?',
                [roleId, employeeId]
            );
        } catch (err) {
            console.error('Error updating employee role:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Export the functions for use in other modules
module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    createDepartment,
    createRole,
    createEmployee,
    updateEmployeeRole
};