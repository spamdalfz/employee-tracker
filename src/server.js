const express = require('express');
const connection = require('./dbOperations');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/departments', (req, res) => {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
