document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const helpDeskBtn = document.getElementById('helpDeskBtn');
    const userDropdownToggle = document.getElementById('userDropdownToggle');
    const loggedInUsernameSpan = document.getElementById('loggedInUsername');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const logoutLink = document.getElementById('logoutLink');

    const loginModal = document.getElementById('loginModal');
    const closeButton = document.querySelector('.close-button');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    let messageDisplay = document.getElementById('loginMessage');

    // New elements for mobile responsiveness
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navbarCollapse = document.getElementById('navbarCollapse');

    // Define multiple hardcoded accounts (for client-side demo only)
    const accounts = [
        { username: "user1", password: "password1" },
        { username: "user2", password: "password2" },
        { username: "admin", password: "adminpass" } // Example admin account
    ];

    // Function to handle UI state after login/logout
    // Now reads from localStorage to persist login state across sessions
    function setLoggedInState(isLoggedIn, username = '') {
        if (isLoggedIn) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUsername', username);
            loginButton.classList.add('hidden'); // Hide login button
            userDropdownToggle.classList.remove('hidden'); // Show user dropdown toggle
            loggedInUsernameSpan.textContent = username; // Set username
            // Ensure the dropdown menu is hidden initially when the user logs in,
            // it will be shown on click of userDropdownToggle
            userDropdownMenu.classList.add('hidden');
            userDropdownMenu.classList.remove('show'); // Ensure 'show' class is not present
            helpDeskBtn.classList.remove('hidden'); // Show "SUPPORT DESK" on login
        } else {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUsername');
            loginButton.classList.remove('hidden'); // Show login button
            userDropdownToggle.classList.add('hidden'); // Hide user dropdown toggle
            userDropdownMenu.classList.add('hidden'); // Ensure dropdown is hidden on logout
            userDropdownMenu.classList.remove('show'); // Ensure 'show' class is not present
            getStartedBtn.classList.remove('hidden'); // Show "GET STARTED" on logout
        }
    }

    // Check login status on page load
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUsername = localStorage.getItem('loggedInUsername');
    if (storedLoggedIn === 'true' && storedUsername) {
        setLoggedInState(true, storedUsername);
    } else {
        setLoggedInState(false);
    }

    // --- Login Modal Functionality ---
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            loginModal.style.display = 'block';
            messageDisplay.textContent = ''; // Clear any previous messages
            messageDisplay.className = 'message-display'; // Reset class
            usernameInput.value = ''; // Clear input fields
            passwordInput.value = '';
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            loginModal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
        // Close dropdown if clicked outside, but not if clicking toggle or inside dropdown
        if (userDropdownMenu && !userDropdownMenu.contains(event.target) && event.target !== userDropdownToggle) {
            if (userDropdownMenu.classList.contains('show')) {
                userDropdownMenu.classList.remove('show');
                userDropdownMenu.classList.add('hidden');
            }
        }
    });

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Simple validation (client-side only for demo)
            const foundAccount = accounts.find(account => account.username === username && account.password === password);

            if (foundAccount) {
                messageDisplay.textContent = 'Login successful!';
                messageDisplay.className = 'message-display success';
                setTimeout(() => {
                    loginModal.style.display = 'none';
                    setLoggedInState(true, foundAccount.username);
                }, 1000); // Close modal and update UI after 1 second
            } else {
                messageDisplay.textContent = 'Invalid username or password.';
                messageDisplay.className = 'message-display error';
            }
        });
    }

    // --- User Dropdown Toggle ---
    if (userDropdownToggle) {
        userDropdownToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent document click from closing it immediately

            // Toggle the 'show' class
            userDropdownMenu.classList.toggle('show');

            // Based on whether 'show' is now present, add or remove 'hidden'
            if (userDropdownMenu.classList.contains('show')) {
                userDropdownMenu.classList.remove('hidden');
            } else {
                userDropdownMenu.classList.add('hidden');
            }
        });
    }

    // --- Logout Functionality ---
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            setLoggedInState(false); // Revert UI to logged out state and clear localStorage
            console.log("User logged out.");
            // In a real application, you'd also invalidate any session tokens here.
        });
    }

    // --- Hamburger Menu Toggle ---
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
            hamburgerMenu.classList.toggle('active'); // For hamburger animation
            // Close dropdown if mobile menu opens
            if (userDropdownMenu.classList.contains('show')) {
                userDropdownMenu.classList.remove('show');
                userDropdownMenu.classList.add('hidden'); // Ensure dropdown is hidden
            }
        });
    }
});
