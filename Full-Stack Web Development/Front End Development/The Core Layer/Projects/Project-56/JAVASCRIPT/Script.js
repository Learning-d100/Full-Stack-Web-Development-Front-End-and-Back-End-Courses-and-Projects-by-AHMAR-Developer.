// Animate on Scroll Duration
AOS.init(
    {
        duration: 1500
    }
);
const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

let attemptCount = 0;
const maxAttempts = 3;
const lockoutTime = 30; // in seconds
let isLockedOut = false;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset error messages and classes
    email.parentElement.className = 'input-field';
    password.parentElement.className = 'input-field';
    emailError.textContent = "";
    passwordError.textContent = "";

    // Check if the user is locked out
    if (isLockedOut) {
        alert(`You are locked out. Please try again in ${lockoutTime} seconds.`);
        return;
    }

    let valid = true;

    if (email.value.trim() === "") {
        emailError.style.display = "block";
        email.parentElement.className = 'input-field error';
        emailError.textContent = "Email is required";
        valid = false;
    } else {
        email.parentElement.className = "input-field success";
    }

    if (password.value.trim() === "") {
        passwordError.style.display = "block";
        password.parentElement.className = 'input-field error';
        passwordError.textContent = "Password is required";
        valid = false;
    } else if (password.value.trim().length < 3) {
        passwordError.style.display = "block";
        password.parentElement.className = 'input-field error';
        passwordError.textContent = "Password must be at least 3 characters.";
        valid = false;
    } else if (password.value.trim().length > 15) {
        passwordError.style.display = "block";
        password.parentElement.className = 'input-field error';
        passwordError.textContent = "Password must be less than 15 characters.";
        valid = false;
    } else {
        password.parentElement.className = "input-field success";
    }

    if (valid) {
        // Simulate a login check (replace with actual login logic)
        if (email.value === "test@example.com" && password.value === "password") {
            console.log("Login successful!");
            // Reset attempt count on successful login
            attemptCount = 0;
        } else {
            attemptCount++;
            emailError.textContent = "Invalid email or password.";
            passwordError.textContent = "Invalid email or password.";
            emailError.style.display = "block";
            passwordError.style.display = "block";

            if (attemptCount >= maxAttempts) {
                isLockedOut = true;
                alert("Too many failed attempts. Please wait 30 seconds before trying again.");
                startCountdown();
            }
        }
    }
});

function startCountdown() {
    let countdown = lockoutTime;
    const countdownInterval = setInterval(() => {
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            isLockedOut = false;
            alert("You can try logging in again now.");
        } else {
            countdown--;
        }
    }, 1000);
}
