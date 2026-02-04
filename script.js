// === ELEMENTLER ===
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");
const balanceEl = document.getElementById("balance");
const slots = document.querySelectorAll(".slot");

// === SESLER ===
const spinSound = new Audio("sounds/spin.m4a");
const winSound = new Audio("sounds/win.m4a");
const jackpotSound = new Audio("sounds/jackpot.m4a");

// === OYUN AYARLARI ===
const symbols = ["🍒", "🍉", "🍋", "🍇", "⭐", "7️⃣"];

let balance = 1000;
const spinCost = 10;

// === BAKİYEYİ GÜNCELLE ===
function updateBalance(amount) {
  balance += amount;
  balanceEl.textContent = balance;
}

// === SPIN ===
spinBtn.addEventListener("click", () => {
  if (balance < spinCost) {
    resultText.textContent = "❌ Yetersiz bakiye!";
    return;
  }

  // Spin ücreti
  updateBalance(-spinCost);

  // Ses
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

// === KAZANÇ KONTROL ===
function checkWin(results) {
  const first = results[0];
  const allSame = results.every(r => r === first);

  if (allSame) {
    // JACKPOT
    if (first === "7️⃣") {
      updateBalance(500);
      jackpotSound.play();
      resultText.textContent = "💥 JACKPOT! +500 💰";
    } else {
      updateBalance(200);
      winSound.play();
      resultText.textContent = "🎉 BÜYÜK KAZANÇ! +200";
    }
  } else if (new Set(results).size <= 3) {
    // Küçük win
    updateBalance(50);
    winSound.play();
    resultText.textContent = "✅ Kazandın! +50";
  } else {
    resultText.textContent = "😅 Kaybettin";
  }
}

// === İLK YÜKLEME ===
balanceEl.textContent = balance;
