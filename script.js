let balance = Number(localStorage.getItem("balance")) || 1000;
let freeSpin = Number(localStorage.getItem("freeSpin")) || 0;
let bet = Number(localStorage.getItem("bet")) || 10;

let auto = false;
let turbo = false;

const symbols = ["🍒","⭐","🍇","🍉"];

const balanceEl = document.getElementById("balance");
const freeSpinEl = document.getElementById("freeSpin");
const betEl = document.getElementById("bet");
const reelsEl = document.getElementById("reels");
const resultEl = document.getElementById("result");
const overlay = document.getElementById("jackpotOverlay");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const jackpotSound = document.getElementById("jackpotSound");

function save() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("freeSpin", freeSpin);
  localStorage.setItem("bet", bet);
}

function updateUI() {
  balanceEl.textContent = balance;
  freeSpinEl.textContent = freeSpin;
  betEl.textContent = bet;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(()=>{});
}

function spin() {
  if (balance < bet && freeSpin <= 0) return;

  if (freeSpin > 0) freeSpin--;
  else balance -= bet;

  playSound(spinSound);

  reelsEl.innerHTML = "";
  let res = [];

  for (let i = 0; i < 3; i++) {
    let s = symbols[Math.floor(Math.random() * symbols.length)];
    res.push(s);
    let d = document.createElement("div");
    d.className = "reel";
    d.textContent = s;
    reelsEl.appendChild(d);
  }

  setTimeout(()=>checkWin(res), turbo ? 100 : 400);
  save();
  updateUI();
}

function checkWin(res) {
  const win = res.every(v => v === res[0]);

  if (win) {
    balance += bet * 5;
    playSound(jackpotSound);
    overlay.classList.add("show");
    setTimeout(()=>overlay.classList.remove("show"),1500);
    resultEl.textContent = "🔥 JACKPOT!";
  } else {
    resultEl.textContent = "😅 Kaybettin";
  }

  save();
  updateUI();
  if (auto) setTimeout(spin, turbo ? 150 : 600);
}

/* BET */
document.getElementById("betPlus").onclick = () => {
  if (bet < 100) bet += 10;
  updateUI(); save();
};
document.getElementById("betMinus").onclick = () => {
  if (bet > 10) bet -= 10;
  updateUI(); save();
};

/* BUTTONS */
document.getElementById("spinBtn").onclick = spin;
document.getElementById("autoBtn").onclick = () => auto = !auto;
document.getElementById("turboBtn").onclick = () => turbo = !turbo;

document.getElementById("bonusBtn").onclick = () => {
  freeSpin += 10;
  updateUI(); save();
};

updateUI();
