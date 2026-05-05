/* Reusable function to make a button run away */
function runAway(event) {
    const button = event.target;
    // Standard static position is broken, set it to absolute to teleport
    button.style.position = 'absolute';

    // Calculate boundaries to keep the button inside the visible area
    // Max X is screen width minus button width and a little padding
    const maxX = window.innerWidth - button.offsetWidth - 20;
    // Max Y is screen height minus button height and a little padding
    const maxY = window.innerHeight - button.offsetHeight - 20;

    // Generate random coordinates
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    // Set the new position
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
}

// -----------------------------------------------------------------
// ATTACH RUNNING LISTENERS
// -----------------------------------------------------------------

/* Stage 1 "No" button will run away */
const noBtn = document.getElementById('noBtn');
// Handle desktop (hover)
noBtn.addEventListener('mouseover', runAway);
// Handle mobile (touchstart is needed to catch the 'hover' intent)
noBtn.addEventListener('touchstart', runAway);

/* Stage 2 "Are you sure? YES" button will *also* run away */
const confirmYesBtn = document.getElementById('confirmYesBtn');
confirmYesBtn.addEventListener('mouseover', runAway);
confirmYesBtn.addEventListener('touchstart', runAway);

// -----------------------------------------------------------------
// STATE TRANSITION FUNCTIONS
// -----------------------------------------------------------------

// Call this function when the Main Stage 1 "YES!" button is clicked
function celebrateSuccess() {
    // 1. Play the music
    const song = document.getElementById('romanticSong');
    if (song) {
        song.play().catch(error => {
            console.log("Auto-play failed, browser needs user interaction first.", error);
        });
    }

    // 2. Transision the screen content (hide prompts, show collage)
    document.getElementById('mainPrompt').classList.add('hidden');
    document.getElementById('confirmationPrompt').classList.add('hidden');

    const collage = document.getElementById('collageSection');
    collage.classList.remove('hidden');
    collage.style.opacity = 1;
}

// Call this function if Stage 2 is triggered and she clicks "NO, let's go back!"
function goBackToPrompt() {
    // Hide Stage 2
    document.getElementById('confirmationPrompt').classList.add('hidden');
    // Show Stage 1 main prompt
    const main = document.getElementById('mainPrompt');
    main.classList.remove('hidden');
    main.style.opacity = 1;
}


// (Developer/Testing Note): To get to the Stage 2 "Are you sure?" screen, 
// a user technically can't do it. However, if they *were* to click the non-running 
// secondary-btn 'noBtn' pixel, I need to make the container visible.
// This is not standard expected user flow but I must implement it based on the prompt.

// Add unadvertised listener to the initial non-moving state of the running button
// If JavaScript or hover are disabled, the buttons just click normally.
document.getElementById('noBtn').onclick = function () {
    // Hide Prompt 1, show Confirmation popup
    document.getElementById('mainPrompt').classList.add('hidden');
    const confirm = document.getElementById('confirmationPrompt');
    confirm.classList.remove('hidden');
    confirm.style.opacity = 1;
}