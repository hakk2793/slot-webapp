let balance = 1000;
let bet = 10;
let auto = false;
let turbo = false;

const symbols = ["🍒", "⭐", "🍇", "🍉"];

const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const reelsEl = document.getElementById("reels");
const resultEl = document.getElementById("result");
const reelCountEl = document.getElementById("reelCount");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const jackpotSound = document.getElementById("jackpotSound");

function updateUI() {
  balanceEl.textContent = balance;
  betEl.textContent = bet;
}

function spin() {
  if (balance < bet) return;

  balance -= bet;
  spinSound.currentTime = 0;
  spinSound.play();

  reelsEl.innerHTML = "";
  let results = [];

  const count = Number(reelCountEl.value);

  for (let i = 0; i < count; i++) {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    results.push(sym);

    const d = document.createElement("div");
    d.className = "reel";
    d.textContent = sym;
    reelsEl.appendChild(d);
  }

  setTimeout(() => checkWin(results), turbo ? 100 : 400);
  updateUI();
}

function checkWin(results) {
  const allSame = results.every(s => s === results[0]);

  if (allSame) {
    const win = bet * results.length * 2;
    balance += win;

    resultEl.textContent = "🎉 JACKPOT!";
    resultEl.className = "result jackpot";
    jackpotSound.currentTime = 0;
    jackpotSound.play();
  } else if (new Set(results).size <= 2) {
    balance += bet * 2;
    resultEl.textContent = "😎 Kazandın!";
    resultEl.className = "result";
    winSound.currentTime = 0;
    winSound.play();
  } else {
    resultEl.textContent = "😢 Kaybettin";
    resultEl.className = "result";
  }

  updateUI();

  if (auto) setTimeout(spin, turbo ? 150 : 600);
}

document.getElementById("spinBtn").onclick = spin;

document.getElementById("autoBtn").onclick = () => auto = !auto;
document.getElementById("turboBtn").onclick = () => turbo = !turbo;

document.getElementById("betPlus").onclick = () => {
  bet += 10;
  updateUI();
};

document.getElementById("betMinus").onclick = () => {
  if (bet > 10) bet -= 10;
  updateUI();
};

updateUI();
