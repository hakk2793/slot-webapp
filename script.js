const icons = ["🍒", "🍋", "🔔", "🍉", "⭐"];

function spin() {
  const s1 = document.getElementById("slot1");
  const s2 = document.getElementById("slot2");
  const s3 = document.getElementById("slot3");
  const result = document.getElementById("result");

  if (!s1 || !s2 || !s3) {
    alert("Slot elemanları bulunamadı!");
    return;
  }

  const r1 = icons[Math.floor(Math.random() * icons.length)];
  const r2 = icons[Math.floor(Math.random() * icons.length)];
  const r3 = icons[Math.floor(Math.random() * icons.length)];

  s1.textContent = r1;
  s2.textContent = r2;
  s3.textContent = r3;

  if (r1 === r2 && r2 === r3) {
    result.textContent = "🎉 KAZANDIN!";
  } else {
    result.textContent = "😅 Tekrar dene";
  }
}
