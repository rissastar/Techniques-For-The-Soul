import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const KEY = '<YOUR_SUPA_KEY>';
const supabase = createClient(URL, KEY);

let lang = localStorage.getItem('lang') || 'en';
let theme = localStorage.getItem('theme') || 'dark';
let candleCount = parseInt(localStorage.getItem('candleCount')) || 0;

const texts = {
  en: { header:"Community Memorial Wall", sub:"Starlight and remembrance.", profile:"Remembered Loved One", candle:"Light a Candle", send:"Send Message", community:"Community Messages" },
  fr: { header:"Mur Commémoratif", sub:"Clarté stellaire et souvenir.", profile:"Profil de l’être cher", candle:"Allumer une bougie", send:"Envoyer message", community:"Messages de la communauté" }
};

function updateLang(){
  const t = texts[lang];
  document.getElementById('header').innerText = t.header;
  document.getElementById('subheader').innerText = t.sub;
  document.getElementById('profileTitle').innerText = '📅 ' + t.profile;
  document.getElementById('lightCandleTitle').innerText = '🕯️ ' + t.candle;
  document.getElementById('sendMsgTitle').innerText = '💬 ' + t.send;
  document.getElementById('communityTitle').innerText = '🌐 ' + t.community;
  document.getElementById('profileBtn').innerText = lang==='en' ? "Save Profile" : "Enregistrer";
  document.getElementById('sendBtn').innerText = lang==='en' ? "Send" : "Envoyer";
}
function updateTheme(){
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeToggle').innerText = theme==='light' ? '🌙' : '☀️';
}
function init(){
  document.getElementById('langSelector').value=lang;
  document.getElementById('themeToggle').onclick = () => {
    theme = theme==='light' ? 'dark' : 'light';
    updateTheme();
    localStorage.setItem('theme', theme);
  };
  document.getElementById('langSelector').onchange = () => {
    lang = document.getElementById('langSelector').value;
    updateLang();
    localStorage.setItem('lang', lang);
  };
  document.getElementById('count').innerText = candleCount;
  document.getElementById('candleBtn').onclick = () => {
    candleCount++;
    localStorage.setItem('candleCount', candleCount);
    document.getElementById('count').innerText = candleCount;
  };
  document.getElementById('profileBtn').onclick = saveProfile;
  document.getElementById('sendBtn').onclick = sendMessage;
  updateLang();
  updateTheme();
  refreshProfiles();
  refreshMessages();
  checkShare();
  animateStars();
}
init();

/* Supabase + Message/Profile CRUD omitted for brevity... */

function animateStars(){
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const stars = Array.from({length:200}, () => ({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2,alpha:Math.random()}));
  const shoot = () => {
    const s = {x:Math.random()*w, y:Math.random()*h/2, len:Math.random()*200+200, speed: Math.random()*4+4};
    sparks.push(s);
  };
  let sparks = [];
  setInterval(shoot,5000);
  (function loop(){
    ctx.fillStyle = theme==='light' ? 'rgba(0,0,0,0.1)' : 'rgba(10,15,33,0.3)';
    ctx.fillRect(0,0,w,h);
    stars.forEach(s => {
      ctx.globalAlpha = s.alpha;
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,2*Math.PI); ctx.fillStyle='#fff'; ctx.fill();
    });
    sparks = sparks.filter(s => (s.len -= s.speed) > 0);
    sparks.forEach(s => {
      ctx.globalAlpha=1;
      ctx.strokeStyle='white';
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + s.len, s.y + 0.5);
      ctx.stroke();
    });
    requestAnimationFrame(loop);
  })();
}