document.addEventListener("DOMContentLoaded", () => {
  // PARTICLE BACKGROUND
  const canvas = document.getElementById("particle-canvas"),
        ctx    = canvas.getContext("2d");
  let parts = [];
  function resize() {
    canvas.width  = innerWidth;
    canvas.height = innerHeight;
    parts = [];
    for (let i=0; i<100; i++) {
      parts.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        s: Math.random()*2 + 1,
        vx: (Math.random()-0.5)*0.2,
        vy: (Math.random()-0.5)*0.2,
        a: Math.random()*0.5 + 0.3
      });
    }
  }
  window.addEventListener("resize", resize);
  resize();
  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    parts.forEach(p => {
      ctx.fillStyle = `rgba(212,0,255,${p.a})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.s,0,2*Math.PI);
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x<0||p.x>canvas.width)  p.vx*=-1;
      if (p.y<0||p.y>canvas.height) p.vy*=-1;
    });
    requestAnimationFrame(animate);
  }
  animate();

  // POPUP HELPER
  function createPopup(title, html, theme) {
    const overlay = document.createElement("div");
    overlay.className = "popup";
    if (theme === "rave") overlay.style.background = "rgba(255,0,255,0.9)";
    if (theme === "zeus") overlay.style.background = "rgba(0,150,255,0.9)";
    if (theme === "snack") overlay.style.background = "rgba(255,140,0,0.9)";
    if (theme === "dantebot") overlay.style.background = "rgba(0,200,150,0.9)";
    const box = document.createElement("div");
    box.className = "popup-content";
    box.innerHTML = `<button class="close-btn">✖</button><h2>${title}</h2>${html}`;
    box.querySelector(".close-btn").onclick = () => document.body.removeChild(overlay);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  // FEATURES

  window.showFocusTimer = () => {
    createPopup("⏱ Focus Timer", `
      <p>Stay sharp!</p>
      <button id="st" class="glow-btn">Start 25m</button>
      <p id="td"></p>
    `);
    let time=25*60, tid;
    const disp = document.getElementById("td");
    document.getElementById("st").onclick = () => {
      clearInterval(tid);
      tid = setInterval(() => {
        time--;
        const m=Math.floor(time/60), s=time%60;
        disp.textContent = \`\${m}:\${s<10?'0'+s:s}\`;
        if (time<=0) { clearInterval(tid); disp.textContent="⏰ Done!"; }
      },1000);
    };
  };

  window.showRaveRhythm = () => {
    createPopup("🎵 Rave Rhythm", `
      <p>Tap the beat!</p>
      <button id="pb" class="glow-btn">Play Beat</button>
    `,"rave");
    document.getElementById("pb").onclick = () => {
      new Audio("https://cdn.pixabay.com/download/audio/2022/03/28/audio_93651f9b69.mp3?filename=electronic-drum-12683.mp3").play();
    };
  };

  window.showDarkJokes = () => {
    const jokes = [
      "Why don’t graveyards ever get overcrowded? People are dying to get in.",
      "Why don’t skeletons fight each other? They don’t have the guts.",
      "I used to play piano by ear, but now I use my hands.",
      "My dark humour is like a broken pencil. Pointless."
    ];
    createPopup("🃏 Dark Joke", `<p>${jokes[Math.floor(Math.random()*jokes.length)]}</p>`,"darkjoke");
  };

  window.showCarRepair = () => {
    createPopup("🔧 Fix It Fast", `
      <textarea id="idea" rows="3" style="width:100%;border-radius:8px;padding:8px;"></textarea>
      <button id="ib" class="glow-btn" style="margin-top:10px;">Submit Idea</button>
      <p id="ir"></p>
    `);
    document.getElementById("ib").onclick = () => {
      const v = document.getElementById("idea").value.trim();
      document.getElementById("ir").textContent = v 
        ? \`Great idea: "\${v}"\` 
        : "Share your genius!";
    };
  };

  window.showMemoryMatch  = ()=>createPopup("🧠 Memory Match","<p>Coming soon…</p>");
  window.showLobsterMaze  = ()=>createPopup("🦞 Lobster Escape","<p>Coming soon…</p>");
  window.showFunnyFacts   = ()=>createPopup("🧠 Funny Fact",`<p>${["Lobsters taste with their legs!","Rap began in the Bronx","Zeus is a great boy","Sassy the Sasquatch","Engineers built hoverboards"][Math.floor(Math.random()*5)]}</p>`);
  window.showSnackIdeas   = ()=>createPopup("🍿 Snack Idea",`<p><strong>${["Nachos","Poutine","Trail mix","Sriracha popcorn","Guac & chips"][Math.floor(Math.random()*5)]}</strong></p>`,"snack");
  window.showDanteBot     = ()=>{createPopup("🤖 DanteBot",`<input id="dbq" style="width:100%;padding:6px;border-radius:6px;"><button id="dbb" class="glow-btn" style="margin-top:8px;">Ask</button><p id="dbr"></p>`,"dantebot");document.getElementById("dbb").onclick=()=>{const q=document.getElementById("dbq").value.toLowerCase(),r=document.getElementById("dbr");r.textContent=q.includes("rap")?"Rap is 🔥!":q.includes("lobster")?"Claw-some!":q.includes("zeus")?"Zeus rules!":"Keep vibin’!"}};
  window.showZeusCorner   = ()=>createPopup("🐶 Zeus’s Corner",`<p>Dogs know 250 words!</p><img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=300&q=80" style="width:100%;border-radius:10px;margin-top:1rem;">`,"zeus");

});