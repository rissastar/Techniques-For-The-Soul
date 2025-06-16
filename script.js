// Dante's Dopamine Dive — Content and interaction logic

const data = {
  lobster: [
    "Did you know? Lobsters taste with their legs and chew with their stomachs!",
    "Lobsters can live up to 50 years in the wild.",
    "Lobster shells are blue before cooking, turning bright red after boiling.",
    "Dante, here’s a crazy fact: Lobsters pee out of their faces to communicate!",
    "In Nova Scotia, lobster fishing season is a huge festival of its own."
  ],
  cars: [
    "Fun Fact: The first car to break 100 mph was the 1905 Peerless Green Dragon.",
    "Did you know? Dante, your love for fixing cars is legendary!",
    "Electric cars can accelerate faster than many gas-powered sports cars.",
    "Pro tip: Regular oil changes help your car run smoother and longer.",
    "That roar of a classic V8 engine? Pure adrenaline."
  ],
  rap: [
    "Rap legend fact: The first rap song to hit #1 on Billboard was 'Rapture' by Blondie.",
    "Dante, your rap playlists fire up the party every time.",
    "Did you know? Rap started in the Bronx in the 1970s as a voice for the streets.",
    "Eminem once said: 'Success is my only option, failure's not.'",
    "Rap battles are modern-day poetry slams with rhythm and swagger."
  ],
  raves: [
    "Raves started in the 1980s UK underground scene and exploded worldwide.",
    "Dante, the neon lights and beats you love create magical escapes.",
    "PLUR — Peace, Love, Unity, Respect — is the rave culture mantra.",
    "Did you know? Glow sticks were invented for safety in raves but became iconic props.",
    "Festivals bring thousands together for music, dancing, and unforgettable memories."
  ],
  darkJokes: [
    "Why don't graveyards ever get overcrowded? Because people are dying to get in.",
    "I told my therapist about my addiction. She said, 'Don't worry, we'll tackle it one joke at a time.'",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "Dark humor? More like lightening up the shadows.",
    "Dante, you’d appreciate this: 'I have a stepladder because my real ladder left.'"
  ],
  stories: [
    "Once, a mechanic fixed a car with duct tape and sheer willpower — just like you, Dante!",
    "There was a dog named Zeus who once stole a whole pizza. Sound familiar?",
    "At the fair, a guy tried to win a teddy bear by juggling lobsters — chaos ensued.",
    "A stoner engineer once built a rocket... out of spare parts and good vibes.",
    "Dante, remember that time you made everyone laugh with your dark jokes at the festival?"
  ],
  engineering: [
    "Engineers turn ideas into reality — just like you turning wrenches into magic.",
    "Did you know? The first programmable computer was designed in 1936.",
    "Fixing things is an art form — you are the Da Vinci of repair!",
    "A well-oiled machine runs smoother — both in cars and in life.",
    "Dante’s engineering tip: Sometimes the simplest solution is the best one."
  ],
  native: [
    "The Mi’kmaq people have inhabited Atlantic Canada for over 10,000 years.",
    "Nature is the greatest teacher — wisdom flows from the land and water.",
    "Dante, your native roots are a powerful source of strength and spirit.",
    "Storytelling is the heart of culture, passing lessons through generations.",
    "Respect for all living things keeps balance in the world."
  ],
  stoner: [
    "Did you know? Cannabis was used medicinally for thousands of years worldwide.",
    "Dante’s chill fact: Music sounds even better when you’re vibing high.",
    "A good snack can make or break the stoner experience — choose wisely!",
    "Laughing at dark jokes is the best medicine.",
    "Remember, even in haze, your engineering mind is sharp and creative."
  ],
  zeus: [
    "Zeus is one lucky dog to have you, Dante!",
    "Dogs can read human emotions — no wonder Zeus knows you so well.",
    "Did you know? Dogs have about 1,700 taste buds, humans have 9,000.",
    "Zeus probably thinks lobster is a fancy treat — maybe he’s right!",
    "Every day with Zeus is an adventure filled with love and wagging tails."
  ]
};

const categories = Object.keys(data);
const buttons = document.querySelectorAll("button[data-category]");
const contentEl = document.getElementById("content");

// Utility: get random item from array
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showContent(category) {
  if (!data[category]) return;

  const text = getRandom(data[category]);
  contentEl.innerHTML = `<p>${text}</p>`;
  contentEl.focus();
}

// Event listeners for buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.getAttribute("data-category");
    showContent(cat);
  });
});

// Keyboard shortcuts 1-0 for categories
document.addEventListener("keydown", (e) => {
  // Map number keys 1-9 and 0 to categories 0-9 index
  const key = e.key;
  if (key >= "1" && key <= "9") {
    const idx = parseInt(key, 10) - 1;
    if (categories[idx]) {
      showContent(categories[idx]);
    }
  } else if (key === "0") {
    // 0 = index 9
    if (categories[9]) {
      showContent(categories[9]);
    }
  }
});
  window.showFunnyFacts = () => {
    const facts = [
      "Octopuses have three hearts!",
      "Bananas are berries, but strawberries aren't.",
      "Lobsters pee out of their faces to communicate!",
      "You can hear a blue whale’s heartbeat from 2 miles away."
    ];
    showPopup(`
      <h2>🧠 Funny Facts</h2>
      <button id="fact-btn" class="glow-btn">Show Me</button>
      <p id="fact-text"></p>
    `);
    const factText = document.getElementById("fact-text");
    document.getElementById("fact-btn").addEventListener("click", () => {
      factText.textContent = facts[Math.floor(Math.random() * facts.length)];
    });
  };

  window.showSnackIdeas = () => {
    const snacks = [
      "🍫 Chocolate-dipped bacon",
      "🍟 Fries with gravy and hot sauce",
      "🍓 Frozen grapes with lemon juice",
      "🧀 Cheese quesadilla + ranch dip"
    ];
    showPopup(`
      <h2>🍿 Snack Ideas</h2>
      <button id="snack-btn" class="glow-btn">I’m Hungry</button>
      <p id="snack-text"></p>
    `);
    const snackText = document.getElementById("snack-text");
    document.getElementById("snack-btn").addEventListener("click", () => {
      snackText.textContent = snacks[Math.floor(Math.random() * snacks.length)];
    });
  };

  window.showDanteBot = () => {
    showPopup(`
      <h2>🤖 DanteBot</h2>
      <input id="dantebot-input" type="text" placeholder="Ask me anything..." />
      <button id="dantebot-btn" class="glow-btn">Ask</button>
      <p id="dantebot-response"></p>
    `);
    const input = document.getElementById("dantebot-input");
    const response = document.getElementById("dantebot-response");
    document.getElementById("dantebot-btn").addEventListener("click", () => {
      const q = input.value.toLowerCase();
      let a = "Hmm... I'm thinking about that.";
      if (q.includes("car")) a = "Sounds like you need more horsepower, bro.";
      else if (q.includes("lobster")) a = "🦞 They’re plotting underwater, I swear.";
      else if (q.includes("love")) a = "Larissa loves you like crazy, you goof.";
      else if (q.includes("joke")) a = "Why did the lobster blush? It saw the ocean’s bottom!";
      response.textContent = a;
    });
  };

  window.showZeusCorner = () => {
    const zeusStuff = [
      "🐾 Zeus says: I only chew expensive shoes.",
      "🐶 If it fits, I sits. Even if it’s your face.",
      "🐾 Zeus Fact: Dogs can smell your feelings. And snacks.",
      "🐶 Zeus Joke: Why did the dog sit in the shade? Because he didn’t want to be a hot dog!"
    ];
    showPopup(`
      <h2>🐶 Zeus’s Corner</h2>
      <button id="zeus-btn" class="glow-btn">Woof!</button>
      <p id="zeus-text"></p>
    `);
    const zeusText = document.getElementById("zeus-text");
    document.getElementById("zeus-btn").addEventListener("click", () => {
      zeusText.textContent = zeusStuff[Math.floor(Math.random() * zeusStuff.length)];
    });
  };