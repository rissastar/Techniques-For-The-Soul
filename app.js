import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const URL='https://ytgrzhtntwzefwjmhgjj.supabase.co';
const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);
const supabase = createClient(URL,KEY);

let candles=+localStorage.getItem('candles')||0;
let lang=localStorage.getItem('lang')||'en';
let theme=localStorage.getItem('theme')||'dark';

const texts={ en: { header:['Community Memorial Wall','Share love, light a candle, and cherish memories.','📅 Remembered Loved One','🕯️ Light a Candle','💬 Send a Message','🌐 Messages'] },
              fr: { header:['Mur Commémoratif Communautaire','Partagez l’amour, allumez une bougie, et chérissez les souvenirs.','Profil','Allumer une bougie','Envoyer un message','Messages'] } };

function text(i){return texts[lang].header[i];}
document.body.setAttribute('data-theme',theme);
document.getElementById('langSelector').value=lang;
document.getElementById('count').innerText=candles;

// Ambient music control
const audio=document.getElementById('ambience');
document.getElementById('candleBtn').onclick=()=>{
  candles++; localStorage.setItem('candles',candles);
  document.getElementById('count').innerText=candles;
  audio.play();
  floatHeart('🕯️');
};

// Language/theme toggles
document.getElementById('langSelector').onchange=e=>{
  lang=e.target.value; localStorage.setItem('lang',lang); updateText();
};
document.getElementById('themeToggle').onclick=()=>{
  theme= theme==='light'?'dark':'light';
  localStorage.setItem('theme',theme);
  document.body.setAttribute('data-theme',theme);
  document.getElementById('themeToggle').innerText=theme==='light'?'🌙':'☀️';
};

function updateText(){['header','subheader','profileTitle','lightCandleTitle','sendMsgTitle','communityTitle'].forEach((id,i)=>{
  document.getElementById(id).innerText=text(i);
});}

// Floating heart
function floatHeart(symbol){
  const el=document.createElement('span');
  el.innerText=symbol;
  el.style.left=Math.random()*80+'vw';
  document.querySelector('.floaters').append(el);
  setTimeout(()=>el.remove(),8000);
}

// Carousel rendering
function showProfiles(ps){
  const car=document.getElementById('profilesCarousel');
  car.innerHTML='';
  ps.forEach(p=>{
    const img=document.createElement('img');
    img.src=p.photo_url; img.title=`${p.name} (${p.birth}–${p.death})`;
    car.append(img);
  });
}

// Message & profiles Supabase calls
async function loadAll(){
  updateText();
  const { data:ps }=await supabase.from('loved_ones').select('*').order('created_at',{ascending:false});
  showProfiles(ps); populateProfiles(ps);

  const { data:msgs }=await supabase.from('messages').select('*').order('created_at',{ascending:true});
  renderMessages(msgs);
}
function populateProfiles(ps){
  const sel=document.getElementById('profileLink');
  sel.innerHTML='<option>Tag Loved One</option>';
  ps.forEach(p=>sel.innerHTML+=`<option value="${p.id}">${p.name}</option>`);
}
function renderMessages(ms){
  const out=document.getElementById('messages');
  out.innerHTML='';
  ms.forEach(m=>{
    const d=document.createElement('div');
    d.className='message';
    d.innerHTML=`<strong>${m.name||'Anon'}:</strong><p>${m.text}</p>`;
    out.append(d);
    floatHeart('💌');
  });
}

// Profile & message submission
document.getElementById('profileBtn').onclick=async()=>{
  const name=document.getElementById('profileName').value;
  const birth=document.getElementById('profileBirth').value;
  const death=document.getElementById('profileDeath').value;
  const photo=document.getElementById('profilePhoto').files[0];
  const tribute=document.getElementById('profileTribute').value;
  let photo_url=null;
  if(photo){
    const path=`profiles/${Date.now()}_${photo.name}`;
    await supabase.storage.from('photos').upload(path,photo);
    photo_url=`${URL}/storage/v1/object/public/photos/${path}`;
  }
  await supabase.from('loved_ones').insert({name,birth,death,tribute,photo_url});
  loadAll();
};

document.getElementById('sendBtn').onclick=async()=>{
  const name=document.getElementById('nameField').value||'Anon';
  const text=document.getElementById('messageText').value;
  await supabase.from('messages').insert({name,text});
  loadAll();
};

loadAll();