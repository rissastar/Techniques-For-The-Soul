// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Particle effect for background - subtle glowing dots
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particlesArray;

  function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000);

    for(let i = 0; i < numberOfParticles; i++) {
      particlesArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(212,0,255,${p.alpha})`;
      ctx.shadowColor = 'rgba(212,0,255,0.8)';
      ctx.shadowBlur = 8;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.speedX;
      p.y += p.speedY;

      if(p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
      if(p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", () => {
    initParticles();
  });

  initParticles();
  animateParticles();

  // Popup helper function
  function createPopup(title, content, theme = 'default') {
    const overlay = document.createElement("div");
    overlay.classList.add("popup");
    // Theme styles
    if(theme === 'rave') {
      overlay.style.background = "rgba(255, 0, 255, 0.95)";
    } else if(theme === 'zeus') {
      overlay.style.background = "rgba(0, 150, 255, 0.95)";
    } else if(theme === 'darkjoke') {
      overlay.style.background = "rgba(40, 40, 40, 0.97)";
      overlay.style.color = "#f0f0f0";
    } else if(theme === 'snack') {
      overlay.style.background = "rgba(255, 140, 0, 0.95)";
    } else if(theme === 'dantebot') {
      overlay.style.background = "rgba(0, 200, 150, 0.95)";
    } else {
      overlay.style.background = "rgba(10,10,30,0.95)";
    }

    const popup = document.createElement("div");
    popup.classList.add("popup-content");

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "✖";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    const header = document.createElement("h2");
    header.textContent = title;

    const body = document.createElement("div");
    body.innerHTML = content;

    popup.appendChild(closeBtn);
    popup.appendChild(header);
    popup.appendChild(body);
    overlay.appendChild(popup);

    document.body.appendChild(overlay);
  }

  // ======= Content functions =======
  function showFocusTimer() {
    createPopup("⏱ Focus Timer", `
      <p>Use the timer to boost your focus in short bursts.</p>
      <button id="startFocusBtn" class="glow-btn">Start 25 Minutes</button>
      <p id="focusMsg"></p>
    `);

    let timer;
    let countdown = 25 * 60;

    const startBtn = document.getElementById("startFocusBtn");
    const msg = document.getElementById("focusMsg");

    startBtn.onclick = () => {
      startBtn.disabled = true;
      msg.textContent = "Focus session started!";
      timer = setInterval(() => {
        countdown--;
        const mins = Math.floor(countdown / 60);
        const secs = countdown % 60;
        msg.textContent = `Time left: ${mins}:${secs < 10 ? '0' + secs : secs}`;
        if(countdown <= 0) {
          clearInterval(timer);
          msg.textContent = "Time's up! Take a break, Dante!";
          startBtn.disabled = false;
          countdown = 25 * 60;
        }
      }, 1000);
    };
  }

  function showRaveRhythm() {
    createPopup("🎵 Rave Rhythm", `
      <p>Tap the button to play a funky rave beat!</p>
      <button id="playBeatBtn" class="glow-btn">Play Beat</button>
    `, 'rave');

    const sounds = [
      new Audio("https://cdn.pixabay.com/download/audio/2022/03/28/audio_93651f9b69.mp3?filename=electronic-drum-12683.mp3"),
      new Audio("https://cdn.pixabay.com/download/audio/2022/03/27/audio_7c75567bf0.mp3?filename=electronic-bass-12663.mp3"),
      new Audio("https://cdn.pixabay.com/download/audio/2022/03/28/audio_6f1d923060.mp3?filename=electronic-beat-12685.mp3")
    ];

    const playBtn = document.getElementById("playBeatBtn");

    playBtn.onclick = () => {
      sounds.forEach((s, i) => {
        setTimeout(() => {
          s.currentTime = 0;
          s.play();
        }, i * 500);
      });
    };
  }

  function showDarkJokes() {
    const jokes = [
      "Why don't graveyards ever get overcrowded? Because people are dying to get in.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "Why don't skeletons fight each other? They don't have the guts.",
      "I’d tell you a joke about addiction, but I’m hooked on something else."
    ];
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    createPopup("🃏 Dark Joke", `<p>${joke}</p>`, 'darkjoke');
  }

  function showCarRepair() {
    createPopup("🔧 Fix It Fast", `
      <p>Need a quick engineering brain teaser?</p>
      <p>How would you fix a squeaky car door? Type your idea below:</p>
      <textarea id="repairInput" rows="4" style="width:100%; border-radius:8px; padding:8px;"></textarea>
      <button id="submitRepair" class="glow-btn" style="margin-top:10px;">Submit Idea</button>
      <p id="repairResponse" style="margin-top:1rem;"></p>
    `);

    document.getElementById("submitRepair").onclick = () => {
      const idea = document.getElementById("repairInput").value.trim();
      const resp = document.getElementById("repairResponse");
      if(!idea) {
        resp.textContent = "Come on Dante, share your genius!";
      } else {
        resp.textContent = `Nice idea! "${idea}" sounds like a pro fix!`;
      }
    };
  }

  function showMemoryMatch() {
    createPopup("🧠 Memory Match", `
      <p>Match the pairs!</p>
      <p><i>Game coming soon...</i></p>
    `);
  }

  function showLobsterMaze() {
    createPopup("🦞 Lobster Escape", `
      <p>Help the lobster find its way out!</p>
      <p><i>Mini-game coming soon...</i></p>
    `);
  }

  function showFunnyFacts() {
    const facts = [
      "Did you know? Lobsters taste with their legs!",
      "Rap music started in the 1970s in the Bronx, NYC.",
      "Sassy the Sasquatch is a hilarious character from a Canadian mockumentary show.",
      "Zeus is probably the coolest dog on the planet!",
      "Engineers invented the first hoverboard in the 1960s."
    ];
    const fact = facts[Math.floor(Math.random() * facts.length)];
    createPopup("🧠 Funny Fact", `<p>${fact}</p>`);
  }

  function showSnackIdeas() {
    const snacks = [
      "Nachos with extra cheese and jalapeños!",
      "Classic poutine—fries, gravy, and cheese curds.",
      "Trail mix with nuts, chocolate, and dried fruit.",
      "Sriracha popcorn for a spicy kick.",
      "Homemade guacamole with crunchy chips."
    ];
    const snack = snacks[Math.floor(Math.random() * snacks.length)];
    createPopup("🍿 Snack Idea", `<p>How about: <strong>${snack}</strong>?</p>`, 'snack');
  }

  function showDanteBot() {
    createPopup("🤖 DanteBot", `
      <p>Ask me anything, Dante!</p>
      <input type="text" id="danteInput" style="width:100%; padding:8px; border-radius:8px; margin-bottom:10px;" placeholder="Type your question..." />
      <button id="danteAskBtn" class="glow-btn">Ask</button>
      <p id="danteReply" style="margin-top:1rem;"></p>
    `, 'dantebot');

    document.getElementById("danteAskBtn").onclick = () => {
      const question = document.getElementById("danteInput").value.trim().toLowerCase();
      const replyEl = document.getElementById("danteReply");
      if (!question) {
        replyEl.textContent = "I’m waiting for your question!";
        return;
      }

      // Simple fun responses
      if(question.includes("rap")) {
        replyEl.textContent = "Rap is fire, Dante! Keep vibin’ 🔥🎤";
      } else if(question.includes("lobster")) {
        replyEl.textContent = "Lobsters are the kings of the sea crustaceans!";
      } else if(question.includes("zeus")) {
        replyEl.textContent = "Zeus sounds like a good boy. Give him a belly rub for me!";
      } else if(question.includes("rave")) {
        replyEl.textContent = "Raves bring the energy! Don’t forget your glow sticks!";
      } else {
        replyEl.textContent = "Hmm... That’s a tough one! Keep being awesome, Dante!";
      }
    };
  }

  function showZeusCorner() {
    createPopup("🐶 Zeus’s Corner", `
      <p>Here’s a cute dog fact for you:</p>
      <p>Dogs can understand up to 250 words and gestures!</p>
      <img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80" alt="Cute dog" style="border-radius:12px; width:100%; margin-top:1rem;" />
    `, 'zeus');
  }

  // Expose functions globally for inline onclick handlers
  window.showFocusTimer = showFocusTimer;
  window.showRaveRhythm = showRaveRhythm;
  window.showDarkJokes = showDarkJokes;
  window.showCarRepair = showCarRepair;
  window.showMemoryMatch = showMemoryMatch;
  window.showLobsterMaze = showLobsterMaze;
  window.showFunnyFacts = showFunnyFacts;
  window.showSnackIdeas = showSnackIdeas;
  window.showDanteBot = showDanteBot;
  window.showZeusCorner = showZeusCorner;
});