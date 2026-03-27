const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"Akash@2004",
database:"logging_system"
});

db.connect(err=>{
if(err) throw err;
console.log("MySQL Connected");
});


// Get activity logs
app.get("/logs",(req,res)=>{

db.query("SELECT * FROM activity_logs ORDER BY action_time DESC",
(err,result)=>{
if(err) throw err;

res.json(result);
});

});


// Get daily report from VIEW
app.get("/report",(req,res)=>{

db.query("SELECT * FROM daily_activity_report",
(err,result)=>{
if(err) throw err;

res.json(result);
});

});


app.listen(3000,()=>{
console.log("Server running on port 3000");
});