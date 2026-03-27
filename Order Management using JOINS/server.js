const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));   // to serve HTML, CSS, JS

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventory_system"
});

// Connect Database
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
    } else {
        console.log("Connected to MySQL");
    }
});


// Orders API
app.get("/orders",(req,res)=>{

    const joinQuery = `
        SELECT c.name, p.product_name, o.quantity, o.total_amount
        FROM orders o
        INNER JOIN customers c ON o.customer_id = c.id
        INNER JOIN products p ON o.product_id = p.id
        ORDER BY o.total_amount DESC
    `;

    const highestQuery = `
        SELECT MAX(total_amount) AS highest FROM orders
    `;

    const activeQuery = `
        SELECT c.name
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        GROUP BY c.name
        ORDER BY COUNT(o.id) DESC
        LIMIT 1
    `;

    db.query(joinQuery,(err,orders)=>{
        if(err) throw err;

        db.query(highestQuery,(err2,highest)=>{
            if(err2) throw err2;

            db.query(activeQuery,(err3,active)=>{
                if(err3) throw err3;

                res.json({
                    orders:orders,
                    highest:highest[0].highest,
                    active:active[0].name
                });
            });
        });
    });
});


// Start Server
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});