const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employee_db',
});

module.exports = connection;