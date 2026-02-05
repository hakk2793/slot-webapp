// ================== ELEMENTLER ==================
function clearAnimations() {
  slots.forEach(slot => {
    slot.classList.remove("win", "shake", "jackpot");
  });
}const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");
const balanceEl = document.getElementById("balance");
const slots = document.querySelectorAll(".slot");

// ================== SESLER ==================
const spinSound = new Audio("sounds/spin.m4a");
const winSound = new Audio("sounds/win.m4a");
const jackpotSound = new Audio("sounds/jackpot.m4a");

// ================== OYUN AYARLARI ==================
const symbols = ["🍒", "🍉", "🍋", "🍇", "⭐", "7️⃣"];
let balance = 1000;
const spinCost = 10;

// ================== BAKİYE GÜNCELLE ==================
function updateBalance(amount) {
  balance += amount;
  balanceEl.textContent = balance;
}

// ================== SPIN BUTONU ==================
spinBtn.addEventListener("click", () => {clearAnimations();
  if (balance < spinCost) {
    resultText.textContent = "❌ Yetersiz bakiye!";
    return;
  }

  // Spin ücreti
  updateBalance(-spinCost);

  // Spin sesi
  spinSound.currentTime = 0;
  spinSound.play();

  // Slotları döndür
  let results = [];
  slots.forEach(slot => {
    const rand = symbols[Math.floor(Math.random() * symbols.length)];
    slot.textContent = rand;
    results.push(rand);
  });

  // Kazanç kontrolü
  checkWin(results);
});

// ================== KAZANÇ KONTROLÜ ==================
function checkWin(results) {
  const counts = {};

  results.forEach(sym => {
    counts[sym] = (counts[sym] || 0) + 1;
  });

  const values = Object.values(counts);
  const maxMatch = Math.max(...values);
  const symbol = Object.keys(counts).find(key => counts[key] === maxMatch);

  if (maxMatch === 5) {
    if (symbol === "7️⃣") {
      updateBalance(500);
      jackpotSound.play();
      resultText.textContent = "💥 JACKPOT! +500 💰";
    } else {
      updateBalance(200);
      winSound.play();
      resultText.textContent = "🎉 5'Lİ KAZANÇ! +200";
    }
  } 
  else if (maxMatch === 4) {
    updateBalance(100);
    winSound.play();
    resultText.textContent = "🔥 4'LÜ KAZANÇ! +100";
  } 
  else if (maxMatch === 3) {
    updateBalance(40);
    winSound.play();
    resultText.textContent = "✨ 3'LÜ KAZANÇ! +40";
  } 
  else {
    resultText.textContent = "😅 Kaybettin";
  }
}

// ================== İLK YÜKLEME ==================
balanceEl.textContent = balance;
