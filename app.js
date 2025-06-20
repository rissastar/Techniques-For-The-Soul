// ─── Supabase Initialization ─────────────────────────────────────────
const URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';
const supabase = createClient(URL, KEY);

// === Supabase Initialization ===
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === DOM Elements & Globals ===
const htmlEl = document.documentElement;

const themeToggleBtn = document.getElementById('theme-toggle');
const langToggleBtn = document.getElementById('lang-toggle');
const musicToggleBtn = document.getElementById('music-toggle');

const ambientMusic = new Audio('ambient.mp3');
ambientMusic.loop = true;

// Language toggle helper: update all [data-en] text based on data-lang attribute
function updateLanguageTexts() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[htmlEl.dataset.lang];
  });
  // Update placeholders
  updatePlaceholders();
}

function updatePlaceholders() {
  // Inputs & textareas placeholders must be updated manually
  const placeholders = {
    'candle-name': { en: 'Name…', fr: 'Nom…' },
    'tribute-text': { en: 'Write your tribute here...', fr: 'Écrivez votre hommage ici...' },
    'tribute-name': { en: 'Name (optional)', fr: 'Nom (facultatif)' },
    'cloud-text': { en: 'Your message...', fr: 'Votre message...' },
    'support-text': { en: 'Your comforting message...', fr: 'Votre message réconfortant...' },
    'support-name': { en: 'Name (optional)', fr: 'Nom (facultatif)' }
  };
  Object.entries(placeholders).forEach(([id, texts]) => {
    const el = document.getElementById(id);
    if(el) el.placeholder = texts[htmlEl.dataset.lang];
  });
}

// === Event Listeners ===
themeToggleBtn.onclick = () => {
  htmlEl.dataset.theme = htmlEl.dataset.theme === 'dark' ? 'light' : 'dark';
};

langToggleBtn.onclick = () => {
  htmlEl.dataset.lang = htmlEl.dataset.lang === 'en' ? 'fr' : 'en';
  updateLanguageTexts();
};

musicToggleBtn.onclick = () => {
  if (ambientMusic.paused) {
    ambientMusic.play();
    musicToggleBtn.textContent = '🔊';
  } else {
    ambientMusic.pause();
    musicToggleBtn.textContent = '🔈';
  }
};

// Initialize language texts on load
updateLanguageTexts();

// === Helper: Render grid items ===
function renderGrid(containerId, items, renderer) {
  const container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = items.map(renderer).join('');
}

// === Candle Lighting ===
async function loadCandles() {
  const { data, error } = await supabase.from('candles').select('*').order('created_at', { ascending: false });
  if (error) return console.error('Load candles error:', error);
  renderGrid('candle-list', data || [], c => `
    <div class="item candle-flicker" title="🕯 ${c.name}">${c.name}</div>
  `);
}

document.getElementById('submit-candle').onclick = async () => {
  const nameInput = document.getElementById('candle-name');
  const name = nameInput.value.trim();
  if (!name) return alert(htmlEl.dataset.lang === 'fr' ? "Entrez un nom" : "Please enter a name");
  const { error } = await supabase.from('candles').insert([{ name }]);
  if (error) return alert('Error saving candle');
  nameInput.value = '';
  loadCandles();
};

loadCandles();

// === Tributes ===
async function loadTributes() {
  const { data, error } = await supabase.from('tributes').select('*').order('created_at', { ascending: false });
  if (error) return console.error('Load tributes error:', error);
  renderGrid('tribute-list', data || [], t => `
    <div class="item" title="${t.name || (htmlEl.dataset.lang === 'fr' ? 'Anonyme' : 'Anonymous')}">
      <p>"${t.content}"</p>
      <p style="text-align:right; font-style:italic;">– ${t.name || (htmlEl.dataset.lang === 'fr' ? 'Anonyme' : 'Anonymous')}</p>
    </div>
  `);
}

document.getElementById('submit-tribute').onclick = async () => {
  const textInput = document.getElementById('tribute-text');
  const nameInput = document.getElementById('tribute-name');
  const content = textInput.value.trim();
  if (!content) return alert(htmlEl.dataset.lang === 'fr' ? "Écrivez votre hommage" : "Write your tribute");
  const { error } = await supabase.from('tributes').insert([{ content, name: nameInput.value.trim() || null }]);
  if (error) return alert('Error saving tribute');
  textInput.value = '';
  nameInput.value = '';
  loadTributes();
};

loadTributes();

// === Photos ===
async function loadPhotos() {
  const { data, error } = await supabase.from('photos').select('*').order('created_at', { ascending: false });
  if (error) return console.error('Load photos error:', error);
  renderGrid('photo-gallery', data || [], p => `
    <div class="item">
      <img src="${p.url}" alt="Photo tribute" style="width:100%; border-radius:8px;" />
      <p style="text-align:right; font-style:italic;">– ${p.name || ''}</p>
    </div>
  `);
}

document.getElementById('submit-photo').onclick = async () => {
  const input = document.getElementById('photo-input');
  const file = input.files[0];
  if (!file) return alert(htmlEl.dataset.lang === 'fr' ? "Choisissez une image" : "Choose an image file");
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const { error: uploadError } = await supabase.storage.from('photos').upload(fileName, file);

  if(uploadError){
    alert(htmlEl.dataset.lang === 'fr' ? "Erreur de téléchargement" : "Upload error");
    return console.error(uploadError);
  }

  const { publicURL, error: urlError } = supabase.storage.from('photos').getPublicUrl(fileName);
  if(urlError) return alert('Error getting photo URL');

  const { error: dbError } = await supabase.from('photos').insert([{ url: publicURL, name: null }]);
  if(dbError) return alert('Error saving photo info');

  input.value = '';
  loadPhotos();
};

loadPhotos();

// === Cloud Messages ===
async function loadClouds() {
  const { data, error } = await supabase.from('clouds').select('*').order('created_at', { ascending: false }).limit(20);
  if (error) return console.error('Load clouds error:', error);
  const container = document.getElementById('cloud-container');
  container.innerHTML = '';
  data.forEach((msg, i) => {
    const span = document.createElement('span');
    span.className = 'cloud-msg';
    span.textContent = msg.text;
    span.style.top = `${Math.random() * 70 + 5}%`;
    span.style.left = '100%'; // start offscreen right
    container.appendChild(span);

    // Animate cloud message across screen
    const duration = 15000 + Math.random() * 10000;
    span.animate(
      [
        { transform: 'translateX(0)', opacity: 1 },
        { transform: 'translateX(-120vw)', opacity: 0 }
      ],
      { duration, easing: 'linear', fill: 'forwards' }
    );
    // Remove after animation ends
    setTimeout(() => span.remove(), duration);
  });
}

document.getElementById('submit-cloud').onclick = async () => {
  const input = document.getElementById('cloud-text');
  const text = input.value.trim();
  if (!text) return;
  const { error } = await supabase.from('clouds').insert([{ text }]);
  if (error) return alert('Error sending message');
  input.value = '';
  loadClouds();
};

loadClouds();
setInterval(loadClouds, 10000);

// === Grief Support ===
const supportPrompts = [
  "Today, I honor my grief by remembering their laughter.",
  "Today, I honor my grief by lighting a candle.",
  "Today, I honor my grief by sharing a kind word.",
  "Today, I honor my grief by taking a deep breath.",
  "Today, I honor my grief by writing a letter.",
  "Today, I honor my grief by looking at old photos."
];

const dailyPromptEl = document.getElementById('daily-prompt');
dailyPromptEl.textContent = supportPrompts[new Date().getDate() % supportPrompts.length];

async function loadSupportMessages() {
  const { data, error } = await supabase.from('grief_support').select('*').order('created_at', { ascending: false });
  if (error) return console.error('Load grief support error:', error);
  renderGrid('support-list', data || [], m => `
    <div class="item">
      <p>${m.content}</p>
      <p style="text-align:right; font-style:italic;">– ${m.name || (htmlEl.dataset.lang === 'fr' ? 'Anonyme' : 'Anonymous')}</p>
    </div>
  `);
}

document.getElementById('submit-support').onclick = async () => {
  const textInput = document.getElementById('support-text');
  const nameInput = document.getElementById('support-name');
  const content = textInput.value.trim();
  if (!content) return alert(htmlEl.dataset.lang === 'fr' ? "Écrivez un message" : "Write a message");
  const { error } = await supabase.from('grief_support').insert([{ content, name: nameInput.value.trim() || null }]);
  if (error) return alert('Error saving message');
  textInput.value = '';
  nameInput.value = '';
  loadSupportMessages();
};

loadSupportMessages();