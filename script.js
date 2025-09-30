//your JS code here. If required.
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const rememberCheckbox = document.getElementById("checkbox");
const submitButton = document.getElementById("submit");
const existingButton = document.getElementById("existing");

window.addEventListener("load", () => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
        existingButton.style.display = "block";
    } else {
        existingButton.style.display = "none";
    }
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault(); 

    const username = usernameInput.value;
    const password = passwordInput.value;

    alert(`Logged in as ${username}`);

    if (rememberCheckbox.checked) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
    } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }
});


existingButton.addEventListener("click", () => {
    const savedUsername = localStorage.getItem("username");
    alert(`Logged in as ${savedUsername}`);
});


