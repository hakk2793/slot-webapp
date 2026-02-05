const symbols = ["🍒","🍋","🍉","🍇","⭐"];

const reelsBox = document.getElementById("reels");
const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const spinBtn = document.getElementById("spinBtn");

const flash = document.getElementById("screenFlash");
const slotBox = document.getElementById("slotBox");
const jackpotText = document.getElementById("jackpotText");

const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const jackpotSound = document.getElementById("jackpotSound");

let balance = 1000;
let bet = 40;
let loseStreak = 0;
let spinning = false;

const autoSpin = document.getElementById("autoSpin");
const turbo = document.getElementById("turbo");
const reelSelect = document.getElementById("reelCount");

function createReels(n){
  reelsBox.innerHTML="";
  for(let i=0;i<n;i++){
    const d=document.createElement("div");
    d.className="reel";
    reelsBox.appendChild(d);
  }
}
createReels(+reelSelect.value);
reelSelect.onchange=()=>createReels(+reelSelect.value);

spinBtn.onclick = spin;

function spin(){
  if(spinning || balance<bet) return;
  spinning=true;

  balance-=bet;
  balanceEl.textContent=balance;

  spinSound.currentTime=0;
  spinSound.play();

  const reels=[...document.querySelectorAll(".reel")];
  let result=[];
  let winChance = Math.min(loseStreak * 0.1, 0.6); // AKILLI ŞANS

  reels.forEach((r,i)=>{
    let count=0;
    const max= turbo.checked ? 6+i : 15+i*4;
    const int=setInterval(()=>{
      r.textContent=symbols[Math.floor(Math.random()*symbols.length)];
      if(++count>max){
        clearInterval(int);
        let s = Math.random()<winChance ? symbols[0] : symbols[Math.floor(Math.random()*symbols.length)];
        r.textContent=s;
        result[i]=s;
        if(result.length===reels.length) checkWin(result);
      }
    }, turbo.checked ? 40 : 90);
  });
}

function checkWin(arr){
  const win = arr.every(v=>v===arr[0]);
  document.querySelectorAll(".reel").forEach(r=>r.classList.remove("win"));

  if(win){
    loseStreak=0;
    let reward = arr[0]==="⭐"? bet*10 : bet*3;
    balance+=reward;
    balanceEl.textContent=balance;

    document.querySelectorAll(".reel").forEach(r=>r.classList.add("win"));

    if(arr[0]==="⭐"){
      jackpotSound.play();
      flash.classList.add("flash");
      slotBox.classList.add("shake");
      jackpotText.classList.add("jackpotShow");
      setTimeout(()=>{
        flash.classList.remove("flash");
        slotBox.classList.remove("shake");
        jackpotText.classList.remove("jackpotShow");
      },1000);
    } else winSound.play();

  } else {
    loseStreak++;
  }

  spinning=false;
  if(autoSpin.checked) setTimeout(spin,300);
}
