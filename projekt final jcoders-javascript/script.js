const levels = [
  ["cat", "sun", "dog"],
  ["apple", "chair", "table"],
  ["javascript", "hangman", "computer"]
];

let level = 0;
let word = "";
let display = [];
let tries = 6;
let guessed = [];

const wordDiv = document.getElementById("word");
const triesSpan = document.getElementById("tries");
const message = document.getElementById("message");
const levelText = document.getElementById("level");

const canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");

function startLevel() {
  word = levels[level][Math.floor(Math.random() * levels[level].length)];
  display = Array(word.length).fill("_");
  tries = 6;
  guessed = [];
  message.textContent = "";
  clearCanvas();
  drawBase();
  updateUI();
}

function updateUI() {
  wordDiv.textContent = display.join(" ");
  triesSpan.textContent = tries;
  levelText.textContent = `Level ${level + 1}`;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBase() {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#555";
  ctx.beginPath();
  ctx.moveTo(20, 230);
  ctx.lineTo(180, 230);
  ctx.moveTo(60, 230);
  ctx.lineTo(60, 20);
  ctx.lineTo(130, 20);
  ctx.lineTo(130, 40);
  ctx.stroke();
}

function drawHangman() {
  ctx.strokeStyle = "#e74c3c";
  switch (tries) {
    case 5: // head
      ctx.beginPath();
      ctx.arc(130, 60, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 4: // body
      ctx.beginPath();
      ctx.moveTo(130, 80);
      ctx.lineTo(130, 140);
      ctx.stroke();
      break;
    case 3: // left arm
      ctx.beginPath();
      ctx.moveTo(130, 100);
      ctx.lineTo(100, 120);
      ctx.stroke();
      break;
    case 2: // right arm
      ctx.beginPath();
      ctx.moveTo(130, 100);
      ctx.lineTo(160, 120);
      ctx.stroke();
      break;
    case 1: // left leg
      ctx.beginPath();
      ctx.moveTo(130, 140);
      ctx.lineTo(110, 180);
      ctx.stroke();
      break;
    case 0: // right leg
      ctx.beginPath();
      ctx.moveTo(130, 140);
      ctx.lineTo(150, 180);
      ctx.stroke();
      break;
  }
}

document.getElementById("guessBtn").addEventListener("click", () => {
  const input = document.getElementById("guessInput");
  const guess = input.value.toLowerCase();
  input.value = "";

  if (!guess || guessed.includes(guess)) return;
  guessed.push(guess);

  if (word.includes(guess)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) display[i] = guess;
    }
  } else {
    tries--;
    drawHangman();
  }

  if (!display.includes("_")) {
    message.textContent = " Level Complete!";
    level++;
    if (level < levels.length) {
      setTimeout(startLevel, 1200);
    } else {
      message.textContent = " You beat all levels!";
    }
  } else if (tries === 0) {
    message.textContent = `Game Over! Word was "${word}"`;
  }

  updateUI();
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

startLevel();