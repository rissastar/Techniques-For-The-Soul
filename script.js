(() => {
  "use strict";

  // Elements
  const navButtons = document.querySelectorAll("nav button[data-popup]");
  const popups = {
    minigames: document.getElementById("popup-minigames"),
    dailychallenge: document.getElementById("popup-dailychallenge"),
    zeuscorner: document.getElementById("popup-zeuscorner"),
    dantebot: document.getElementById("popup-dantebot"),
    settings: document.getElementById("popup-settings"),
  };
  const closeButtons = document.querySelectorAll(".close-btn");

  // Settings elements
  const fontSizeRange = document.getElementById("font-size-range");
  const fontSizeDisplay = document.getElementById("font-size-display");
  const colorThemeSelect = document.getElementById("color-theme-select");
  const toggleSound = document.getElementById("toggle-sound");
  const simpleModeToggle = document.getElementById("simple-mode-toggle");

  // DanteBot chat elements
  const chatLog = document.getElementById("chat-log");
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");

  // Game container for minigames
  const gameContainer = document.getElementById("game-container");

  // Helper: Sound effect
  const beepSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
  beepSound.volume = 0.25;

  // Utility to show popup
  function showPopup(name) {
    for (const key in popups) {
      if (popups[key]) {
        popups[key].hidden = true;
      }
    }
    if (popups[name]) {
      popups[name].hidden = false;
      popups[name].querySelector(".popup-content").focus();
    }
  }

  // Utility to hide all popups
  function hideAllPopups() {
    for (const key in popups) {
      if (popups[key]) {
        popups[key].hidden = true;
      }
    }
    clearGameContainer();
  }

  // Event: open popup when nav button clicked
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const popupName = btn.getAttribute("data-popup");
      showPopup(popupName);

      // Load content for popups if needed
      if (popupName === "dailychallenge") {
        loadDailyChallenge();
      } else if (popupName === "zeuscorner") {
        loadZeusCorner();
      }
    });
  });

  // Event: close popup when close button clicked
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", hideAllPopups);
  });

  // Close popup if user clicks outside popup content
  Object.values(popups).forEach((popup) => {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        hideAllPopups();
      }
    });
  });

  // Settings functionality
  // Load settings from localStorage or set defaults
  function loadSettings() {
    const fs = localStorage.getItem("danteFontSize");
    const theme = localStorage.getItem("danteColorTheme");
    const sound = localStorage.getItem("danteSoundEnabled");
    const simpleMode = localStorage.getItem("danteSimpleMode");

    if (fs) {
      document.documentElement.style.setProperty("--font-base-size", fs + "px");
      fontSizeRange.value = fs;
      fontSizeDisplay.textContent = fs;
    }
    if (theme) {
      colorThemeSelect.value = theme;
      applyTheme(theme);
    }
    if (sound !== null) {
      toggleSound.checked = sound === "true";
    }
    if (simpleMode !== null) {
      simpleModeToggle.checked = simpleMode === "true";
      toggleSimpleMode(simpleModeToggle.checked);
    }
  }

  function saveSettings() {
    localStorage.setItem("danteFontSize", fontSizeRange.value);
    localStorage.setItem("danteColorTheme", colorThemeSelect.value);
    localStorage.setItem("danteSoundEnabled", toggleSound.checked);
    localStorage.setItem("danteSimpleMode", simpleModeToggle.checked);
  }

  fontSizeRange.addEventListener("input", () => {
    const val = fontSizeRange.value;
    fontSizeDisplay.textContent = val;
    document.documentElement.style.setProperty("--font-base-size", val + "px");
    saveSettings();
  });

  colorThemeSelect.addEventListener("change", () => {
    applyTheme(colorThemeSelect.value);
    saveSettings();
  });

  toggleSound.addEventListener("change", saveSettings);
  simpleModeToggle.addEventListener("change", () => {
    toggleSimpleMode(simpleModeToggle.checked);
    saveSettings();
  });

  // Apply color theme
  function applyTheme(theme) {
    const root = document.documentElement;
    switch (theme) {
      case "sunset":
        root.style.setProperty("--neon-bg", "#381819");
        root.style.setProperty("--neon-pink", "#ff6f91");
        root.style.setProperty("--neon-blue", "#f7b32b");
        root.style.setProperty("--neon-orange", "#ff9671");
        root.style.setProperty("--neon-green", "#6bcf91");
        root.style.setProperty("--neon-white", "#f5f5f5");
        root.style.setProperty("--popup-bg", "rgba(56, 24, 25, 0.95)");
        break;
      case "darkrave":
        root.style.setProperty("--neon-bg", "#0b0c17");
        root.style.setProperty("--neon-pink", "#f700ff");
        root.style.setProperty("--neon-blue", "#00ffee");
        root.style.setProperty("--neon-orange", "#ff8c00");
        root.style.setProperty("--neon-green", "#00ff88");
        root.style.setProperty("--neon-white", "#cccccc");
        root.style.setProperty("--popup-bg", "rgba(11, 12, 23, 0.95)");
        break;
      case "daylight":
        root.style.setProperty("--neon-bg", "#f9f9f9");
        root.style.setProperty("--neon-pink", "#ff5c8d");
        root.style.setProperty("--neon-blue", "#5ca8ff");
        root.style.setProperty("--neon-orange", "#ffb347");
        root.style.setProperty("--neon-green", "#2ecc71");
        root.style.setProperty("--neon-white", "#333333");
        root.style.setProperty("--popup-bg", "rgba(255, 255, 255, 0.97)");
        break;
      default: // neon default
        root.style.setProperty("--neon-bg", "#0d0f1a");
        root.style.setProperty("--neon-pink", "#ff29f7");
        root.style.setProperty("--neon-blue", "#29d6ff");
        root.style.setProperty("--neon-orange", "#ffb347");
        root.style.setProperty("--neon-green", "#29ff73");
        root.style.setProperty("--neon-white", "#e0e0e0");
        root.style.setProperty("--popup-bg", "rgba(10, 10, 30, 0.95)");
    }
  }

  // Toggle simple mode for less visuals
  function toggleSimpleMode(enabled) {
    if (enabled) {
      document.body.style.filter = "grayscale(0.6)";
    } else {
      document.body.style.filter = "none";
    }
  }

  // Initial load of settings
  loadSettings();

  // Mini Games
  const miniGames = {
    "reaction-game-btn": reactionGame,
    "trivia-game-btn": triviaGame,
    "wordpuzzle-game-btn": wordPuzzleGame,
    "fixcode-game-btn": fixCodeGame,
  };

  // Clear game container content
  function clearGameContainer() {
    gameContainer.innerHTML = "";
  }

  // Reaction game implementation
  function reactionGame() {
    clearGameContainer();
    const container = document.createElement("div");
    container.style.textAlign = "center";

    const instruction = document.createElement("p");
    instruction.textContent = "Wait for the box to turn green, then click as fast as you can!";
    instruction.style.marginBottom = "15px";

    const box = document.createElement("div");
    box.style.width = "120px";
    box.style.height = "120px";
    box.style.margin = "0 auto 20px";
    box.style.backgroundColor = "red";
    box.style.borderRadius = "20px";
    box.style.cursor = "pointer";
    box.style.boxShadow = "0 0 10px red";
    container.appendChild(instruction);
    container.appendChild(box);

    const result = document.createElement("p");
    container.appendChild(result);

    let timeoutId;
    let startTime;
    let waiting = true;

    function start() {
      box.style.backgroundColor = "red";
      box.style.boxShadow = "0 0 10px red";
      result.textContent = "Get ready...";
      waiting = true;
      timeoutId = setTimeout(() => {
        box.style.backgroundColor = "limegreen";
        box.style.boxShadow = "0 0 20px limegreen";
        startTime = Date.now();
        waiting = false;
        result.textContent = "CLICK!";
        if (toggleSound.checked) beepSound.play();
      }, 1500 + Math.random() * 2000);
    }

    box.addEventListener("click", () => {
      if (waiting) {
        // Clicked too soon
        clearTimeout(timeoutId);
        result.textContent = "Too soon! Wait for green.";
        if (toggleSound.checked) beepSound.play();
        start();
      } else {
        const reactionTime = Date.now() - startTime;
        result.textContent = `Your reaction time: ${reactionTime} ms! 🎉 Click box to try again.`;
        start();
      }
    });

    start();
    gameContainer.appendChild(container);
  }

  // Trivia game implementation
  function triviaGame() {
    clearGameContainer();

    const questions = [
      {
        q: "What is the capital of Canada?",
        choices: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
        answer: 1,
      },
      {
        q: "Who is the inventor of the light bulb?",
        choices: ["Nikola Tesla", "Thomas Edison", "Albert Einstein", "Alexander Graham Bell"],
        answer: 1,
      },
      {
        q: "What year did humans first land on the moon?",
        choices: ["1969", "1972", "1965", "1959"],
        answer: 0,
      },
      {
        q: "Which element has the chemical symbol 'O'?",
        choices: ["Gold", "Oxygen", "Osmium", "Silver"],
        answer: 1,
      },
      {
        q: "What is the largest ocean on Earth?",
        choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
        answer: 2,
      },
    ];

    let currentIndex = 0;
    let score = 0;

    const container = document.createElement("div");
    container.style.textAlign = "left";

    const questionEl = document.createElement("h4");
    const choicesEl = document.createElement("div");
    const resultEl = document.createElement("p");
    resultEl.style.fontWeight = "700";
    resultEl.style.marginTop = "1rem";

    container.appendChild(questionEl);
    container.appendChild(choicesEl);
    container.appendChild(resultEl);
    gameContainer.appendChild(container);

    function loadQuestion() {
      const currentQ = questions[currentIndex];
      questionEl.textContent = `Q${currentIndex + 1}: ${currentQ.q}`;
      choicesEl.innerHTML = "";

      currentQ.choices.forEach((choice, idx) => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.className = "game-btn";
        btn.style.display = "block";
        btn.style.margin = "5px 0";
        btn.addEventListener("click", () => {
          if (idx === currentQ.answer) {
            score++;
            resultEl.textContent = "Correct! 🎉";
            if (toggleSound.checked) beepSound.play();
          } else {
            resultEl.textContent = `Wrong! The correct answer was "${currentQ.choices[currentQ.answer]}".`;
          }
          currentIndex++;
          if (currentIndex < questions.length) {
            setTimeout(() => {
              resultEl.textContent = "";
              loadQuestion();
            }, 1200);
          } else {
            setTimeout(() => {
              questionEl.textContent = `Game Over! Your score: ${score} / ${questions.length}`;
              choicesEl.innerHTML = "";
              resultEl.textContent = "Play again by selecting a game!";
            }, 1200);
          }
        });
        choicesEl.appendChild(btn);
      });
    }

    loadQuestion();
  }

  // Word Puzzle game implementation
  function wordPuzzleGame() {
    clearGameContainer();

    const words = ["dante", "zeus", "fun", "rave", "lobster", "engineer", "festival", "music", "rap", "dark"];

    let currentWord = "";
    let scrambledWord = "";

    const container = document.createElement("div");
    container.style.textAlign = "center";

    const instruction = document.createElement("p");
    instruction.textContent = "Unscramble the word! Type your guess and submit.";
    instruction.style.marginBottom = "15px";

    const scrambledEl = document.createElement("h3");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Your guess";
    input.autocomplete = "off";
    input.style.fontSize = "1.2rem";
    input.style.padding = "0.4rem 0.8rem";
    input.style.borderRadius = "10px";
    input.style.border = "2px solid var(--neon-blue)";
    input.style.marginBottom = "12px";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Guess";
    submitBtn.className = "game-btn";

    const feedback = document.createElement("p");
    feedback.style.fontWeight = "700";
    feedback.style.minHeight = "24px";

    container.appendChild(instruction);
    container.appendChild(scrambledEl);
    container.appendChild(input);
    container.appendChild(submitBtn);
    container.appendChild(feedback);
    gameContainer.appendChild(container);

    function scramble(word) {
      return word.split("").sort(() => Math.random() - 0.5).join("");
    }

    function newWord() {
      currentWord = words[Math.floor(Math.random() * words.length)];
      scrambledWord = scramble(currentWord);
      while (scrambledWord === currentWord) {
        scrambledWord = scramble(currentWord);
      }
      scrambledEl.textContent = scrambledWord.toUpperCase();
      feedback.textContent = "";
      input.value = "";
      input.focus();
    }

    submitBtn.addEventListener("click", () => {
      const guess = input.value.trim().toLowerCase();
      if (!guess) return;
      if (guess === currentWord) {
        feedback.textContent = "Correct! 🎉 New word coming...";
        if (toggleSound.checked) beepSound.play();
        setTimeout(newWord, 1500);
      } else {
        feedback.textContent = "Nope, try again.";
        if (toggleSound.checked) beepSound.play();
      }
      input.value = "";
      input.focus();
    });

    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter") submitBtn.click();
    });

    newWord();
  }

  // Fix the Code game implementation (simple code puzzle)
  function fixCodeGame() {
    clearGameContainer();

    const codeSnippet = `
function greet() {
  console.log("Hello, Dante!");
}

greet();
    `.trim();

    const brokenCodeSnippet = `
function greet()
  console.log("Hello, Dante!");
}

greet();
    `.trim();

    const container = document.createElement("div");
    container.style.textAlign = "left";

    const instruction = document.createElement("p");
    instruction.textContent = "Fix the broken code snippet below! Add missing symbols to make it run correctly.";
    instruction.style.marginBottom = "10px";

    const brokenCodePre = document.createElement("pre");
    brokenCodePre.style.background = "#11122b";
    brokenCodePre.style.color = "var(--neon-pink)";
    brokenCodePre.style.padding = "10px";
    brokenCodePre.style.borderRadius = "12px";
    brokenCodePre.style.fontFamily = "Courier New, monospace";
    brokenCodePre.textContent = brokenCodeSnippet;

    const inputArea = document.createElement("textarea");
    inputArea.rows = 6;
    inputArea.style.width = "100%";
    inputArea.style.marginTop = "10px";
    inputArea.style.fontFamily = "Courier New, monospace";
    inputArea.style.fontSize = "1rem";
    inputArea.style.borderRadius = "10px";
    inputArea.placeholder = "Type your fixed code here...";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Check Code";
    submitBtn.className = "game-btn";
    submitBtn.style.marginTop = "12px";

    const feedback = document.createElement("p");
    feedback.style.fontWeight = "700";
    feedback.style.minHeight = "24px";

    container.appendChild(instruction);
    container.appendChild(brokenCodePre);
    container.appendChild(inputArea);
    container.appendChild(submitBtn);
    container.appendChild(feedback);
    gameContainer.appendChild(container);

    submitBtn.addEventListener("click", () => {
      const userCode = inputArea.value.trim();

      // Simple check ignoring whitespace and case
      if (userCode.replace(/\s/g, "") === codeSnippet.replace(/\s/g, "")) {
        feedback.textContent = "Nice! Code looks good. ✅";
        if (toggleSound.checked) beepSound.play();
      } else {
        feedback.textContent = "Hmm, that doesn’t match the expected code. Try again!";
        if (toggleSound.checked) beepSound.play();
      }
    });
  }

  // Load Daily Challenge content
  function loadDailyChallenge() {
    const container = document.getElementById("dailychallenge-content");
    const challenges = [
      "Take a 10-minute walk outside and soak in the sun ☀️",
      "Write down 3 things you're grateful for today 🙏",
      "Listen to your favorite rap song and vibe out 🎧",
      "Try to make a new joke and share it with someone 😂",
      "Build a small Lego or model kit piece for 15 minutes 🛠️",
      "Call or text a close friend just to say 'Hey!' 📱",
      "Spend 5 minutes meditating or doing deep breathing 🧘‍♂️",
      "Make a colorful drawing or doodle, no skill required 🎨",
      "Plan a fun weekend activity or festival to attend 🎉",
      "Tell Zeus a new trick or give extra cuddles 🐶",
    ];
    const today = new Date().getDate();
    const challenge = challenges[today % challenges.length];
    container.textContent = challenge;
  }

  // Load Zeus’s Corner content
  function loadZeusCorner() {
    const container = document.getElementById("zeus-content");
    const zeusQuotes = [
      "🐾 Zeus says: Never underestimate the power of a good nap.",
      "🐾 Zeus says: Treats > Troubles.",
      "🐾 Zeus says: Life’s better with a tail wag and a wet nose.",
      "🐾 Zeus says: If you feel down, just chase your tail for a bit!",
      "🐾 Zeus says: Always protect your humans (especially Dante!).",
      "🐾 Zeus says: Rave harder, fetch longer.",
      "🐾 Zeus says: Don’t forget to stretch those paws.",
      "🐾 Zeus says: Bark once for yes, twice for heck yes!",
      "🐾 Zeus says: Dark jokes make the best laughs (just like humans).",
    ];
    const quote = zeusQuotes[Math.floor(Math.random() * zeusQuotes.length)];
    container.textContent = quote;
  }

  // Initialization
  document.addEventListener("DOMContentLoaded", () => {
    // Attach game buttons
    Object.entries(miniGames).forEach(([btnId, gameFn]) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener("click", () => {
          hideAllPopups();
          gameFn();
        });
      }
    });

    // Show initial popup or welcome message
    // For example, open daily challenge by default
    showPopup("dailychallenge");
    loadDailyChallenge();
  });
})();
</script>

</body>
</html>