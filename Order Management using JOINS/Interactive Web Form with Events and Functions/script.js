// Reusable validation functions

function validateName(name) {
    return name.length >= 3;
}

function validateEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    return pattern.test(email);
}

function validateRating(rating) {
    return rating >= 1 && rating <= 5;
}

// Keypress validation
document.getElementById("name").addEventListener("keyup", function () {
    if (!validateName(this.value)) {
        this.style.borderColor = "red";
    } else {
        this.style.borderColor = "green";
    }
});

document.getElementById("email").addEventListener("keyup", function () {
    if (!validateEmail(this.value)) {
        this.style.borderColor = "red";
    } else {
        this.style.borderColor = "green";
    }
});

document.getElementById("rating").addEventListener("keyup", function () {
    if (!validateRating(this.value)) {
        this.style.borderColor = "red";
    } else {
        this.style.borderColor = "green";
    }
});

// Double click submit
function submitForm() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value;

    if (!validateName(name) || !validateEmail(email) || !validateRating(rating)) {
        document.getElementById("message").innerText = "Please fix errors before submitting.";
        return;
    }

    fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, rating, comments })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("message").innerText = data.message;
        document.getElementById("feedbackForm").reset();
    });
}