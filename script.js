const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐"];

const reelsBox = document.getElementById("reels");
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");

const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const betPlus = document.getElementById("betPlus");
const betMinus = document.getElementById("betMinus");
const reelSelect = document.getElementById("reelCount");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const jackpotSound = document.getElementById("jackpotSound");

let balance = 1000;
let bet = 40;
let spinning = false;

// BET ARTIR / AZALT
betPlus.onclick = () => {
  if (bet + 10 <= balance) {
    bet += 10;
    betEl.textContent = bet;
  }
};

betMinus.onclick = () => {
  if (bet > 10) {
    bet -= 10;
    betEl.textContent = bet;
  }
};

// MAKARALARI OLUŞTUR
function createReels(count) {
  reelsBox.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className = "reel";
    div.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    reelsBox.appendChild(div);
  }
}

createReels(Number(reelSelect.value));

reelSelect.onchange = () => {
  createReels(Number(reelSelect.value));
};

// SPIN
spinBtn.onclick = () => {
  if (spinning) return;
  if (balance < bet) {
    resultText.textContent = "💸 Bakiye yetersiz";
    return;
  }

  spinning = true;
  resultText.textContent = "";

  balance -= bet;
  balanceEl.textContent = balance;

  spinSound.currentTime = 0;
  spinSound.play();

  const reels = document.querySelectorAll(".reel");
  let final = [];

  reels.forEach((reel, i) => {
    let count = 0;
    const interval = setInterval(() => {
      reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      count++;

      if (count > 15 + i * 5) {
        clearInterval(interval);
        const sym = symbols[Math.floor(Math.random() * symbols.length)];
        reel.textContent = sym;
        final[i] = sym;

        if (final.length === reels.length) {
          setTimeout(() => checkWin(final), 300);
        }
      }
    }, 80);
  });
};

function checkWin(arr) {
  const first = arr[0];
  const win = arr.every(s => s === first);

  document.querySelectorAll(".reel").forEach(r => r.classList.remove("win"));

  if (win) {
    const reward = first === "⭐" ? bet * 10 : bet * 3;
    balance += reward;
    balanceEl.textContent = balance;

    document.querySelectorAll(".reel").forEach(r => r.classList.add("win"));

    if (first === "⭐") {
      jackpotSound.currentTime = 0;
      jackpotSound.play();
      resultText.textContent = "💥 JACKPOT!";
    } else {
      winSound.currentTime = 0;
      winSound.play();
      resultText.textContent = "🎉 Kazandın!";
    }
  } else {
    resultText.textContent = "😅 Kaybettin";
  }

  spinning = false;
}
