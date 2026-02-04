const symbols = ["🍒", "🍋", "🔔", "⭐", "💎"];

const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const result = document.getElementById("result");
const button = document.getElementById("spinBtn");

button.addEventListener("click", () => {
  const r1 = symbols[Math.floor(Math.random() * symbols.length)];
  const r2 = symbols[Math.floor(Math.random() * symbols.length)];
  const r3 = symbols[Math.floor(Math.random() * symbols.length)];

  reel1.textContent = r1;
  reel2.textContent = r2;
  reel3.textContent = r3;

  if (r1 === r2 && r2 === r3) {
    result.textContent = "🎉 KAZANDIN!";
  } else {
    result.textContent = "😅 Tekrar dene";
  }
});
