document.addEventListener("DOMContentLoaded", () => {

  function showPopup(contentHTML) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
      <div class="popup-content">
        <button class="close-btn">❌</button>
        ${contentHTML}
      </div>`;
    document.body.appendChild(popup);
    popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());
  }

  /* 1. Focus Timer */
  window.showFocusTimer = () => {
    showPopup(`
      <h2>⏱ Focus Timer</h2>
      <input id="timer-input" type="number" placeholder="Minutes (1–60)" style="width:80%;padding:0.5rem;">
      <br><br>
      <button id="start-timer" class="glow-btn">Start</button>
      <p id="timer-display" style="font-size:1.5rem;margin-top:1rem;"></p>
    `);
    const input = document.getElementById("timer-input");
    const display = document.getElementById("timer-display");
    let timeLeft, timerId;
    document.getElementById("start-timer").addEventListener("click", () => {
      const mins = parseInt(input.value);
      if (!mins || mins<1||mins>60) return alert("Enter 1–60");
      clearInterval(timerId);
      timeLeft = mins*60; update();
      timerId = setInterval(() => {
        timeLeft--; update();
        if (timeLeft<=0) {
          clearInterval(timerId);
          display.textContent = "⏰ Done! Take a break.";
          navigator.vibrate?.([300,150,300]);
        }
      },1000);
    });
    function update() {
      const m = String(Math.floor(timeLeft/60)).padStart(2,'0');
      const s = String(timeLeft%60).padStart(2,'0');
      display.textContent = `${m}:${s}`;
    }
  };

  /* 2. Rave Rhythm */
  window.showRaveRhythm = () => {
    let score = 0;
    showPopup(`
      <h2>🎵 Rave Rhythm</h2>
      <p>Tap the beat!</p>
      <button id="beat-btn" class="glow-btn">🎶 TAP 🎶</button>
      <p id="beat-score" style="font-size:1.5rem;margin-top:1rem;">Score: 0</p>
    `);
    const btn = document.getElementById("beat-btn");
    const disp = document.getElementById("beat-score");
    btn.addEventListener("click", () => {
      score++;
      disp.textContent = `Score: ${score}`;
      btn.classList.add("pulse");
      setTimeout(() => btn.classList.remove("pulse"),100);
    });
  };

  /* 3. Dark Jokes */
  window.showDarkJokes = () => {
    const jokes = [
      "Why don’t graveyards ever get overcrowded? People are dying to get in.",
      "What’s the last thing that goes through a bug’s mind when it hits a windshield? Its butt.",
      "Parallel lines have so much in common. It’s a shame they’ll never meet.",
      "I used to play piano by ear, but now I use my hands.",
      "My dark humour is like a broken pencil. Pointless."
    ];
    showPopup(`
      <h2>🃏 Dark Jokes</h2>
      <button id="joke-btn" class="glow-btn">Tell Me</button>
      <p id="joke-text" style="margin-top:1rem;"></p>
    `);
    document.getElementById("joke-btn").addEventListener("click", () => {
      document.getElementById("joke-text").textContent = jokes[Math.floor(Math.random()*jokes.length)];
    });
  };

  /* 4. Car Repair */
  window.showCarRepair = () => {
    let count = 0;
    showPopup(`
      <h2>🔧 Fix It Fast</h2>
      <button id="fix-btn" class="glow-btn">Fix 🔧</button>
      <p id="fix-count" style="margin-top:1rem;">Fixed: 0</p>
    `);
    const btn = document.getElementById("fix-btn");
    const disp = document.getElementById("fix-count");
    btn.addEventListener("click", () => {
      count++;
      disp.textContent = `Fixed: ${count}`;
      btn.textContent = count%5===0 ? "You're a machine!" : "Fix 🔧";
    });
  };

  /* 5. Memory Match (placeholder) */
  window.showMemoryMatch = () => {
    showPopup(`
      <h2>🧠 Memory Match</h2>
      <p>Card match game in development!</p>
    `);
  };

  /* 6. Lobster Maze (placeholder) */
  window.showLobsterMaze = () => {
    showPopup(`
      <h2>🦞 Lobster Escape</h2>
      <p>Maze game coming soon...</p>
    `);
  };

  /* 7. Funny Facts */
  window.showFunnyFacts = () => {
    const facts = [
      "Octopuses have three hearts!",
      "Bananas are berries, but strawberries aren't.",
      "Lobsters pee out of their faces to communicate!",
      "You can hear a blue whale’s heartbeat from 2 miles away.",
      "Wombat poop is cube-shaped.",
      "Sharks existed before trees.",
      "A group of flamingos is called a 'flamboyance'.",
      "Some turtles can breathe through their butts."
    ];
    showPopup(`
      <div style="background:#1a1a2e; border:3px solid #9fef00; box-shadow:0 0 20px #9fef00; padding:1em; border-radius:12px;">
        <h2 style="color:#9fef00">🧠 Funny Facts</h2>
        <button id="fact-btn" class="glow-btn">Hit Me With a Fact</button>
        <p id="fact-text" style="margin-top:10px;"></p>
      </div>
    `);
    document.getElementById("fact-btn").addEventListener("click", () => {
      document.getElementById("fact-text").textContent = facts[Math.floor(Math.random()*facts.length)];
    });
  };

  /* 8. Snack Ideas */
  window.showSnackIdeas = () => {
    const snacks = [
      "🍫 Chocolate-dipped bacon",
      "🍟 Fries with gravy and hot sauce",
      "🍓 Frozen grapes with lemon juice",
      "🧀 Cheese quesadilla + ranch dip",
      "🥒 Pickles and peanut butter (don't knock it!)",
      "🍗 Hot wings dipped in maple syrup",
      "🥞 Mini pancake tacos with Nutella",
      "🍕 Leftover pizza rolled into a burrito"
    ];
    showPopup(`
      <div style="background:#2e1a1a; border:3px solid #ff9900; box-shadow:0 0 20px #ff9900; padding:1em; border-radius:12px;">
        <h2 style="color:#ff9900">🍿 Snack Ideas</h2>
        <button id="snack-btn" class="glow-btn">Feed Me Ideas</button>
        <p id="snack-text" style="margin-top:10px;"></p>
      </div>
    `);
    document.getElementById("snack-btn").addEventListener("click", () => {
      document.getElementById("snack-text").textContent = snacks[Math.floor(Math.random()*snacks.length)];
    });
  };

  /* 9. DanteBot */
  window.showDanteBot = () => {
    showPopup(`
      <div style="background:#1a2e2a; border:3px solid #00ffee; box-shadow:0 0 20px #00ffee; padding:1em; border-radius:12px;">
        <h2 style="color:#00ffee">🤖 DanteBot</h2>
        <input id="dantebot-input" type="text" placeholder="Ask me anything..." style="width:100%;padding:6px;border-radius:6px;">
        <button id="dantebot-btn" class="glow-btn" style="margin-top:8px;">Ask</button>
        <p id="dantebot-response" style="margin-top:10px;"></p>
      </div>
    `);
    const input = document.getElementById("dantebot-input");
    const resp = document.getElementById("dantebot-response");
    document.getElementById("dantebot-btn").addEventListener("click", () => {
      const q = input.value.toLowerCase();
      let a = "Hmm... I'm thinking about that.";
      if (q.includes("car")) a = "You’d probably invent the first rave-powered engine.";
      else if (q.includes("lobster")) a = "🦞 You ARE the lobster king, my dude.";
      else if (q.includes("love")) a = "Love you to the moon and back — Larissa.";
      else if (q.includes("joke")) a = "What did the stoner lobster say? Claw-ver move, bro.";
      else if (q.includes("fix")) a = "Duct tape and a good attitude fixes most things.";
      else if (q.includes("dog")) a = "Zeus is planning world domination. Starting with snacks.";
      resp.textContent = a;
    });
  };

  /* 10. Zeus’s Corner */
  window.showZeusCorner = () => {
    const zeusStuff = [
      "🐾 Zeus says: I only chew expensive shoes.",
      "🐶 If it fits, I sits. Even if it’s your face.",
      "🐾 Dogs can smell your feelings. And snacks.",
      "🐶 Why did the dog sit in the shade? To avoid being a hot dog!",
      "🐾 Zeus Fact: I chase dreams in my sleep... and squirrels.",
      "🐶 Dog Tip: Lick it first. Then decide.",
      "🐾 Zeus Reminder: I am your emotional support creature.",
      "🐶 Dog Philosophy: If you can’t eat it or play with it, pee on it."
    ];
    showPopup(`
      <div style="background:#1a1f2e; border:3px solid #66d9ff; box-shadow:0 0 20px #66d9ff; padding:1em; border-radius:12px;">
        <h2 style="color:#66d9ff">🐶 Zeus’s Corner</h2>
        <button id="zeus-btn" class="glow-btn">Woof!</button>
        <p id="zeus-text" style="margin-top:10px;"></p>
      </div>
    `);
    document.getElementById("zeus-btn").addEventListener("click", () => {
      document.getElementById("zeus-text").textContent = zeusStuff[Math.floor(Math.random()*zeusStuff.length)];
    });
  };

});