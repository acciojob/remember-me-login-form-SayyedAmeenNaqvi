//your JS code here. If required.
// your JS code here.
// Select elements
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const checkbox = document.getElementById("checkbox");
const submitBtn = document.getElementById("submit");
const existingUserBtn = document.getElementById("existing");
const form = document.getElementById("loginForm");

const savedUsername = localStorage.getItem("username");
const savedPassword = localStorage.getItem("password");

if (savedUsername && savedPassword) {
  existingUserBtn.style.display = "block";
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Alert on login
  alert(`Logged in as ${username}`);

 
  if (checkbox.checked) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    existingUserBtn.style.display = "block";
  } else {

    localStorage.removeItem("username");
    localStorage.removeItem("password");
    existingUserBtn.style.display = "none";
  }
});

existingUserBtn.addEventListener("click", function () {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    alert(`Logged in as ${storedUsername}`);
  }
});
