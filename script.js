const heart = document.getElementById("heart");
const scoreDisplay = document.getElementById("score");
const game = document.getElementById("game");
const message = document.getElementById("message");
const ratingSection = document.getElementById("ratingSection");
const slider = document.getElementById("ratingSlider");
const emojiDisplay = document.getElementById("emojiDisplay");
let score = 0;

// Poziționează aleator inima
function moveHeart() {
  const maxX = window.innerWidth - 80;
  const maxY = window.innerHeight - 150;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY + 100;
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
}

// Când apasă pe inimă
heart.addEventListener("click", () => {
  score++;
  scoreDisplay.innerText = `❤️ Prinse: ${score} / 5`;

  if (score >= 5) {
    // fade out game
    game.classList.add("fade-out");

    setTimeout(() => {
      game.style.display = "none";

      // fade in message
      message.classList.remove("hidden");
      message.classList.add("fade-in");

      // afișează sliderul după 30s
      setTimeout(() => {
        ratingSection.classList.remove("hidden");
        ratingSection.classList.add("fade-in");
      }, 30000);
    }, 1000); // așteaptă 1s cât durează animația
  } else {
    moveHeart();
  }
});

moveHeart(); // inițial

// Slider cu emoji
const emojis = ["😡","😟","😕","😐","🙂","😊","😃","😍","🤩","🥰"];
slider.addEventListener("input", () => {
  const val = parseInt(slider.value);
  emojiDisplay.innerText = emojis[val - 1];

  if (val === 10) triggerConfetti();
});

// Confetti (corectat)
function triggerConfetti() {
  const duration = 4000;
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";

  const confetti = [];
  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 2 + 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      tilt: Math.random() * 20 - 10,
    });
  }

  let animationFrame;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.fillStyle = c.color;
      ctx.ellipse(c.x, c.y, c.r, c.r / 2, c.tilt, 0, Math.PI * 2);
      ctx.fill();
    });
    update();
    animationFrame = requestAnimationFrame(draw);
  }

  function update() {
    confetti.forEach(c => {
      c.y += c.d;
      c.x += Math.sin(c.tilt);
      c.tilt += 0.05;
    });
  }

  draw();

  setTimeout(() => {
    cancelAnimationFrame(animationFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
  }, duration);
}