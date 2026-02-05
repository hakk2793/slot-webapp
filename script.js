const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐"];
const reels = document.querySelectorAll(".reel");
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");
const balanceEl = document.getElementById("balance");

let balance = 1000;
let spinning = false;

// Sesler
const spinSound = new Audio("sounds/spin.m4a");
const winSound = new Audio("sounds/win.m4a");
const jackpotSound = new Audio("sounds/jackpot.m4a");

spinBtn.addEventListener("click", () => {
  if (spinning) return;
  if (balance < 10) {
    resultText.textContent = "💸 Bakiye bitti";
    return;
  }

  spinning = true;
  spinBtn.disabled = true;
  resultText.textContent = "";

  balance -= 10;
  balanceEl.textContent = balance;

  spinSound.currentTime = 0;
  spinSound.play();

  let finalSymbols = [];

  reels.forEach((reel, index) => {
    reel.classList.remove("win");
    reel.classList.add("spinning");

    let count = 0;
    const max = 20 + index * 6;

    const interval = setInterval(() => {
      reel.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];
      count++;

      if (count >= max) {
        clearInterval(interval);

        const final =
          symbols[Math.floor(Math.random() * symbols.length)];
        reel.textContent = final;
        finalSymbols[index] = final;

        reel.classList.remove("spinning");

        if (finalSymbols.length === reels.length) {
          setTimeout(() => {
            checkWin(finalSymbols);
            spinning = false;
            spinBtn.disabled = false;
          }, 300);
        }
      }
    }, 80);
  });
});

function checkWin(arr) {
  const first = arr[0];
  const win = arr.every(s => s === first);

  if (win) {
    const reward = first === "⭐" ? 300 : 100;
    balance += reward;
    balanceEl.textContent = balance;

    reels.forEach(r => r.classList.add("win"));

    if (first === "⭐") {
      jackpotSound.currentTime = 0;
      jackpotSound.play();
      document.body.classList.add("jackpot");
      resultText.textContent = "💥 JACKPOT!";

      setTimeout(() => {
        document.body.classList.remove("jackpot");
      }, 1500);
    } else {
      winSound.currentTime = 0;
      winSound.play();
      resultText.textContent = "🎉 Kazandın!";
    }
  } else {
    resultText.textContent = "😅 Kaybettin";
  }
}
