// --- AUDIO HELPER FUNCTION ---
// This safely stops all music so songs don't overlap
function stopAllAudio() {
    const songs = ['promptSong', 'sadSong', 'successSong'];
    songs.forEach(id => {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

// --- AUTOPLAY FIX ---
// Browsers block autoplay. This starts the first song the moment she taps anywhere on the screen.
let firstInteraction = false;
document.body.addEventListener('click', function () {
    if (!firstInteraction && !document.getElementById('mainPrompt').classList.contains('hidden')) {
        const promptSong = document.getElementById('promptSong');
        if (promptSong && promptSong.paused) {
            promptSong.play().catch(e => console.log("Still waiting for interaction"));
        }
        firstInteraction = true;
    }
});


// --- RUNNING BUTTON LOGIC ---
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

const confirmYesBtn = document.getElementById('confirmYesBtn');
confirmYesBtn.addEventListener('mouseover', runAway);
confirmYesBtn.addEventListener('touchstart', runAway);


// --- STATE TRANSITION FUNCTIONS ---

// 1. User clicks "No..." on the first screen
function showConfirmation() {
    // Switch Music
    stopAllAudio();
    document.getElementById('sadSong').play().catch(e => console.log(e));

    // Switch Screens
    document.getElementById('mainPrompt').classList.add('hidden');
    const confirm = document.getElementById('confirmationPrompt');
    confirm.classList.remove('hidden');
    confirm.style.opacity = 1;
}

// 2. User clicks "Wait, No! I'm sorry!" to go back
function goBackToPrompt() {
    // Switch Music back to happy
    stopAllAudio();
    document.getElementById('promptSong').play().catch(e => console.log(e));

    // Switch Screens
    document.getElementById('confirmationPrompt').classList.add('hidden');
    const main = document.getElementById('mainPrompt');
    main.classList.remove('hidden');
    main.style.opacity = 1;
}

// 3. User clicks "YES!"
function celebrateSuccess() {
    // Switch to Final Music
    stopAllAudio();
    document.getElementById('successSong').play().catch(e => console.log(e));

    // Switch to Collage Screen
    document.getElementById('mainPrompt').classList.add('hidden');
    document.getElementById('confirmationPrompt').classList.add('hidden');

    const collage = document.getElementById('collageSection');
    collage.classList.remove('hidden');
    collage.style.opacity = 1;
}