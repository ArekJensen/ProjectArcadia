// Function to switch sections
function switchSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Function to open modal
function openModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

// Function to close modal
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const darkModeElements = document.querySelectorAll('.cta-btn, .publish-btn, .login-btn, .modal-content, .story-container');

    body.classList.toggle('dark-mode');
    navbar.classList.toggle('dark-mode');

    darkModeElements.forEach(element => {
        element.classList.toggle('dark-mode');
    });

    // Save dark mode preference in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Load dark mode preference from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        toggleDarkMode(); // Apply dark mode if enabled
    }
});

// Function to show login section in the modal
function showLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('signupSection').style.display = 'none';
}

// Function to show signup section in the modal
function showSignup() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
}