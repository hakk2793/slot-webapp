let balance = Number(localStorage.getItem("balance")) || 1000;
let freeSpin = Number(localStorage.getItem("freeSpin")) || 0;
let bet = 10;
let auto = false;
let turbo = false;

const symbols = ["🍒","⭐","🍇","🍉"];

const balanceEl = document.getElementById("balance");
const freeSpinEl = document.getElementById("freeSpin");
const reelsEl = document.getElementById("reels");
const resultEl = document.getElementById("result");
const reelCountEl = document.getElementById("reelCount");

const overlay = document.getElementById("jackpotOverlay");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const jackpotSound = document.getElementById("jackpotSound");

function save() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("freeSpin", freeSpin);
}

function updateUI() {
  balanceEl.textContent = balance;
  freeSpinEl.textContent = freeSpin;
}

function spin() {
  if (overlay.classList.contains("show")) return;
  if (balance < bet && freeSpin <= 0) return;

  if (freeSpin > 0) {
    freeSpin--;
  } else {
    balance -= bet;
  }

  spinSound.currentTime = 0;
  spinSound.play();

  reelsEl.innerHTML = "";
  let res = [];
  let count = Number(reelCountEl.value);

  for (let i = 0; i < count; i++) {
    let s = symbols[Math.floor(Math.random() * symbols.length)];
    res.push(s);
    let d = document.createElement("div");
    d.className = "reel";
    d.textContent = s;
    reelsEl.appendChild(d);
  }

  setTimeout(() => checkWin(res), turbo ? 100 : 400);
  save();
  updateUI();
}

function checkWin(res) {
  const allSame = res.every(v => v === res[0]);

  if (allSame) {
    let win = bet * res.length * 2;
    balance += win;
    jackpotSound.play();
    overlay.classList.add("show");
    setTimeout(()=>overlay.classList.remove("show"),1500);
    resultEl.textContent = "🔥 JACKPOT!";
  } else if (new Set(res).size <= 2) {
    balance += bet * 2;
    winSound.play();
    resultEl.textContent = "🎉 Kazandın";
  } else {
    resultEl.textContent = "😅 Kaybettin";
  }

  save();
  updateUI();
  if (auto) setTimeout(spin, turbo ? 150 : 600);
}

/* BONUS */
document.getElementById("bonusBtn").onclick = () => {
  const last = Number(localStorage.getItem("bonusTime")) || 0;
  const now = Date.now();
  if (now - last < 86400000) {
    alert("⏳ Bonus henüz hazır değil");
    return;
  }
  freeSpin += 10;
  localStorage.setItem("bonusTime", now);
  save();
  updateUI();
  alert("🎁 10 FREE SPIN ALDIN!");
};

document.getElementById("spinBtn").onclick = spin;
document.getElementById("autoBtn").onclick = () => auto = !auto;
document.getElementById("turboBtn").onclick = () => turbo = !turbo;

updateUI();
