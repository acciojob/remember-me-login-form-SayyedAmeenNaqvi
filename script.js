//your JS code here. If required.
// your JS code here.

document.addEventListener('DOMContentLoaded', () => {
    // Get references to all necessary DOM elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const checkbox = document.getElementById('checkbox');
    const existingButton = document.getElementById('existing');

    const LOCAL_STORAGE_USERNAME_KEY = 'savedUsername';
    const LOCAL_STORAGE_PASSWORD_KEY = 'savedPassword';

    // --- 1. Initial State Check (Persisting Login Data) ---
    /**
     * Checks localStorage for saved credentials and updates the UI accordingly.
     */
    function checkExistingCredentials() {
        const savedUsername = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
        
        if (savedUsername) {
            // If credentials exist, show the "Login as existing user" button
            existingButton.style.display = 'block';
        } else {
            // Ensure the button is hidden if no credentials are saved
            existingButton.style.display = 'none';
        }
    }

    // --- 2. Form Submission Behavior ---
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission and page reload

        const username = usernameInput.value;
        const password = passwordInput.value;
        const shouldRemember = checkbox.checked;

        // Display the required success alert
        alert(`Logged in as ${username}`);

        if (shouldRemember) {
            // If "Remember Me" is checked, store credentials
            localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username);
            localStorage.setItem(LOCAL_STORAGE_PASSWORD_KEY, password);
        } else {
            // If unchecked, remove any previously stored credentials
            localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
            localStorage.removeItem(LOCAL_STORAGE_PASSWORD_KEY);
        }
        
        // Update the visibility of the "existing user" button after submission
        checkExistingCredentials();

        // Optional: Clear form fields after successful login
        usernameInput.value = '';
        passwordInput.value = '';
        checkbox.checked = false;
    });

  
    existingButton.addEventListener('click', () => {
        const savedUsername = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
        
        if (savedUsername) {

            alert(`Logged in as ${savedUsername}`);
        }
       
    });

   
    checkExistingCredentials();
});