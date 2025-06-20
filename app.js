// ─── Supabase Initialization ─────────────────────────────────────────
const URL = 'https://ytgrzhtntwzefwjmhgjj.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';
const supabase = createClient(URL, KEY);

// ─── Theme, Language & Music Toggles ──────────────────────────────
const htmlEl = document.documentElement;
document.getElementById('theme-toggle').onclick = () => {
  htmlEl.dataset.theme = htmlEl.dataset.theme==='dark'?'light':'dark';
};
document.getElementById('lang-toggle').onclick = () => {
  htmlEl.dataset.lang = htmlEl.dataset.lang==='en'?'fr':'en';
  document.querySelectorAll('[data-en]').forEach(el=>{
    el.textContent = el.dataset[ htmlEl.dataset.lang ];
  });
};
const music = new Audio('ambient.mp3');
music.loop = true;
document.getElementById('music-toggle').onclick = () => {
  music.paused?music.play():music.pause();
};

// ─── Utility: show items in a grid ────────────────────────────────
function renderGrid(containerId, items, renderer) {
  document.getElementById(containerId).innerHTML =
    items.map(renderer).join('');
}

// ─── Candle Section ───────────────────────────────────────────────
async function loadCandles() {
  let { data } = await supabase.from('candles').select('*').order('created_at', {asc:false});
  renderGrid('candle-list', data, c =>
    `<div class="item"><p>🕯 ${c.name}</p></div>`);
}
document.getElementById('submit-candle').onclick = async ()=>{
  let name = document.getElementById('candle-name').value.trim();
  if(!name) return alert('Enter a name');
  await supabase.from('candles').insert({ name });
  document.getElementById('candle-name').value='';
  loadCandles();
};
loadCandles();

// ─── Tributes Section ────────────────────────────────────────────
async function loadTributes() {
  let { data } = await supabase.from('tributes').select('*').order('created_at',{asc:false});
  renderGrid('tribute-list', data, t =>
    `<div class="item"><p>"${t.content}"</p><p>– ${t.name||'Anonymous'}</p></div>`);
}
document.getElementById('submit-tribute').onclick = async ()=>{
  let content = document.getElementById('tribute-text').value.trim();
  if(!content) return alert('Write your tribute');
  await supabase.from('tributes').insert({
    content, name: document.getElementById('tribute-name').value.trim()
  });
  document.getElementById('tribute-text').value='';
  document.getElementById('tribute-name').value='';
  loadTributes();
};
loadTributes();

// ─── Photo Gallery ────────────────────────────────────────────────
async function loadPhotos() {
  let { data } = await supabase.from('photos').select('*').order('created_at',{asc:false});
  renderGrid('photo-gallery', data, p =>
    `<div class="item"><img src="${p.url}" alt="photo" style="width:100%; border-radius:8px;"><p>– ${p.name||''}</p></div>`);
}
document.getElementById('submit-photo').onclick = async ()=>{
  let file = document.getElementById('photo-input').files[0];
  if(!file) return alert('Choose a file');
  let path = `${Date.now()}_${file.name}`;
  let { data:uploadError } = await supabase.storage.from('photos').upload(path,file);
  let { publicURL } = supabase.storage.from('photos').getPublicUrl(path);
  await supabase.from('photos').insert({ url: publicURL, name:'' });
  loadPhotos();
};
loadPhotos();

// ─── Cloud Messages ───────────────────────────────────────────────
async function loadClouds() {
  let { data } = await supabase.from('clouds').select('*').order('created_at',{asc:false}).limit(20);
  const container = document.getElementById('cloud-container');
  container.innerHTML = '';
  data.forEach((c,i)=>{
    let span = document.createElement('span');
    span.className = 'cloud-msg';
    span.textContent = c.text;
    span.style.top = Math.random()*80+'%';
    span.style.left = Math.random()*80+'%';
    container.append(span);
    setTimeout(()=>span.remove(),10000+Math.random()*5000);
  });
}
document.getElementById('submit-cloud').onclick = async ()=>{
  let txt = document.getElementById('cloud-text').value.trim();
  if(!txt) return;
  await supabase.from('clouds').insert({ text:txt });
  document.getElementById('cloud-text').value='';
  loadClouds();
};
setInterval(loadClouds, 5000);
loadClouds();

// ─── Pinned Tributes ─────────────────────────────────────────────
async function loadPinned() {
  let { data } = await supabase.from('tributes').select('*').eq('pinned', true);
  renderGrid('pinned-list', data, t =>
    `<div class="item"><strong>★</strong><p>"${t.content}"</p></div>`);
}
loadPinned();

// ─── Memory Map ─────────────────────────────────────────────────
document.getElementById('submit-map').onclick = async ()=>{
  let loc = document.getElementById('map-location').value.trim();
  if(!loc) return;
  await supabase.from('map_pins').insert({ location:loc });
  document.getElementById('map-location').value='';
  // placeholder: you’d integrate a real map API here
  alert(`Pinned: ${loc}`);
};

// ─── Grief Support ───────────────────────────────────────────────
const supportPrompts = [
  "Today, I honor my grief by remembering their laughter.",
  "Today, I honor my grief by lighting a candle.",
  "Today, I honor my grief by sharing a kind word."
];
document.getElementById('daily-prompt').textContent =
  supportPrompts[new Date().getDate() % supportPrompts.length];
async function loadSupport(){
  let { data } = await supabase.from('grief_support').select('*').order('created_at',{asc:false});
  renderGrid('support-list', data, m =>
    `<div class="item"><p>${m.content}</p><p>– ${m.name||'Anonymous'}</p></div>`);
}
document.getElementById('submit-support').onclick = async ()=>{
  let c = document.getElementById('support-text').value.trim();
  if(!c) return;
  await supabase.from('grief_support').insert({
    content:c, name:document.getElementById('support-name').value.trim()
  });
  document.getElementById('support-text').value='';
  document.getElementById('support-name').value='';
  loadSupport();
};
loadSupport();

// ─── Community Wall ────────────────────────────────────────────
async function loadCommunity(){
  let { data } = await supabase.from('community').select('*').order('created_at',{asc:false});
  renderGrid('community-list', data, m =>
    `<div class="item"><p>${m.content}</p><p>– ${m.name||'Anonymous'}</p></div>`);
}
document.getElementById('submit-community').onclick = async ()=>{
  let c = document.getElementById('community-text').value.trim();
  if(!c) return;
  await supabase.from('community').insert({
    content:c, name:document.getElementById('community-name').value.trim()
  });
  document.getElementById('community-text').value='';
  document.getElementById('community-name').value='';
  loadCommunity();
};
loadCommunity();

// ─── Anniversary Calendar ───────────────────────────────────────
async function loadAnniv(){
  let { data } = await supabase.from('anniversaries').select('*').order('date',{ascending:true});
  renderGrid('anniv-list', data, a =>
    `<div class="item"><strong>${new Date(a.date).toLocaleDateString()}</strong><p>${a.content}</p></div>`);
}
document.getElementById('submit-anniv').onclick = async ()=>{
  let date = document.getElementById('anniv-date').value;
  let content = document.getElementById('anniv-text').value.trim();
  if(!date||!content) return;
  await supabase.from('anniversaries').insert({ date, content });
  document.getElementById('anniv-date').value='';
  document.getElementById('anniv-text').value='';
  loadAnniv();
};
loadAnniv();