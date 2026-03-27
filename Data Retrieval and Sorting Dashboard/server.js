const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // folder for html css js

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Akash@2004",       // your mysql password
    database: "student_system"
});

db.connect(err => {
    if(err) throw err;
    console.log("MySQL Connected");
});


// API to get students with sorting and filtering
app.get("/students", (req,res)=>{

    let sort = req.query.sort;
    let dept = req.query.dept;

    let query = "SELECT * FROM students";

    if(dept){
        query += ` WHERE department='${dept}'`;
    }

    if(sort){
        query += ` ORDER BY ${sort}`;
    }

    db.query(query,(err,result)=>{
        if(err) throw err;

        // Count students per department
        db.query(
            "SELECT department, COUNT(*) AS total FROM students GROUP BY department",
            (err2,count)=>{
                if(err2) throw err2;

                res.json({
                    students: result,
                    count: count
                });
            }
        );

    });

});


// Start server
app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
});