//your JS code here. If required.
// your JS code here.

describe('Login Form with Remember Me Functionality', () => {

    // Define the URL and local storage keys for consistent testing
    const URL = '/'; // Assuming the test runner serves index.html at the root
    const USERNAME_KEY = 'savedUsername';
    const PASSWORD_KEY = 'savedPassword';
    const TEST_USERNAME = 'testuser123';
    const TEST_PASSWORD = 'securepassword';

    // Before each test, clear localStorage to ensure a clean slate
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit(URL);
    });

    // --- Test 1: Checking Initial Form Display ---
    it('1. Checks initial form display and state', () => {
        // Ensure the form and its elements are present
        cy.get('form#loginForm').should('exist');
        cy.get('input#username').should('exist');
        cy.get('input#password').should('exist');
        cy.get('button#submit').should('exist');
        
        // Ensure input fields are empty
        cy.get('input#username').should('have.value', '');
        cy.get('input#password').should('have.value', '');

        // Checkbox should be unchecked by default
        cy.get('input#checkbox').should('not.be.checked');

        // "Login as existing user" button should not be visible initially
        cy.get('button#existing').should('not.be.visible');
    });

    // --- Test 2: Submitting Without "Remember Me" ---
    it('2. Submits without "Remember Me" and verifies no local storage saving', () => {
        // Stub the window alert to capture the message
        const stub = cy.stub();
        cy.on('window:alert', stub);

        // Enter credentials
        cy.get('input#username').type(TEST_USERNAME);
        cy.get('input#password').type(TEST_PASSWORD);
        // Ensure checkbox is unchecked (default state, but explicit check)
        cy.get('input#checkbox').should('not.be.checked'); 

        // Submit the form
        cy.get('button#submit').click();

        // 1. Verify the alert message
        cy.wrap(stub).should('be.calledWith', `Logged in as ${TEST_USERNAME}`);

        // 2. Verify localStorage is empty
        cy.window().its('localStorage').invoke('getItem', USERNAME_KEY).should('be.null');
        cy.window().its('localStorage').invoke('getItem', PASSWORD_KEY).should('be.null');
        
        // 3. Verify the existing button is still hidden
        cy.get('button#existing').should('not.be.visible');
    });
    
    // --- Test 3: Submitting With "Remember Me" Checked & Reload Persistence ---
    it('3. Submits with "Remember Me" checked, saves credentials, and shows existing user button after reload', () => {
        // Stub the window alert
        const stub = cy.stub();
        cy.on('window:alert', stub);
        
        // Enter credentials and check the box
        cy.get('input#username').type(TEST_USERNAME);
        cy.get('input#password').type(TEST_PASSWORD);
        cy.get('input#checkbox').check(); 

        // Submit the form
        cy.get('button#submit').click();
        
        // 1. Verify credentials are stored in localStorage
        cy.window().its('localStorage').invoke('getItem', USERNAME_KEY).should('eq', TEST_USERNAME);
        cy.window().its('localStorage').invoke('getItem', PASSWORD_KEY).should('eq', TEST_PASSWORD);
        
        // 2. Reload the page
        cy.reload(); 
        
        // 3. Verify the "Login as existing user" button is now visible
        cy.get('button#existing').should('be.visible');
    });

    // --- Test 4: Logging in as Existing User ---
    it('4. Logs in as existing user and verifies alert message', () => {
        // Manually set credentials in localStorage to simulate prior login
        cy.window().then((win) => {
            win.localStorage.setItem(USERNAME_KEY, TEST_USERNAME);
        });
        
        // Reload the page so the JS runs the initial check and shows the button
        cy.visit(URL); 

        // Stub the window alert
        const stub = cy.stub();
        cy.on('window:alert', stub);

        // 1. Ensure the button is visible
        cy.get('button#existing').should('be.visible');
        
        // 2. Click the "Login as existing user" button
        cy.get('button#existing').click();

        // 3. Verify the correct alert message is displayed
        cy.wrap(stub).should('be.calledWith', `Logged in as ${TEST_USERNAME}`);
    });
    
    // --- Edge Case: Removing credentials by unchecking "Remember Me" ---
    it('Edge Case: Unchecking "Remember Me" removes stored credentials', () => {
        const OTHER_USER = 'tempuser';
        
        // 1. Simulate prior login with Remember Me checked (Test 3 scenario)
        cy.window().then((win) => {
            win.localStorage.setItem(USERNAME_KEY, TEST_USERNAME);
            win.localStorage.setItem(PASSWORD_KEY, TEST_PASSWORD);
        });
        cy.visit(URL); // Reload to show the 'existing' button

        // Verify the existing button is visible initially
        cy.get('button#existing').should('be.visible');
        
   
        cy.get('input#username').type(OTHER_USER);
        cy.get('input#password').type(TEST_PASSWORD);
        cy.get('input#checkbox').should('not.be.checked'); // Ensure unchecked
        
        cy.get('button#submit').click();

       
        cy.window().its('localStorage').invoke('getItem', USERNAME_KEY).should('be.null');
        cy.window().its('localStorage').invoke('getItem', PASSWORD_KEY).should('be.null');
        
       
        cy.reload();
        cy.get('button#existing').should('not.be.visible');
    });

});