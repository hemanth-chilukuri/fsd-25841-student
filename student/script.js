// Insert Student
document.getElementById("studentForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const data = {
        name: name.value,
        email: email.value,
        dob: dob.value,
        department: department.value,
        phone: phone.value
    };

    await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Student Registered Successfully!");
});

// Retrieve Students
async function loadStudents(){
    const res = await fetch("/students");
    const students = await res.json();

    let table = "<tr><th>Name</th><th>Email</th><th>Department</th></tr>";

    students.forEach(s=>{
        table += `<tr>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.department}</td>
                  </tr>`;
    });

    document.getElementById("studentTable").innerHTML = table;
}