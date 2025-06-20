import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const URL='https://ytgrzhtntwzefwjmhgjj.supabase.co';
const KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8';
const supabase = createClient(URL,KEY);

let candleCount=+localStorage.getItem('candles')||0;
let lang=localStorage.getItem('lang')||'en';
let theme=localStorage.getItem('theme')||'dark';

const texts={ en:['Community Memorial Wall','Share love, light a candle, cherish memories','📅 Remembered Loved One','💬 Send a Message','🌐 Messages'],
              fr:['Mur Commémoratif Communautaire','Partagez l’amour, allumez une bougie, chérissez les souvenirs','Profil de l’être cher','Envoyer un message','Messages']};

document.body.setAttribute('data-theme',theme);
document.getElementById('langSelector').value=lang;
document.getElementById('count').innerText=candleCount;
updateText();

document.getElementById('themeToggle').onclick=()=>{
  theme = theme==='light'?'dark':'light';
  document.body.setAttribute('data-theme',theme);
  localStorage.setItem('theme',theme);
};

document.getElementById('langSelector').onchange=e=>{
  lang=e.target.value; localStorage.setItem('lang',lang); updateText();
};

function updateText() {
  const a=texts[lang];
  ['header','subheader','profileTitle','sendMsgTitle','communityTitle'].forEach((id,i)=>{
    document.getElementById(id).innerText=a[i];
  });
}

document.getElementById('candleBtn').onclick=()=>{
  candleCount++;
  localStorage.setItem('candles',candleCount);
  document.getElementById('count').innerText=candleCount;
  document.getElementById('ambience').play();
  emitFloater('🕯️');
};

function emitFloater(sym) {
  const el=document.createElement('span');
  el.innerText=sym;
  el.style.left=Math.random()*80+'vw';
  document.querySelector('.floaters').append(el);
  setTimeout(()=>el.remove(),7000);
}

async function loadAll() {
  const { data:p } = await supabase.from('loved_ones').select('*').order('created_at',{ascending:false});
  renderCarousel(p); populateOptions(p);
  const { data:m } = await supabase.from('messages').select('*').order('created_at',{ascending:true});
  renderMessages(m);
}

function renderCarousel(list) {
  const car=document.getElementById('profilesCarousel');
  car.innerHTML='';
  list.forEach(prof=>{
    if(!prof.photo_url) return;
    const img=document.createElement('img');
    img.src=prof.photo_url;
    img.alt=`${prof.name}`;
    car.appendChild(img);
  });
}

function populateOptions(list) {
  const sel=document.getElementById('profileLink');
  sel.innerHTML='<option value="">Tag Loved One</option>';
  list.forEach(prof=>{
    const opt=document.createElement('option');
    opt.value=prof.id;
    opt.innerText=prof.name;
    sel.appendChild(opt);
  });
}

function renderMessages(list) {
  const out=document.getElementById('messages');
  out.innerHTML='';
  list.forEach(msg=>{
    const div=document.createElement('div');
    div.className='message';
    div.innerHTML=`<strong>${msg.name||'Anonymous'}:</strong><p>${msg.text}</p>`;
    out.appendChild(div);
    setTimeout(()=>emitFloater('💌'),200);
  });
}

document.getElementById('profileBtn').onclick=async()=> {
  const name=document.getElementById('profileName').value;
  const birth=document.getElementById('profileBirth').value;
  const death=document.getElementById('profileDeath').value;
  const tribute=document.getElementById('profileTribute').value;
  const file=document.getElementById('profilePhoto').files[0];
  let photo_url=null;
  if(file){
    const path=`profiles/${Date.now()}_${file.name}`;
    await supabase.storage.from('photos').upload(path,file);
    photo_url=`${URL}/storage/v1/object/public/photos/${path}`;
  }
  await supabase.from('loved_ones').insert({name,birth,death,tribute,photo_url});
  loadAll();
};

document.getElementById('sendBtn').onclick=async()=> {
  const name=document.getElementById('nameField').value||'Anonymous';
  const text=document.getElementById('messageText').value;
  const prof_id=document.getElementById('profileLink').value || null;
  await supabase.from('messages').insert({name,name, text, profile_id:prof_id});
  loadAll();
};

window.onload = loadAll;