// —— Confetti ——  
function confettiBurst() {
  confetti.create(document.getElementById('confettiCanvas'), {
    resize:true, useWorker:true
  })({ particleCount:50, spread:60, origin:{ y:0.6 } });
}

// —— Theme Toggle ——  
document.getElementById('themeToggle').onclick = () => {
  const html = document.documentElement;
  const next = html.getAttribute('data-theme') === 'neon' ? 'soft' : 'neon';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
};

// —— Content Arrays ——  
const lobsterFacts = [ /* 12+ facts as before */ ];
const fishTypes    = [ /* 15+ fish as before */ ];
const cars         = [ /* 15+ cars as before */ ];
const beats        = [ /* 10 beat objects */ ];
const jokes        = [ /* 15+ jokes */ ];
const stories      = [ /* 15+ stories */ ];
const movies       = [ /* 15+ movies */ ];
const foods        = [ /* 15+ foods */ ];
const cultureFacts = [ /* 10+ culture facts */ ];
const stonerTips   = [ /* 10+ tips */ ];
const compliments  = [ /* 6+ compliments */ ];

// —— Helper ——  
function pickAndShow(arr, id, pre='') {
  document.getElementById(id).textContent = pre + arr[Math.floor(Math.random()*arr.length)];
}

// —— Modules ——  
function showFact()        { pickAndShow(lobsterFacts,'fact'); }
function playFishing()     { pickAndShow(fishTypes,'fishResult','You caught a '); }
function chooseCar()       { pickAndShow(cars,'car','Your ride: '); }
function playBeat() {
  const b = beats[Math.floor(Math.random()*beats.length)];
  const a = document.getElementById('beatAudio');
  a.src = b.src; a.play();
}
function tellJoke()        { pickAndShow(jokes,'joke'); }
function tellStory()       { pickAndShow(stories,'story'); }
function recommendMovie()  { pickAndShow(movies,'movie','Watch: '); }
function suggestFood()     { pickAndShow(foods,'foodOutput'); }
function showCultureFact() { pickAndShow(cultureFacts,'cultureFact'); }
function showTip()         { pickAndShow(stonerTips,'tip'); }

// —— DanteBox ——  
function openBox() {
  const box = document.getElementById('box');
  box.classList.add('shake');
  setTimeout(() => {
    box.classList.remove('shake');
    pickAndShow(compliments,'compliment');
  }, 500);
}

// —— Lobster Game w/ High Score ——  
let gameInterval, lobsterX, lobsterY, caught=false;
const canvas = document.getElementById('gameCanvas'),
      ctx    = canvas.getContext('2d'),
      img    = new Image();
img.src = 'lobster.png';

const HS_KEY = 'danteHighScore';
let highScore = parseInt(localStorage.getItem(HS_KEY)) || 0;
document.getElementById('highScore').textContent = highScore;

canvas.addEventListener('click', e => {
  if (caught) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  if (x>lobsterX && x<lobsterX+50 && y>lobsterY && y<lobsterY+50) {
    caught = true; clearInterval(gameInterval);
    let score = parseInt(document.getElementById('gameMsg').dataset.score) + 1;
    document.getElementById('gameMsg').textContent = `You caught it! ${score}`;
    document.getElementById('gameMsg').dataset.score = score;
    if (score>highScore) {
      highScore = score;
      localStorage.setItem(HS_KEY, highScore);
      document.getElementById('highScore').textContent = highScore;
    }
    new Audio('cheer.mp3').play();
    confettiBurst();
  }
});

function startGame() {
  caught = false;
  document.getElementById('gameMsg').textContent = '';
  document.getElementById('gameMsg').dataset.score = 0;
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    lobsterX = Math.random()*(canvas.width-50);
    lobsterY = Math.random()*(canvas.height-50);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img, lobsterX, lobsterY, 50, 50);
  }, 800);
}

// —— DanteBot Chat ——  
const botReplies = {
  hello:   "Hey Dante! Ready to rave or fish? 🎉🦞",
  rave:    "The neon lights await you! 🕺✨",
  fishing: "Time to reel in your destiny! 🎣",
  lobster: "Lobster vibes forever! 🦞❤️",
  car:     "Fast car, fast life. 🏎️💨",
  default: "Haha, tell me more! 🤖"
};

function chatSend() {
  const inp = document.getElementById('chatInput');
  const txt = inp.value.trim().toLowerCase();
  if (!txt) return;
  const win = document.getElementById('chatWindow');
  win.innerHTML += `<div class="chat user">You: ${inp.value}</div>`;
  const reply = botReplies[txt] || botReplies.default;
  win.innerHTML += `<div class="chat bot">DanteBot: ${reply}</div>`;
  win.scrollTop = win.scrollHeight;
  inp.value = '';
}

// —— Preload ——  
window.onload = () => {
  img.onload = ()=>{}; // preload lobster
};