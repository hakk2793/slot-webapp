const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");
const balanceEl = document.getElementById("balance");
const slots = document.querySelectorAll(".slot");

const spinSound = new Audio("sounds/spin.m4a");
const winSound = new Audio("sounds/win.m4a");
const jackpotSound = new Audio("sounds/jackpot.m4a");

const symbols = ["🍒", "🍉", "🍋", "🍇", "⭐", "7️⃣"];
let balance = 1000;
const spinCost = 10;

function updateBalance(amount) {
  balance += amount;
  balanceEl.textContent = balance;
}

function clearAnimations() {
  slots.forEach(slot => {
    slot.classList.remove("win", "shake", "jackpot");
  });
}

spinBtn.addEventListener("click", () => {
  if (balance < spinCost) {
    resultText.textContent = "❌ Yetersiz bakiye";
    return;
  }

  clearAnimations();
  updateBalance(-spinCost);

  spinSound.currentTime = 0;
  spinSound.play();

  let results = [];
  slots.forEach(slot => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    slot.textContent = sym;
    results.push(sym);
  });

  checkWin(results);
});

function checkWin(results) {
  const counts = {};
  results.forEach(s => counts[s] = (counts[s] || 0) + 1);

  const maxMatch = Math.max(...Object.values(counts));
  const symbol = Object.keys(counts).find(k => counts[k] === maxMatch);

  if (maxMatch === 5) {
    slots.forEach(s => s.classList.add("shake"));

    if (symbol === "7️⃣") {
      updateBalance(500);
      jackpotSound.play();
      slots.forEach(s => s.classList.add("jackpot"));
      resultText.textContent = "💥 JACKPOT! +500";
    } else {
      updateBalance(200);
      winSound.play();
      slots.forEach(s => s.classList.add("win"));
      resultText.textContent = "🎉 5'Lİ KAZANÇ! +200";
    }
  }
  else if (maxMatch === 4) {
    updateBalance(100);
    winSound.play();
    slots.forEach(s => s.classList.add("win"));
    resultText.textContent = "🔥 4'LÜ KAZANÇ! +100";
  }
  else if (maxMatch === 3) {
    updateBalance(40);
    winSound.play();
    slots.forEach(s => s.classList.add("win"));
    resultText.textContent = "✨ 3'LÜ KAZANÇ! +40";
  }
  else {
    resultText.textContent = "😅 Kaybettin";
  }
}

balanceEl.textContent = balance;
