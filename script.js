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

// Function to generate a new prompt
function generateNewPrompt() {
    const prompts = [
        "A young knight embarks on a quest to recover a lost artifact.",
        "In a world where magic is forbidden, one child discovers they possess great power.",
        "A mysterious map leads a group of adventurers to a forgotten city.",
        "A cursed prince must team up with a rogue to reclaim his kingdom.",
        "A dragon rider is the last hope to save a kingdom from darkness."
    ];

    // Pick a random prompt from the array
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    
    // Display the generated prompt
    displayPrompt(randomPrompt);

    // Save the generated prompt to the 'Prompts' collection
    savePromptToFirebase(randomPrompt);
}

// Function to display the prompt
function displayPrompt(prompt) {
    const promptContainer = document.getElementById('promptContainer');
    promptContainer.textContent = prompt;
}

// Function to save the prompt to the 'Prompts' collection
function savePromptToFirebase(prompt) {
    db.collection('Prompts').add({
        prompt: prompt,
        timestamp: new Date()
    }).then(() => {
        console.log("Prompt saved successfully!");
    }).catch((error) => {
        console.error("Error saving prompt: ", error);
    });
}

// Function to save the story and associated prompt to the 'Stories' collection
function publishStory() {
    const prompt = document.getElementById('promptContainer').textContent;
    const story = document.getElementById('storyText').value;

    // Check if the story and prompt are valid
    if (!prompt || !story) {
        alert("Please generate a prompt and write a story before publishing.");
        return;
    }

    // Save the story and its prompt to the 'Stories' collection
    db.collection('Stories').add({
        prompt: prompt,
        story: story,
        timestamp: new Date()
    }).then(() => {
        alert("Story published successfully!");
        // Clear the textarea
        document.getElementById('storyText').value = '';
    }).catch((error) => {
        console.error("Error publishing story: ", error);
        alert("Failed to publish the story. Please try again.");
    });
}

// Fetch a random prompt on page load (optional)
document.addEventListener('DOMContentLoaded', (event) => {
    generateNewPrompt();
});

// Function to generate a new prompt using a Python script (through a local subprocess)
function generateNewPrompt() {
    // Use Node.js or a Python subprocess to run the script
    const { exec } = require('child_process');
    exec('python path/to/generate_prompt.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            return;
        }

        if (stderr) {
            console.error(`Python script error: ${stderr}`);
            return;
        }

        // Retrieve the generated prompt from the script's output
        const generatedPrompt = stdout.trim();
        
        // Display the generated prompt
        displayPrompt(generatedPrompt);

        // Save the generated prompt to Firebase
        savePromptToFirebase(generatedPrompt);
    });
}
