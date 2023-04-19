const mysql = require('mysql2');
require('dotenv').config();

// Configure the database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employee_db',
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Export the connection object for use in other modules
module.exports = connection;
