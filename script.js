const symbols = ["🍒","🍋","🍉","🍇","⭐"];
const reels = document.querySelectorAll(".reel");
const spinBtn = document.getElementById("spinBtn");
const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const resultText = document.getElementById("result");
const payline = document.querySelector(".payline");

let balance = 1000;
let bet = 10;
let spinning = false;

// Bahis kontrol
document.getElementById("betPlus").onclick = () => {
  if (bet < 100) bet += 10;
  betEl.textContent = bet;
};
document.getElementById("betMinus").onclick = () => {
  if (bet > 10) bet -= 10;
  betEl.textContent = bet;
};

spinBtn.onclick = () => {
  if (spinning || balance < bet) return;

  spinning = true;
  payline.classList.remove("active");
  resultText.textContent = "";

  balance -= bet;
  balanceEl.textContent = balance;

  let result = [];

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
        result[i] = final;
        reel.classList.remove("spinning");

        if (result.length === reels.length) {
          setTimeout(()=>checkWin(result),300);
        }
      }
    },80);
  });
};

function checkWin(arr){
  spinning = false;
  const win = arr.every(s=>s===arr[0]);

  if (win){
    const reward = arr[0]==="⭐" ? bet*20 : bet*5;
    balance += reward;
    balanceEl.textContent = balance;
    reels.forEach(r=>r.classList.add("win"));
    payline.classList.add("active");
    resultText.textContent = "🎉 Kazanç: +" + reward;
    coinEffect();
  } else {
    resultText.textContent = "😅 Kaybettin";
  }
}

function coinEffect(){
  const coin = document.createElement("div");
  coin.className = "coin";
  coin.textContent = "💰";
  document.querySelector(".game").appendChild(coin);
  setTimeout(()=>coin.remove(),1000);
}
