const symbols = ["🍒","🍋","🍉","🍇","⭐"];

const reelsContainer = document.getElementById("reels");
const reelSelect = document.getElementById("reelCount");
const spinBtn = document.getElementById("spinBtn");
const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const resultText = document.getElementById("result");

const betPlus = document.getElementById("betPlus");
const betMinus = document.getElementById("betMinus");

let balance = 1000;
let bet = 10;
let spinning = false;

/* 🔊 SES */
let spinSound, winSound, jackpotSound;

function createReels(count) {
  reelsContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className = "reel";
    div.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    reelsContainer.appendChild(div);
  }
}

createReels(reelSelect.value);

reelSelect.onchange = () => {
  if (spinning) return;
  createReels(reelSelect.value);
};

/* ➕➖ BAHİS */
betPlus.onclick = () => {
  if (spinning) return;
  bet += 10;
  betEl.textContent = bet;
};

betMinus.onclick = () => {
  if (spinning || bet <= 10) return;
  bet -= 10;
  betEl.textContent = bet;
};

/* 🎰 SPIN */
spinBtn.onclick = () => {
  if (spinning || balance < bet) return;

  spinSound = new Audio("sounds/spin.m4a");
  winSound = new Audio("sounds/win.m4a");
  jackpotSound = new Audio("sounds/jackpot.m4a");
  spinSound.play();

  spinning = true;
  balance -= bet;
  balanceEl.textContent = balance;
  resultText.textContent = "";

  const reels = document.querySelectorAll(".reel");
  let result = [];

  reels.forEach((reel, i) => {
    reel.classList.add("spinning");
    let count = 0;
    const max = 20 + i * 6;

    const interval = setInterval(() => {
      reel.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      count++;

      if (count >= max) {
        clearInterval(interval);
        const final = symbols[Math.floor(Math.random()*symbols.length)];
        reel.textContent = final;
        result[i] = final;
        reel.classList.remove("spinning");

        if (result.filter(Boolean).length === reels.length) {
          setTimeout(() => finishSpin(result), 300);
        }
      }
    }, 80);
  });
};

function finishSpin(arr) {
  spinning = false;

  const win = arr.every(s => s === arr[0]);
  const reelCount = arr.length;

  if (win) {
    const multiplier = reelCount === 3 ? 3 : reelCount === 5 ? 5 : 10;
    const reward = arr[0] === "⭐" ? bet * multiplier * 2 : bet * multiplier;

    balance += reward;
    balanceEl.textContent = balance;

    document.querySelectorAll(".reel").forEach(r => r.classList.add("win"));

    arr[0] === "⭐" ? jackpotSound.play() : winSound.play();
    resultText.textContent = "🎉 Kazandın +" + reward;
  } else {
    resultText.textContent = "😅 Kaybettin";
  }
}
