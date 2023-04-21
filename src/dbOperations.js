const mysql = require('mysql2/promise');
require('dotenv').config();

// Configure the database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

// Retrieves all departments from the database and transforms the results into an array of objects with name and value properties.
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

// Retrieves all roles from the database and transforms the results into an array of objects with name, value, department, and salary properties.
const getRoles = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            const query = `
            SELECT r.id, r.title, d.name AS department, r.salary
            FROM roles r
            INNER JOIN departments d ON r.department_id = d.id
            `;
            const [rows] = await connection.query(query);
            return rows.map(row => ({ name: row.title, value: row.id, department: row.department, salary: row.salary }));
        } catch (err) {
            console.error('Error fetching roles:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Retrieves all employees from the database. The results are returned as an array of objects.
const getEmployees = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            const query = `
            SELECT e.id, e.first_name, e.last_name, r.title AS roles, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employees e
            LEFT JOIN employees m ON e.manager_id = m.id
            INNER JOIN roles r ON e.role_id = r.id
            INNER JOIN departments d ON r.department_id = d.id
            ORDER BY e.id;
          `;
            const [rows] = await connection.query(query);
            return rows;
        } catch (err) {
            console.error('Error fetching employees:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Retrieves all employees without a manager from the database and transforms the results into an array of objects with name and value properties.
const getManagers = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            const [rows] = await connection.query(`
          SELECT id, CONCAT(first_name, ' ', last_name) AS name
          FROM employees
          WHERE manager_id IS NULL
        `);
            return rows.map(row => ({ name: row.name, value: row.id }));
        } catch (err) {
            console.error('Error fetching managers:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Get the budget of a department
const getDepartmentBudget = async (departmentId) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            const query = `
                SELECT SUM(r.salary) as budget
                FROM employees e
                INNER JOIN roles r ON e.role_id = r.id
                WHERE r.department_id = ?
            `;
            const [rows] = await connection.query(query, [departmentId]);
            return rows[0].budget;
        } catch (err) {
            console.error('Error getting department budget:', err);
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
                manager_id: employeeManager,
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

// Update an employee's manager in the database
const updateEmployeeManager = async (employeeId, managerId) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        try {
            await connection.query(
                'UPDATE employees SET manager_id = ? WHERE id = ?',
                [managerId, employeeId]
            );
        } catch (err) {
            console.error('Error updating employee manager:', err);
        } finally {
            await connection.end();
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Delete an entity (department, role, or employee) in the database
const deleteEntity = async (entityType, entityId) => {
    try {
        const connection = await mysql.createPool(dbConfig).getConnection();
        try {
            await connection.beginTransaction();
            await connection.query('DELETE FROM ?? WHERE id = ?', [entityType + 's', entityId]);
            await connection.commit();
        } catch (err) {
            console.error(`Error deleting ${entityType} with id ${entityId}:`, err);
            await connection.rollback();
            throw err; // re-throw the error so the calling function can handle it
        } finally {
            connection.release(); // release the connection back to the pool
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err; // re-throw the error so the calling function can handle it
    }
};

// Export the functions for use in other modules
module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    getManagers,
    createDepartment,
    createRole,
    createEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    deleteEntity,
    getDepartmentBudget
};