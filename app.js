import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';
const supabase = createClient(URL, KEY);

// State
let lang = localStorage.getItem('lang') || 'en';
let theme = localStorage.getItem('theme') || 'dark';
let candleCount = parseInt(localStorage.getItem('candleCount')) || 0;
let profiles = [], messages = [];

// Translations
const texts = {
  en: {
    header: 'Community Memorial Wall',
    subheader: 'Light a candle, honor a loved one, and share…',
    profileTitle: '📅 Remembered Loved One Profile',
    lightCandleTitle: '🕯️ Light a Candle',
    sendMsgTitle: '💬 Send Message',
    communityTitle: '🌐 Community Messages',
    saveProfile: 'Save Profile',
    send: 'Send'
  },
  fr: {
    header: 'Mur Commémoratif Communautaire',
    subheader: 'Allumez une bougie, honorez un être cher, et partagez…',
    profileTitle: '📅 Profil de l’être cher',
    lightCandleTitle: '🕯️ Allumer une bougie',
    sendMsgTitle: '💬 Envoyer un message',
    communityTitle: '🌐 Messages de la communauté',
    saveProfile: 'Enregistrer',
    send: 'Envoyer'
  }
};

// Init
document.body.setAttribute('data-theme', theme);
document.getElementById('themeToggle').innerText = theme === 'light' ? '🌙' : '☀️';
document.getElementById('langSelector').value = lang;
document.getElementById('count').innerText = candleCount;
updateLang();
startStarfield();
loadAll();

// Event Listeners
document.getElementById('themeToggle').onclick = () => {
  theme = theme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('themeToggle').innerText = theme === 'light' ? '🌙' : '☀️';
};
document.getElementById('langSelector').onchange = e => {
  lang = e.target.value;
  localStorage.setItem('lang', lang);
  updateLang();
};

// Language
function updateLang() {
  const t = texts[lang];
  document.getElementById('header').innerText = t.header;
  document.getElementById('subheader').innerText = t.subheader;
  document.getElementById('profileTitle').innerText = t.profileTitle;
  document.getElementById('lightCandleTitle').innerText = t.lightCandleTitle;
  document.getElementById('sendMsgTitle').innerText = t.sendMsgTitle;
  document.getElementById('communityTitle').innerText = t.communityTitle;
  document.getElementById('profileBtn').innerText = t.saveProfile;
  document.getElementById('sendBtn').innerText = t.send;
}

// Candle
document.getElementById('candleBtn').onclick = () => {
  candleCount++;
  localStorage.setItem('candleCount', candleCount);
  document.getElementById('count').innerText = candleCount;
};

// Load data
async function loadAll() {
  await refreshProfiles();
  await refreshMessages();
}

// Profiles
async function refreshProfiles() {
  const { data } = await supabase
    .from('loved_ones')
    .select('*')
    .order('created_at', { ascending: false });
  profiles = data;
  const sel = document.getElementById('profileLink');
  sel.innerHTML = `<option value="">—Tag Loved One—</option>`;
  profiles.forEach(p => {
    const o = document.createElement('option');
    o.value = p.id;
    o.innerText = `${p.name} (${p.birth}–${p.death})`;
    sel.appendChild(o);
  });

  // Render profiles
  const div = document.getElementById('profiles');
  div.innerHTML = '';
  profiles.forEach(p => {
    const el = document.createElement('div');
    el.className = 'profile';
    el.innerHTML = `
      <strong>${p.name} (${p.birth}–${p.death})</strong>
      <p>${p.tribute}</p>
      ${p.photo_url ? `<img src="${p.photo_url}" />` : ''}
      <span class="pin" onclick="togglePin('loved_ones','${p.id}')">📌</span>
    `;
    div.appendChild(el);
  });
}

// Messages
async function refreshMessages() {
  const { data } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true });
  messages = data;
  const div = document.getElementById('messages');
  div.innerHTML = '';
  messages.forEach(m => renderMessage(m, div));
}

function renderMessage(m, container, parentId = null) {
  if ((parentId && m.parent_id !== parentId) || (!parentId && m.parent_id)) return;
  const el = document.createElement('div');
  el.className = 'message' + (parentId ? ' reply' : '');
  const dt = new Date(m.created_at).toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-CA');
  el.innerHTML = `
    <strong>${m.name || 'Anonymous'}</strong> <em>(${dt})</em>
    <p>${m.text}</p>
    ${m.photo_url ? `<img src="${m.photo_url}" />` : ''}
    ${m.audio_url ? `<audio controls src="${m.audio_url}"></audio>` : ''}
    <span class="pin" onclick="togglePin('messages','${m.id}')">📌</span>
    <button onclick="showReply('${m.id}')">↩ Reply</button>
    <div id="replyBox${m.id}"></div>
  `;
  container.appendChild(el);
  messages.forEach(c => renderMessage(c, container, m.id));
}

// Show reply box
window.showReply = id => {
  const box = document.getElementById(`replyBox${id}`);
  if (box.innerHTML) return box.innerHTML = '';
  box.innerHTML = `
    <textarea id="replyTxt${id}" placeholder="Reply…"></textarea>
    <button onclick="postReply('${id}')">Send</button>
  `;
};

// Save profile
document.getElementById('profileBtn').onclick = async () => {
  const name = document.getElementById('profileName').value.trim();
  const birth = document.getElementById('profileBirth').value;
  const death = document.getElementById('profileDeath').value;
  const tribute = document.getElementById('profileTribute').value.trim();
  const photo = document.getElementById('profilePhoto').files[0];
  if (!name || !birth || !death) return alert('Name, birth & death required');
  let photo_url = null;
  if (photo) {
    const path = `profiles/${Date.now()}_${photo.name}`;
    await supabase.storage.from('photos').upload(path, photo);
    photo_url = `${URL}/storage/v1/object/public/photos/${path}`;
  }
  await supabase.from('loved_ones').insert({ name, birth, death, tribute, photo_url, is_pinned: false });
  refreshProfiles();
};

// Send message
document.getElementById('sendBtn').onclick = async () => {
  const name = document.getElementById('nameField').value.trim() || null;
  const profile_id = document.getElementById('profileLink').value || null;
  const text = document.getElementById('messageText').value.trim();
  const photo = document.getElementById('messagePhoto').files[0];
  const audio = document.getElementById('messageAudio').files[0];
  if (!text) return;
  let photo_url = null, audio_url = null;
  if (photo) {
    const p = `msgs/${Date.now()}_${photo.name}`;
    await supabase.storage.from('photos').upload(p, photo);
    photo_url = `${URL}/storage/v1/object/public/photos/${p}`;
  }
  if (audio) {
    const a = `msgs/${Date.now()}_${audio.name}`;
    await supabase.storage.from('photos').upload(a, audio);
    audio_url = `${URL}/storage/v1/object/public/photos/${a}`;
  }
  await supabase.from('messages').insert({
    name, profile_id, text, photo_url, audio_url, parent_id: null, is_pinned: false
  });
  refreshMessages();
};

// Post reply
window.postReply = async parent_id => {
  const txt = document.getElementById(`replyTxt${parent_id}`).value.trim();
  if (!txt) return;
  await supabase.from('messages').insert({ name: null, profile_id: null, text: txt, parent_id, is_pinned: false });
  refreshMessages();
};

// Pin toggle
window.togglePin = async (table, id) => {
  await supabase.from(table).update({ is_pinned: true }).eq('id', id);
  if (table === 'loved_ones') refreshProfiles();
  else refreshMessages();
};

// Floating tribute clouds
function spawnFloat(text) {
  const el = document.createElement('span');
  el.innerText = text;
  el.style.left = Math.random() * 80 + 'vw';
  document.body.appendChild(el);
  el.className = 'float-clouds';
  setTimeout(() => el.remove(), 8000);
}

// Starfield with shooting stars
function startStarfield() {
  const c = document.getElementById('starfield');
  const ctx = c.getContext('2d');
  let w, h, stars = [], shooting = null;

  function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.1
    }));
  }

  function draw() {
    ctx.fillStyle = 'black'; ctx.fillRect(0, 0, w, h);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
      ctx.fillStyle = 'white'; ctx.fill();
    });
    if (!shooting && Math.random() < 0.005) {
      shooting = { x: Math.random() * w, y: Math.random() * h/2, len: 0 };
    }
    if (shooting) {
      ctx.strokeStyle = 'white'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shooting.x, shooting.y);
      ctx.lineTo(shooting.x + shooting.len*10, shooting.y + shooting.len*5);
      ctx.stroke();
      shooting.len += 1;
      if (shooting.len > 20) shooting = null;
    }
    requestAnimationFrame(draw);
  }

  window.onresize = resize;
  resize();
  draw();
}