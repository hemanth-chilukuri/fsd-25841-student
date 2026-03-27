document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (email === "" || password === "") {
        errorMsg.textContent = "All fields are required!";
        return;
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            errorMsg.style.color = "green";
            errorMsg.textContent = data.message;
            window.location.href = "dashboard.html"; 
        } else {
            errorMsg.style.color = "red";
            errorMsg.textContent = data.message;
        }
    })
    .catch(() => {
        errorMsg.textContent = "Server not responding!";
    });
});