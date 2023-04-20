const mysql = require('mysql2');
require('dotenv').config();

// Configure the database connection
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employee_db',
});

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

// Export the connection object for use in other modules
module.exports = {
    getDepartments,
    getRoles,
    getEmployees
};