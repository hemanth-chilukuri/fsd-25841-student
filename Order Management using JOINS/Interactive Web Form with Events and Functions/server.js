const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_mysql_password",
    database: "feedback_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Submit Route
app.post("/submit", (req, res) => {
    const { name, email, rating, comments } = req.body;

    const sql = "INSERT INTO feedback (name, email, rating, comments) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, rating, comments], (err, result) => {
        if (err) throw err;
        res.json({ message: "Feedback submitted successfully!" });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});