//your JS code here. If required.
    // script.js

document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const checkbox = document.getElementById("checkbox");
  const submitBtn = document.getElementById("submit");
  const existingBtn = document.getElementById("existing");
  const form = document.getElementById("loginForm");

  // Check if credentials exist in localStorage
  function checkStoredCredentials() {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      existingBtn.style.display = "inline-block";
    } else {
      existingBtn.style.display = "none";
    }
  }

  checkStoredCredentials();

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      // Required fields, but form has required attribute so this is just a fallback
      return;
    }

    alert(`Logged in as ${username}`);

    if (checkbox.checked) {
      // Store credentials
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
     
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }

    checkStoredCredentials();
  });

 
  existingBtn.addEventListener("click", () => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      alert(`Logged in as ${storedUsername}`);
    }
  });
});
