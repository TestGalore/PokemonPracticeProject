var express = require('express');
var app = express();
var port = 8080;
const dotenv = require("dotenv");
const mysql = require('mysql');

// Create connection with MySQL RDS info
dotenv.config();
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

// Connect to the DB
connection.connect(function(err) {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to the database.");
});

// Define a route handler for the root path
app.get('/', function (req, res) {
    res.send('Hello, World!');
});

// Lists all legendary Pokemon and their info
app.get('/legendary', function (req, res) {
    connection.query("SELECT * FROM pokemon_data WHERE Legendary = 1;", function (err, results, fields) {
        if (err) {
            console.error("Failed to select from table: " + err.stack);
        }
        res.send(results);
    })
});

// Retrieves ID, name, and total from the Pokemon with the most total amount
app.get('/maxtotal', function (req, res) {
    connection.query("SELECT ID, Name, Total FROM pokemon_data WHERE Total = (SELECT MAX(Total) FROM pokemon_data);", function (err, results, fields) {
        if (err) {
            console.error("Failed to select from table: " + err.stack);
        }
        res.send(results);
    })
});

// Retrieves ID, name, and total from the Pokemon with the least total amount
app.get('/mintotal', function (req, res) {
    connection.query("SELECT ID, Name, Total FROM pokemon_data WHERE Total = (SELECT MIN(Total) FROM pokemon_data);", function (err, results, fields) {
        if (err) {
            console.error("Failed to select from table: " + err.stack);
        }
        res.send(results);
    })
});

// Lists 3 random pokemon and their information
app.get('/rand', function (req, res) {
    connection.query("SELECT * FROM pokemon_data ORDER BY RAND() LIMIT 3;", function (err, results, fields) {
        if (err) {
            console.error("Failed to select from table: " + err.stack);
        }
        res.send(results);
    })
});

// Start the server
app.listen(port, function () {
    console.log("Server is listening on port ".concat(port));
});
