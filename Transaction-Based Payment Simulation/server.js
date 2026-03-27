const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Akash@2004",
    database: "payment_system"
});

db.connect((err)=>{
    if(err) throw err;
    console.log("MySQL Connected");
});


// Payment Transaction API
app.post("/payment",(req,res)=>{

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const amount = req.body.amount;

    // Start Transaction
    db.beginTransaction((err)=>{
        if(err) throw err;

        // Deduct money from sender
        db.query(
            "UPDATE accounts SET balance = balance - ? WHERE id = ?",
            [amount,sender],
            (err,result)=>{
                if(err){
                    return db.rollback(()=>{
                        res.send("Transaction Failed - Rollback Done");
                    });
                }

                // Add money to receiver
                db.query(
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?",
                    [amount,receiver],
                    (err,result)=>{
                        if(err){
                            return db.rollback(()=>{
                                res.send("Transaction Failed - Rollback Done");
                            });
                        }

                        // Commit Transaction
                        db.commit((err)=>{
                            if(err){
                                return db.rollback(()=>{
                                    res.send("Commit Failed - Rollback Done");
                                });
                            }

                            res.send("Payment Successful - Transaction Committed");
                        });

                    }
                );

            }
        );

    });

});


// Start Server
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});