const symbols = ["🍒", "🍋", "🔔", "🍉", "⭐"];
const reels = [
  document.getElementById("r1"),
  document.getElementById("r2"),
  document.getElementById("r3")
];

const button = document.getElementById("spinBtn");
const result = document.getElementById("result");

let spinning = false;

button.addEventListener("click", () => {
  if (spinning) return;
  spinning = true;
  result.textContent = "";

  let results = [];

  reels.forEach((reel, index) => {
    let count = 0;
    let interval = setInterval(() => {
      reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      count++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      reel.textContent = finalSymbol;
      results[index] = finalSymbol;

      if (index === 2) {
        checkWin(results);
        spinning = false;
      }
    }, 1000 + index * 500);
  });
});

function checkWin(arr) {
  if (arr[0] === arr[1] && arr[1] === arr[2]) {
    result.textContent = "🎉 KAZANDIN!";
    document.querySelector(".slot-box").style.boxShadow = "0 0 40px gold";
  } else {
    result.textContent = "😢 Kaybettin, tekrar dene";
    document.querySelector(".slot-box").style.boxShadow = "0 0 25px gold";
  }
}
