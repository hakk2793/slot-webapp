const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐", "💎"];
const reels = [
  document.getElementById("r1"),
  document.getElementById("r2"),
  document.getElementById("r3"),
  document.getElementById("r4"),
  document.getElementById("r5")
];

const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");
const balanceEl = document.getElementById("balance");
const slotBox = document.getElementById("slotBox");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const jackpotSound = document.getElementById("jackpotSound");

let balance = 1000;
const spinCost = 10;

spinBtn.addEventListener("click", () => {
  if (balance < spinCost) {
    result.textContent = "💸 Yetersiz bakiye!";
    return;
  }

  balance -= spinCost;
  balanceEl.textContent = balance;

  spinBtn.disabled = true;
  result.textContent = "";
  slotBox.className = "slot";

  spinSound.currentTime = 0;
  spinSound.play();

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
          spinBtn.disabled = false;
        }
      }
    }, 70);
  });
});

function checkWin(arr) {
  const counts = {};
  arr.forEach(s => counts[s] = (counts[s] || 0) + 1);
  const max = Math.max(...Object.values(counts));

  let win = 0;

  if (max === 5) {
    win = 500;
    result.textContent = "💥 JACKPOT!";
    slotBox.classList.add("jackpot");
    jackpotSound.play();
  } else if (max === 4) {
    win = 100;
    result.textContent = "🔥 Büyük Kazanç!";
    slotBox.classList.add("win");
    winSound.play();
  } else if (max === 3) {
    win = 30;
    result.textContent = "✅ Kazandın!";
    slotBox.classList.add("win");
    winSound.play();
  } else {
    result.textContent = "❌ Kaybettin";
  }

  balance += win;
  balanceEl.textContent = balance;
}
