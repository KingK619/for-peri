/* Reusable function to make a button run away */
function runAway(event) {
    const button = event.target;
    button.style.position = 'absolute';

    const maxX = window.innerWidth - button.offsetWidth - 20;
    const maxY = window.innerHeight - button.offsetHeight - 20;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
}

// -----------------------------------------------------------------
// ATTACH RUNNING LISTENERS
// -----------------------------------------------------------------

/* Stage 2 "Yes, I'm sure" button will run away */
const confirmYesBtn = document.getElementById('confirmYesBtn');
confirmYesBtn.addEventListener('mouseover', runAway);
confirmYesBtn.addEventListener('touchstart', runAway);


// -----------------------------------------------------------------
// STATE TRANSITION FUNCTIONS
// -----------------------------------------------------------------

// Call this when the first "No..." button is clicked
function showConfirmation() {
    document.getElementById('mainPrompt').classList.add('hidden');
    const confirm = document.getElementById('confirmationPrompt');
    confirm.classList.remove('hidden');
    confirm.style.opacity = 1;
}

// Call this function when the Main Stage 1 "YES!" button is clicked
function celebrateSuccess() {
    const song = document.getElementById('romanticSong');
    if (song) {
        song.play().catch(error => {
            console.log("Auto-play failed, browser needs user interaction first.", error);
        });
    }

    document.getElementById('mainPrompt').classList.add('hidden');
    document.getElementById('confirmationPrompt').classList.add('hidden');

    const collage = document.getElementById('collageSection');
    collage.classList.remove('hidden');
    collage.style.opacity = 1;
}

// Call this function if Stage 2 is triggered and she clicks "NO, let's go back!"
function goBackToPrompt() {
    document.getElementById('confirmationPrompt').classList.add('hidden');
    const main = document.getElementById('mainPrompt');
    main.classList.remove('hidden');
    main.style.opacity = 1;
}