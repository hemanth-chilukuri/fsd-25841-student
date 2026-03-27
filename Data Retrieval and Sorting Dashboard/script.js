async function loadStudents(){
    const sort = document.getElementById("sortOption").value;
    const dept = document.getElementById("filterDept").value;

    const res = await fetch(/students?sort=${sort}&dept=${dept});
    const students = await res.json();

    let table = "<tr><th>Name</th><th>Department</th></tr>";
    students.forEach(s=>{
        table += <tr><td>${s.name}</td><td>${s.department}</td></tr>;
    });

    document.getElementById("studentTable").innerHTML = table;

    document.getElementById("count").innerText =
        "Total Students: " + students.length;
}