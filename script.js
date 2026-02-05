console.log("JS AYAKTA");
alert("JS AYAKTA");const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐"];

const reelsDiv = document.getElementById("reels");
const spinBtn = document.getElementById("spinBtn");
const autoBtn = document.getElementById("autoBtn");
const turboBtn = document.getElementById("turboBtn");

const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const resultText = document.getElementById("result");
const reelSelect = document.getElementById("reelCount");

let balance = 1000;
let bet = 10;
let reelCount = 5;

let spinning = false;
let autoSpin = false;
let turbo = false;

function buildReels() {
  reelsDiv.innerHTML = "";
  for (let i = 0; i < reelCount; i++) {
    const div = document.createElement("div");
    div.className = "reel";
    div.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    reelsDiv.appendChild(div);
  }
}

reelSelect.addEventListener("change", () => {
  reelCount = Number(reelSelect.value);
  buildReels();
});

document.getElementById("betPlus").onclick = () => {
  bet += 10;
  betEl.textContent = bet;
};

document.getElementById("betMinus").onclick = () => {
  if (bet > 10) bet -= 10;
  betEl.textContent = bet;
};

spinBtn.onclick = () => spin();
autoBtn.onclick = () => {
  autoSpin = !autoSpin;
  autoBtn.classList.toggle("active");
  if (autoSpin) spin();
};

turboBtn.onclick = () => {
  turbo = !turbo;
  turboBtn.classList.toggle("active");
};

function spin() {
  if (spinning) return;
  if (balance < bet) {
    resultText.textContent = "💸 Bakiye bitti";
    autoSpin = false;
    autoBtn.classList.remove("active");
    return;
  }

  spinning = true;
  resultText.textContent = "";
  balance -= bet;
  balanceEl.textContent = balance;

  const reels = document.querySelectorAll(".reel");
  let final = [];

  reels.forEach((reel, i) => {
    reel.classList.add("spinning");
    let count = 0;
    const max = turbo ? 5 : 15 + i * 5;

    const interval = setInterval(() => {
      reel.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];
      count++;

      if (count >= max) {
        clearInterval(interval);
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.textContent = symbol;
        final[i] = symbol;
        reel.classList.remove("spinning");

        if (final.length === reels.length) {
          finishSpin(final);
        }
      }
    }, turbo ? 40 : 80);
  });
}

function finishSpin(arr) {
  const chance = Math.random();

  let win = false;
  if (chance < 0.08) {
    win = true;
    arr.fill("⭐");
  }

  if (win) {
    const reward = bet * 5;
    balance += reward;
    balanceEl.textContent = balance;
    resultText.textContent = "💥 JACKPOT!";
  } else {
    resultText.textContent = "😅 Kaybettin";
  }

  spinning = false;

  if (autoSpin) {
    setTimeout(spin, 400);
  }
}

buildReels();
