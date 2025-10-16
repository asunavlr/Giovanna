// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionContainer = document.querySelector('.buttons');
const overlay = document.getElementById('overlay');
const againBtn = document.getElementById('againBtn');

// Place buttons nicely to start (keeps layout while allowing absolute movement later)
function placeInitial() {
  // Keep normal flow initially
  noBtn.style.position = 'relative';
  noBtn.style.left = '0px';
  noBtn.style.top = '0px';
  noBtn.style.transform = 'none';
}
placeInitial();

// Evasive "No" button: hops to a random spot within the buttons container
function moveNoButton() {
  const containerRect = questionContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxLeft = containerRect.width - btnRect.width - 10; // padding
  const maxTop = containerRect.height - btnRect.height - 10;

  const newLeft = Math.max(6, Math.floor(Math.random() * maxLeft));
  const newTop = Math.max(6, Math.floor(Math.random() * maxTop));
  const rotate = (Math.random() * 30 - 15).toFixed(1);

  noBtn.style.position = 'absolute';
  noBtn.style.left = `${newLeft}px`;
  noBtn.style.top = `${newTop}px`;
  // Use CSS variable so rotation and hover scale can coexist
  noBtn.style.setProperty('--r', `${rotate}deg`);
}

// Trigger movement on mouseover or touch (for mobile)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
}, { passive: false });

// Sweet celebration when clicking Yes
yesBtn.addEventListener('click', () => {
  overlay.classList.remove('hidden');
  throwHearts(2200);
});

// Close overlay and reset
againBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  placeInitial();
});

// Heart confetti animation
function throwHearts(durationMs = 2000) {
  const start = performance.now();
  const emojis = ['💖', '💘', '💝', '💕', '💗', '❤️'];

  function spawn() {
    const now = performance.now();
    if (now - start > durationMs) return;

    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${(Math.random() * 1.2 + 1.1).toFixed(2)}rem`;
    heart.style.setProperty('--dur', `${(Math.random() * 2 + 3).toFixed(2)}s`);
    document.body.appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());

    // Spawn more
    setTimeout(spawn, Math.random() * 120);
  }
  spawn();
}