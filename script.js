const symbols = ["🍒", "🍋", "🔔", "🍉", "⭐"];

const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");

const button = document.getElementById("spinBtn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  // Rastgele semboller
  const s1 = symbols[Math.floor(Math.random() * symbols.length)];
  const s2 = symbols[Math.floor(Math.random() * symbols.length)];
  const s3 = symbols[Math.floor(Math.random() * symbols.length)];

  slot1.textContent = s1;
  slot2.textContent = s2;
  slot3.textContent = s3;

  // Kazanma kontrolü
  if (s1 === s2 && s2 === s3) {
    result.textContent = "🎉 KAZANDIN!";
  } else {
    result.textContent = "😅 Tekrar dene";
  }
});
