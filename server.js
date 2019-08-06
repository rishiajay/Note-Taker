// derived from greatBayBasic.js file & bamazon video that is located in the repo
var express = require("express");
var app = express();
var mysql = require("mysql");
var path = require("path");
// var inquirer = require("inquirer");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = 3000;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "notetaker_db"
})

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection is succesful!");
    // run the start function after the connection is made to prompt the user
})

// Displays a single character, or returns false
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/", function (req, res) {
    console.log("This route was hit");
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/test/:data", function (req, res) {

    var data = req.params.data;
    console.log(data);
    console.log("This route was hit");


    return res.json(true);
});

app.get("/api/allNotes", function (req, res) {
    var allNotes;
    // grab all notes from database 
    connection.query("SELECT * FROM notes", function (err, result) {
        console.log(result);
        allNotes = result;
        return res.json(allNotes);
    })
    // send notes back to browser
    // return res.json(allNotes);
});

app.post("/api/data", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // worked with George on this portion
    var newData = req.body;
    var newSubject = newData.title;
    var notes = newData.body;

    console.log(newData);

    /* connection.query(`INSERT INTO notes (Subject, body) VALUE "${newData.title}", "${newData.body}")`){
        if (err) throw (err);
    }; */
    res.json(newData);
});


// need to work on api delete & post


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});