const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Akash@2004' // replace with your password
    database: 'login_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("❌ Connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// Simple route
app.get('/', (req, res) => {
    res.send("MySQL Connected Successfully!");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});