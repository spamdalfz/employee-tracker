require('dotenv').config()
const express = require('express')
const mysql = require('mysql2');
//const prompt = 

const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Define routes

//server start
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});