const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "loka", // change if needed
    database: "student"
});

db.connect((err) => {
    if (err) {
        console.log("❌ DB Error:", err);
    } else {
        console.log("✅ Connected to MySQL");
    }
});

// Feedback API
app.post("/submit-feedback", (req, res) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("All fields are required!");
    }

    const sql = "INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log("SQL Error:", err);
            return res.status(500).send("Database Error");
        }

        res.send("🎉 Feedback Submitted Successfully!");
    });
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000/feedback.html");
});