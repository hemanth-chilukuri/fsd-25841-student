const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Akash@2004",
    database: "student_system"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

// Insert
app.post("/register", (req,res)=>{
    const {name,email,dob,department,phone} = req.body;

    const sql = "INSERT INTO students (name,email,dob,department,phone) VALUES (?,?,?,?,?)";

    db.query(sql,[name,email,dob,department,phone],(err)=>{
        if(err) throw err;
        res.send("Inserted");
    });
});

// Select
app.get("/students",(req,res)=>{
    db.query("SELECT * FROM students",(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
});

app.listen(3000,()=>console.log("Server running on port 3000"));