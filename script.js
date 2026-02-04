const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "💎"];
const reels = [
  document.getElementById("r1"),
  document.getElementById("r2"),
  document.getElementById("r3"),
  document.getElementById("r4"),
  document.getElementById("r5")
];

const button = document.getElementById("spinBtn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  button.disabled = true;
  result.textContent = "";

  let finalSymbols = [];

  reels.forEach((reel, index) => {
    let spins = 15 + index * 5;
    let count = 0;

    const interval = setInterval(() => {
      reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      count++;

      if (count >= spins) {
        clearInterval(interval);
        finalSymbols[index] = reel.textContent;

        if (finalSymbols.length === 5) {
          checkWin(finalSymbols);
          button.disabled = false;
        }
      }
    }, 70);
  });
});

function checkWin(arr) {
  const counts = {};
  arr.forEach(s => counts[s] = (counts[s] || 0) + 1);
  const max = Math.max(...Object.values(counts));

  if (max === 5) {
    result.textContent = "💥 JACKPOT! 💥";
    result.style.color = "gold";
  } else if (max === 4) {
    result.textContent = "🔥 BÜYÜK KAZANÇ!";
    result.style.color = "orange";
  } else if (max === 3) {
    result.textContent = "✅ KAZANDIN!";
    result.style.color = "lime";
  } else {
    result.textContent = "❌ Kaybettin";
    result.style.color = "#ccc";
  }
}
