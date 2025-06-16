// === GENERAL UTILITIES ===
function confettiBurst() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// === 1. LOBSTER FISHING FACTS ===
const lobsterFacts = [
  "Lobsters taste with their legs.",
  "A lobster’s brain is in its throat.",
  "They can live over 100 years!",
  "Mi’kmaq people have fished lobster for thousands of years.",
  "Lobsters pee from their faces. Yep.",
];
function showFact() {
  const fact = lobsterFacts[Math.floor(Math.random() * lobsterFacts.length)];
  document.getElementById("fact").textContent = fact;
}

// === 2. GENERAL FISHING ===
const fishingResults = [
  "You caught a mackerel!",
  "A big ol’ trout took the bait!",
  "You reeled in a soggy boot... again.",
  "A lobster snuck into your trap!",
  "The fish got away, better luck next time!",
];
function playFishing() {
  const result = fishingResults[Math.floor(Math.random() * fishingResults.length)];
  document.getElementById("fishResult").textContent = result;
}

// === 3. DREAM CARS ===
const dreamCars = [
  "A tricked-out lowrider with neon lights.",
  "A classic '69 Charger in matte black.",
  "A Tesla Cybertruck with rave decals.",
  "A Mi’kmaq pride-wrapped Camaro.",
  "A lobster boat with subs in the hull.",
];
function chooseCar() {
  const car = dreamCars[Math.floor(Math.random() * dreamCars.length)];
  document.getElementById("car").textContent = car;
}

// === 4. RAP RAVE BEATS ===
const beats = [
  "beats/beat1.mp3",
  "beats/beat2.mp3",
  "beats/beat3.mp3"
];
function playBeat() {
  const beatAudio = document.getElementById("beatAudio");
  const randomBeat = beats[Math.floor(Math.random() * beats.length)];
  beatAudio.src = randomBeat;
  beatAudio.play();
}

// === 5. DARK & SASSY JOKES ===
const jokes = [
  "Why don’t graveyards ever get overcrowded? People are dying to get in.",
  "I told my therapist about my split personality… now she charges me double.",
  "If life gives you melons, you might be dyslexic.",
  "Dark humor is like clean water in a trailer park… rare and suspicious.",
  "Sassy the Sasquatch said I’m the weird one."
];
function tellJoke() {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  document.getElementById("joke").textContent = joke;
}

// === 6. WILD & FUNNY STORIES ===
const stories = [
  "One time at a powwow, Dante ate 13 tacos and thought he was part llama.",
  "He once duct-taped a GoPro to a lobster to track its rave life.",
  "A seagull stole his weed—true story, bro.",
  "He entered a ‘who can fish blindfolded’ contest... and caught a boot.",
];
function tellStory() {
  const story = stories[Math.floor(Math.random() * stories.length)];
  document.getElementById("story").textContent = story;
}

// === 7. MOVIE RECOMMENDATIONS ===
const movies = [
  "Trailer Park Boys: The Movie",
  "Smoke Signals (1998)",
  "8 Mile",
  "Into the Wild",
  "Rumble: The Indians Who Rocked the World",
];
function recommendMovie() {
  const movie = movies[Math.floor(Math.random() * movies.length)];
  document.getElementById("movie").textContent = movie;
}

// === 8. FOOD CRAVINGS ===
const foodIdeas = [
  "Fried bread tacos 🍖",
  "Poutine with lobster 🧀🦞",
  "Deep-fried Mars bar 🍫🔥",
  "A stoner's charcuterie: Hot Cheetos, pickles & gummy worms",
  "Powwow donuts 🍩",
];
function suggestFood() {
  const food = foodIdeas[Math.floor(Math.random() * foodIdeas.length)];
  document.getElementById("foodOutput").textContent = food;
}

// === 9. MI’KMAQ CULTURE FACTS ===
const cultureFacts = [
  "Mi’kmaq is pronounced 'MIG-maw'.",
  "The Mi’kmaq flag has a cross and crescent, symbolizing balance.",
  "Treaty Day in NS celebrates Mi’kmaq rights, Oct 1st.",
  "Mi’kmaq used birchbark canoes with supernatural designs.",
  "L’nuk means 'The People' in Mi’kmaq.",
];
function showCultureFact() {
  const fact = cultureFacts[Math.floor(Math.random() * cultureFacts.length)];
  document.getElementById("cultureFact").textContent = fact;
}

// === 10. STONER TIPS & TRICKS ===
const tips = [
  "Use a tortilla as an edible rolling tray. Boom. 🌯",
  "Lose your lighter? Stove and spaghetti stick = fire.",
  "Watch cartoons—they hit different.",
  "Baby wipes solve everything. Even bong spills.",
  "Label your stash. Especially if it’s oregano.",
];
function showTip() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById("tip").textContent = tip;
}

// === 11. SECRET DANTEBOX ===
const compliments = [
  "You're the rave king of my heart 💖",
  "Nobody rocks a pair of waders like you 😎",
  "You're my lobster—forever and always 🦞❤️",
  "You make dark jokes sexy. Weird, but true.",
  "I love your brain… and your butt 😘"
];
function openBox() {
  const compliment = compliments[Math.floor(Math.random() * compliments.length)];
  document.getElementById("compliment").textContent = compliment;
  const box = document.getElementById("box");
  box.classList.add("opened");
  setTimeout(() => box.classList.remove("opened"), 2000);
}

// === 12. LOBSTER MINI-GAME ===
let gameScore = 0;
let highScore = 0;
let gameInterval;

function startGame() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const gameMsg = document.getElementById("gameMsg");
  const highScoreEl = document.getElementById("highScore");
  const lobster = new Image();
  lobster.src = "lobster.png"; // Add a lobster image in your folder
  const trap = { x: 150, y: 180, width: 30, height: 10 };
  let lobsterX = Math.random() * 270;
  let lobsterY = 0;

  gameScore = 0;

  function draw() {
    ctx.clearRect(0, 0, 300, 200);
    ctx.fillStyle = "#00ffff";
    ctx.fillRect(trap.x, trap.y, trap.width, trap.height);
    ctx.drawImage(lobster, lobsterX, lobsterY, 30, 30);

    lobsterY += 4;
    if (lobsterY > 170 && lobsterX > trap.x - 20 && lobsterX < trap.x + 20) {
      gameScore++;
      lobsterX = Math.random() * 270;
      lobsterY = 0;
    } else if (lobsterY > 200) {
      clearInterval(gameInterval);
      gameMsg.textContent = `Game over! You caught ${gameScore} lobsters.`;
      if (gameScore > highScore) {
        highScore = gameScore;
        highScoreEl.textContent = highScore;
      }
    }
  }

  gameInterval = setInterval(draw, 60);
}

// === 13. DANTEBOT CHAT ===
function chatSend() {
  const input = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");
  const msg = input.value.trim();
  if (!msg) return;
  const reply = danteBotReply(msg);

  chatWindow.innerHTML += `<div class="chat-msg user">You: ${msg}</div>`;
  chatWindow.innerHTML += `<div class="chat-msg bot">DanteBot: ${reply}</div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
  input.value = "";
}

function danteBotReply(input) {
  input = input.toLowerCase();
  if (input.includes("hi") || input.includes("yo")) return "Yo yo yo, what’s poppin’?";
  if (input.includes("love")) return "I love you too, rave queen 💜";
  if (input.includes("lobster")) return "Lobsters are basically rave crustaceans.";
  if (input.includes("high")) return "On life or on weed? Either way, vibes up!";
  return "DanteBot is vibing... Ask me anything!";
}

// === THEME TOGGLE ===
document.getElementById("themeToggle").addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "neon" ? "light" : "neon";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});