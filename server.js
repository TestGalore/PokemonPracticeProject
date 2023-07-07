var express = require('express');
var app = express();
var port = 8080;
// Define a route handler for the root path
app.get('/', function (req, res) {
    res.send('Hello, World!');
});
// Start the server
app.listen(port, function () {
    console.log("Server is listening on port ".concat(port));
});
