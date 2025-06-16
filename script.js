(() => {
  // Content for each category
  const content = {
    minigames: `
      <h2>Mini Games 🎮</h2>
      <p>Choose a game to play:</p>
      <ul>
        <li><button class="game-btn" data-game="reaction">⚡ Reaction Test</button></li>
        <li><button class="game-btn" data-game="memory">🧠 Memory Match</button></li>
        <li><button class="game-btn" data-game="ravejump">🎉 Rave Jump</button></li>
      </ul>
      <div id="game-container"></div>
    `,
    dailychallenge: `
      <h2>Daily Challenge 💥</h2>
      <p id="challenge-text">Loading challenge...</p>
      <button id="new-challenge-btn" class="neon-btn">New Challenge</button>
    `,
    funnyfacts: `
      <h2>Funny Facts 😂</h2>
      <p id="fact-text">Loading fact...</p>
      <button id="new-fact-btn" class="neon-btn">Show Another</button>
    `,
    snackideas: `
      <h2>Snack Ideas 🍿</h2>
      <p id="snack-text">Loading snack idea...</p>
      <button id="new-snack-btn" class="neon-btn">Show Another</button>
    `,
    dantebot: `
      <h2>DanteBot 🤖</h2>
      <p>Chat with DanteBot! (Try asking about raves, lobster fishing, or dark jokes!)</p>
      <input type="text" id="dantebot-input" placeholder="Say something..." autocomplete="off" />
      <button id="dantebot-send" class="neon-btn">Send</button>
      <div id="dantebot-chat" class="chat-box"></div>
    `,
    zeuscorner: `
      <h2>Zeus’s Corner 🐶</h2>
      <p>Zeus says: "Woof! Here are some fun dog facts and silly jokes for you."</p>
      <p id="zeus-fact-text">Loading...</p>
      <button id="new-zeus-fact-btn" class="neon-btn">Another Zeus Fact</button>
    `,
  };

  // Data arrays
  const dailyChallenges = [
    "Build something with household items today!",
    "Try a new snack you’ve never had before.",
    "Listen to a full rap album start to finish.",
    "Take a 10-minute break and dance like no one’s watching!",
    "Write a funny story about Zeus’s secret adventures.",
  ];
  const funnyFacts = [
    "Did you know? Lobsters pee out of their faces!",
    "Trailer Park Boys was mostly improvised!",
    "Sasquatch has inspired many dark jokes in Canadian folklore.",
    "Laughing 100 times is equivalent to 15 minutes of exercise!",
  ];
  const snackIdeas = [
    "Spicy cheese popcorn with a cold drink.",
    "Sweet potato fries with a zesty dip.",
    "Choco-covered espresso beans for a buzz.",
    "Loaded nachos with jalapeños and guac.",
  ];
  const zeusFacts = [
    "Dogs can hear 4 times the distance humans can.",
    "Zeus’s favorite toy is probably a squeaky bone!",
    "Some dogs dream just like humans.",
    "If Zeus could talk, he’d say 'More treats, please!'",
  ];

  // State for DanteBot chat
  let dantebotMessages = [];

  // Utility functions
  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Popup element refs
  const popup = document.getElementById("popup");
  const popupContent = document.getElementById("popup-content");
  const popupClose = document.getElementById("popup-close");

  // Show popup with specific content
  function showPopup(category) {
    popupContent.innerHTML = content[category] || "<p>Oops! No content found.</p>";
    popup.classList.remove("hidden");

    // Add event listeners for category-specific features
    if (category === "dailychallenge") {
      loadDailyChallenge();
      document.getElementById("new-challenge-btn").onclick = loadDailyChallenge;
    }
    if (category === "funnyfacts") {
      loadFunnyFact();
      document.getElementById("new-fact-btn").onclick = loadFunnyFact;
    }
    if (category === "snackideas") {
      loadSnackIdea();
      document.getElementById("new-snack-btn").onclick = loadSnackIdea;
    }
    if (category === "dantebot") {
      setupDanteBot();
    }
    if (category === "zeuscorner") {
      loadZeusFact();
      document.getElementById("new-zeus-fact-btn").onclick = loadZeusFact;
    }
    if (category === "minigames") {
      setupMiniGames();
    }
  }

  // Hide popup
  function hidePopup() {
    popup.classList.add("hidden");
    popupContent.innerHTML = "";
    dantebotMessages = [];
  }

  // Daily challenge
  function loadDailyChallenge() {
    const challengeText = document.getElementById("challenge-text");
    challengeText.textContent = getRandom(dailyChallenges);
  }

  // Funny facts
  function loadFunnyFact() {
    const factText = document.getElementById("fact-text");
    factText.textContent = getRandom(funnyFacts);
  }

  // Snack ideas
  function loadSnackIdea() {
    const snackText = document.getElementById("snack-text");
    snackText.textContent = getRandom(snackIdeas);
  }

  // Zeus corner facts
  function loadZeusFact() {
    const zeusFactText = document.getElementById("zeus-fact-text");
    zeusFactText.textContent = getRandom(zeusFacts);
  }

  // DanteBot simple responses
  function danteBotResponse(message) {
    message = message.toLowerCase();
    if (message.includes("rave")) return "Raves are lit! Don’t forget your glowsticks 🔥✨";
    if (message.includes("lobster")) return "Lobster fishing is the best! Fresh catch = fresh vibes 🦞";
    if (message.includes("joke")) return "Why don’t lobsters ever share? Because they’re shellfish! 😂";
    if (message.includes("movie")) return "Trailer Park Boys is classic — have you seen the latest season?";
    if (message.includes("zeus")) return "Zeus says: Woof! Ready for a walk or a snack?";
    if (message.includes("fix") || message.includes("engineer")) return "Got a tricky problem? Let’s brainstorm some clever fixes!";
    if (message.includes("hi") || message.includes("hello")) return "Hey Dante! What’s up?";
    if (message.trim() === "") return "Say something, Dante! I'm all ears 👂";
    return "Hmm... tell me more!";
  }

  // Setup DanteBot chat UI & handlers
  function setupDanteBot() {
    const input = document.getElementById("dantebot-input");
    const sendBtn = document.getElementById("dantebot-send");
    const chatBox = document.getElementById("dantebot-chat");
    chatBox.innerHTML = "";

    function addMessage(text, fromUser) {
      const msg = document.createElement("div");
      msg.className = fromUser ? "chat-msg user" : "chat-msg bot";
      msg.textContent = text;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.onclick = () => {
      const userText = input.value.trim();
      if (!userText) return;
      addMessage(userText, true);
      input.value = "";
      setTimeout(() => {
        const reply = danteBotResponse(userText);
        addMessage(reply, false);
      }, 700);
    };

    input.onkeydown = (e) => {
      if (e.key === "Enter") {
        sendBtn.click();
      }
    };
  }

  // Mini-games setup
  function setupMiniGames() {
    const container = document.getElementById("game-container");
    container.innerHTML = "";

    // Reaction Test game
    function reactionTest() {
      container.innerHTML = `
        <h3>⚡ Reaction Test</h3>
        <p>Wait for green, then tap as fast as you can!</p>
        <div id="reaction-box" class="reaction-box">Wait...</div>
        <p id="reaction-result"></p>
        <button id="reaction-reset" class="neon-btn">Play Again</button>
      `;
      const box = document.getElementById("reaction-box");
      const result = document.getElementById("reaction-result");
      const resetBtn = document.getElementById("reaction-reset");
      let timeoutId;
      let startTime;

      function startTest() {
        box.textContent = "Wait...";
        box.style.backgroundColor = "#aa0000";
        result.textContent = "";
        timeoutId = setTimeout(() => {
          box.textContent = "TAP!";
          box.style.backgroundColor = "#39ff14";
          startTime = performance.now();
        }, 1500 + Math.random() * 2000);
      }

      box.onclick = () => {
        if (box.textContent === "Wait...") {
          // Too early
          clearTimeout(timeoutId);
          result.textContent = "Too soon! Wait for green.";
          box.style.backgroundColor = "#aa0000";
          setTimeout(startTest, 1500);
        } else if (box.textContent === "TAP!") {
          const reactionTime = (performance.now() - startTime).toFixed(0);
          result.textContent = `Your reaction time: ${reactionTime} ms!`;
          box.style.backgroundColor = "#007700";
          box.textContent = "Good!";
        }
      };

      resetBtn.onclick = () => startTest();

      startTest();
    }

    // Memory Match game (simple)
    function memoryMatch() {
      container.innerHTML = `
        <h3>🧠 Memory Match</h3>
        <p>Find matching pairs fast!</p>
        <div id="memory-board" class="memory-board"></div>
        <p id="memory-result"></p>
        <button id="memory-reset" class="neon-btn">Restart</button>
      `;
      const board = document.getElementById("memory-board");
      const result = document.getElementById("memory-result");
      const resetBtn = document.getElementById("memory-reset");

      const icons = ["🦞","🚗","🎵","🐶","🔥","🌈"];
      const cards = [...icons, ...icons];
      let shuffled = [];
      let flipped = [];
      let matchedPairs = 0;

      function shuffle(arr) {
        return arr.sort(() => 0.5 - Math.random());
      }

      function createCard(icon) {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.icon = icon;
        card.textContent = "❓";
        card.addEventListener("click", () => {
          if (flipped.length < 2 && !card.classList.contains("matched") && !flipped.includes(card)) {
            flipCard(card);
          }
        });
        return card;
      }

      function flipCard(card) {
        card.textContent = card.dataset.icon;
        flipped.push(card);
        if (flipped.length === 2) {
          if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
            flipped.forEach(c => c.classList.add("matched"));
            matchedPairs++;
            result.textContent = `Matches found: ${matchedPairs}/${icons.length}`;
            flipped = [];
            if (matchedPairs === icons.length) {
              result.textContent = "You matched all pairs! 🎉";
            }
          } else {
            setTimeout(() => {
              flipped.forEach(c => c.textContent = "❓");
              flipped = [];
            }, 1000);
          }
        }
      }

      function initGame() {
        board.innerHTML = "";
        matchedPairs = 0;
        result.textContent = "";
        flipped = [];
        shuffled = shuffle(cards);
        shuffled.forEach(icon => board.appendChild(createCard(icon)));
      }

      resetBtn.onclick = initGame;
      initGame();
    }

    // Rave Jump game - simple click to jump the lobster over obstacles
    function raveJump() {
      container.innerHTML = `
        <h3>🎉 Rave Jump</h3>
        <p>Click "Jump" to hop over obstacles and score points!</p>
        <div id="rave-game" class="rave-game">
          <div id="lobster" class="lobster">🦞</div>
          <div id="obstacle" class="obstacle">🚧</div>
        </div>
        <p>Score: <span id="score">0</span></p>
        <button id="jump-btn" class="neon-btn">Jump</button>
      `;
      const lobster = document.getElementById("lobster");
      const obstacle = document.getElementById("obstacle");
      const scoreEl = document.getElementById("score");
      const jumpBtn = document.getElementById("jump-btn");

      let isJumping = false;
      let score = 0;

      function jump() {
        if (isJumping) return;
        isJumping = true;
        lobster.style.bottom = "80px";
        setTimeout(() => {
          lobster.style.bottom = "20px";
          isJumping = false;
        }, 600);
      }

      function checkCollision() {
        const lobsterRect = lobster.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
          lobsterRect.right > obstacleRect.left &&
          lobsterRect.left < obstacleRect.right &&
          lobsterRect.bottom > obstacleRect.top &&
          lobsterRect.top < obstacleRect.bottom &&
          lobster.style.bottom === "20px"
        ) {
          alert(`Oops! You hit the obstacle. Final score: ${score}`);
          score = 0;
          scoreEl.textContent = score;
        } else if (
          lobsterRect.right > obstacleRect.left &&
          lobsterRect.left < obstacleRect.right &&
          lobster.style.bottom === "80px"
        ) {
          score++;
          scoreEl.textContent = score;
          // Move obstacle off screen and back randomly
          obstacle.style.left = "-50px";
          setTimeout(() => {
            obstacle.style.left = "100%";
          }, 800);
        }
      }

      jumpBtn.onclick = jump;
      // Move obstacle continuously left to right every 3 seconds
      function animateObstacle() {
        obstacle.style.left = "100%";
        let pos = window.innerWidth;
        let speed = 8; // pixels per frame approx

        function frame() {
          pos -= speed;
          if (pos < -50) {
            pos = window.innerWidth + Math.random() * 200;
          }
          obstacle.style.left = pos + "px";
          checkCollision();
          requestAnimationFrame(frame);
        }
        frame();
      }
      // Init styles
      lobster.style.position = "relative";
      lobster.style.bottom = "20px";
      obstacle.style.position = "fixed";
      obstacle.style.top = "calc(50vh + 30px)";
      obstacle.style.left = "100%";
      animateObstacle();
    }

    // Game buttons handler
    const gameBtns = container.querySelectorAll(".game-btn");
    gameBtns.forEach(btn => {
      btn.onclick = () => {
        const game = btn.dataset.game;
        if (game === "reaction") reactionTest();
        else if (game === "memory") memoryMatch();
        else if (game === "ravejump") raveJump();
      };
    });
  }

  // Setup nav buttons
  document.getElementById("btn-minigames").onclick = () => showPopup("minigames");
  document.getElementById("btn-dailychallenge").onclick = () => showPopup("dailychallenge");
  document.getElementById("btn-funnyfacts").onclick = () => showPopup("funnyfacts");
  document.getElementById("btn-snackideas").onclick = () => showPopup("snackideas");
  document.getElementById("btn-dantebot").onclick = () => showPopup("dantebot");
  document.getElementById("btn-zeuscorner").onclick = () => showPopup("zeuscorner");

  popupClose.onclick = hidePopup;

  // Personal intro popup on page load
  window.onload = () => {
    alert(`Hey Dante! This is your Fun Hub, filled with games, jokes, snacks, and more — all picked just for you by Larissa 💖 Enjoy!`);
  };
})();