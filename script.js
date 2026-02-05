const symbols = ["🍒","⭐","🍇","🍉","🔔"];
let balance = 1000;
let bet = 10;
let auto = false;
let turbo = false;

const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const reelsEl = document.getElementById("reels");
const resultEl = document.getElementById("result");
const jackpotEl = document.getElementById("jackpot");
const reelCountEl = document.getElementById("reelCount");
const slotBox = document.getElementById("slot");

function buildReels() {
  reelsEl.innerHTML = "";
  for (let i = 0; i < reelCountEl.value; i++) {
    const d = document.createElement("div");
    d.className = "reel";
    d.textContent = "❔";
    reelsEl.appendChild(d);
  }
}
buildReels();

reelCountEl.onchange = buildReels;

document.getElementById("betPlus").onclick = () => bet += 10;
document.getElementById("betMinus").onclick = () => bet = Math.max(10, bet - 10);

document.getElementById("spinBtn").onclick = spin;
document.getElementById("autoBtn").onclick = () => {
  auto = !auto;
  if (auto) spin();
};
document.getElementById("turboBtn").onclick = () => turbo = !turbo;

function spin() {
  if (balance < bet) return;
  balance -= bet;
  balanceEl.textContent = balance;
  betEl.textContent = bet;

  const reels = document.querySelectorAll(".reel");
  let result = [];

  reels.forEach(r => {
    const s = symbols[Math.floor(Math.random() * symbols.length)];
    r.textContent = s;
    result.push(s);
  });

  const win = result.every(s => s === result[0]);

  if (win) {
    const winAmount = bet * result.length * 5;
    balance += winAmount;
    balanceEl.textContent = balance;
    resultEl.textContent = "🎉 Kazandın +" + winAmount;
    showJackpot();
  } else {
    resultEl.textContent = "😕 Kaybettin";
  }

  if (auto) {
    setTimeout(spin, turbo ? 200 : 800);
  }
}

function showJackpot() {
  jackpotEl.style.display = "flex";
  slotBox.classList.add("shake");
  setTimeout(() => {
    jackpotEl.style.display = "none";
    slotBox.classList.remove("shake");
  }, 1200);
}
