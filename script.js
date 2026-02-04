const symbols = ["🍒", "🍋", "🔔", "🍉", "⭐"];

function startSlot() {
  document.getElementById("slotArea").style.display = "block";
  document.getElementById("startBtn").style.display = "none";

  spin();
}

function spin() {
  const reels = document.getElementById("reels");

  let count = 0;

  const interval = setInterval(() => {
    const a = symbols[Math.floor(Math.random() * symbols.length)];
    const b = symbols[Math.floor(Math.random() * symbols.length)];
    const c = symbols[Math.floor(Math.random() * symbols.length)];

    reels.textContent = `${a} | ${b} | ${c}`;

    count++;

    if (count > 15) {
      clearInterval(interval);
      checkWin(a, b, c);
    }
  }, 100);
}

function checkWin(a, b, c) {
  if (a === b && b === c) {
    setTimeout(() => {
      alert("🎉 KAZANDIN!");
    }, 200);
  } else {
    setTimeout(() => {
      alert("😅 Tekrar dene");
    }, 200);
  }
}
