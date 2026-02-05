const symbols = ["🍒","🍋","🍉","🍇","⭐"];

const reels = document.querySelectorAll(".reel");
const spinBtn = document.getElementById("spinBtn");
const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const resultText = document.getElementById("result");
const payline = document.querySelector(".payline");

const betPlus = document.getElementById("betPlus");
const betMinus = document.getElementById("betMinus");

let balance = 1000;
let bet = 10;
let spinning = false;

/* 🔊 SESLER */
const spinSound = new Audio("sounds/spin.m4a");
const winSound = new Audio("sounds/win.m4a");
const jackpotSound = new Audio("sounds/jackpot.m4a");

/* 📌 Mobil için ses kilidi aç */
document.body.addEventListener("click", () => {
  spinSound.play().then(()=>spinSound.pause()).catch(()=>{});
  winSound.play().then(()=>winSound.pause()).catch(()=>{});
  jackpotSound.play().then(()=>jackpotSound.pause()).catch(()=>{});
}, { once:true });

/* ➕➖ BAHİS */
betPlus.onclick = () => {
  if (spinning) return;
  if (bet < 100) bet += 10;
  betEl.textContent = bet;
};

betMinus.onclick = () => {
  if (spinning) return;
  if (bet > 10) bet -= 10;
  betEl.textContent = bet;
};

/* 🎰 SPIN */
spinBtn.onclick = () => {
  if (spinning) return;
  if (balance < bet) {
    resultText.textContent = "💸 Yetersiz bakiye";
    return;
  }

  spinning = true;
  spinBtn.disabled = true;
  betPlus.disabled = true;
  betMinus.disabled = true;

  resultText.textContent = "";
  payline.classList.remove("active");

  balance -= bet;
  balanceEl.textContent = balance;

  spinSound.currentTime = 0;
  spinSound.play();

  let finalSymbols = [];

  reels.forEach((reel, i) => {
    reel.classList.remove("win");
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
        finalSymbols[i] = final;
        reel.classList.remove("spinning");

        if (finalSymbols.filter(Boolean).length === reels.length) {
          setTimeout(() => finishSpin(finalSymbols), 300);
        }
      }
    }, 80);
  });
};

function finishSpin(arr) {
  spinning = false;
  spinBtn.disabled = false;
  betPlus.disabled = false;
  betMinus.disabled = false;

  const win = arr.every(s => s === arr[0]);

  if (win) {
    const reward = arr[0] === "⭐" ? bet * 20 : bet * 5;
    balance += reward;
    balanceEl.textContent = balance;

    reels.forEach(r => r.classList.add("win"));
    payline.classList.add("active");

    if (arr[0] === "⭐") {
      jackpotSound.currentTime = 0;
      jackpotSound.play();
      resultText.textContent = "💥 JACKPOT +" + reward;
    } else {
      winSound.currentTime = 0;
      winSound.play();
      resultText.textContent = "🎉 Kazandın +" + reward;
    }

    coinEffect();
  } else {
    resultText.textContent = "😅 Kaybettin";
  }
}

/* 💰 COIN */
function coinEffect(){
  const coin = document.createElement("div");
  coin.className = "coin";
  coin.textContent = "💰";
  document.querySelector(".game").appendChild(coin);
  setTimeout(()=>coin.remove(),1000);
}
