// —— Confetti Helper ——
function confettiBurst() {
  confetti.create(document.getElementById('confettiCanvas'), {
    resize: true, useWorker: true
  })({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
}

// —— Content Arrays ——
const lobsterFacts = [
  "Lobsters can live over 100 years and grow by molting.",
  "Baby lobsters have blue shells before turning brown.",
  "They pee through holes under their eyes to communicate!",
  "They have taste sensors on their feet.",
  "Two claw types: crusher & cutter.",
  "Largest lobster weighed 44+ lbs!",
  "They can regenerate limbs.",
  "They’re closer to spiders than fish.",
  "A lobster’s heart is in its head.",
  "Mating happens belly-to-belly."
];

const fishTypes = [
  "Salmon 🐟","Rainbow Trout 🌈🐠","Bass 🎣","Catfish 🐡",
  "Northern Pike 🐊","Walleye 🎯","Carp 🐟","Snapper 🦈",
  "Mackerel 🐟","Halibut 🐟","Tuna 🐟","Marlin 🎣"
];

const cars = [
  "Tesla Cybertruck ⚡","’67 Mustang 🐎","Nissan GT-R 🏁",
  "Bugatti Chiron 💨","Camaro ZL1 🔥","Dodge Charger 🏎️",
  "Ford F-150 🔧","Jeep Wrangler 🚙","Lamborghini Huracán 🐂",
  "Porsche 911 🏁"
];

const beats = [
  { src: "beat1.mp3", name: "808 Banger" },
  { src: "beat2.mp3", name: "Smooth Flow" },
  { src: "beat3.mp3", name: "Night Ride" },
  { src: "beat4.mp3", name: "Rave Energy" },
  { src: "beat5.mp3", name: "Deep Bass" },
  { src: "beat6.mp3", name: "Trap Vibes" },
  { src: "beat7.mp3", name: "Lo-Fi Rap" },
  { src: "beat8.mp3", name: "Old School Boom" },
  { src: "beat9.mp3", name: "East Coast Flow" },
  { src: "beat10.mp3", name: "West Coast Jam" }
];

const jokes = [
  "Ricky: 'I’m not addicted to crack, I just like the smell.'",
  "Bubbles: 'If I can’t fix it with duct tape, I’m not interested.'",
  "Why did Sassy the Sasquatch cross the road? To escape the cops!",
  "I told my therapist about my fear of commitment—now we’re together!",
  "Parallel lines have so much in common. Too bad they’ll never meet.",
  "Sassy says: 'You can’t catch me, I’m forest lore!'",
  "Why don’t skeletons fight? They don’t have the guts.",
  "I’d explain it to you, but I left my puppets at home.",
  "‘If at first you don’t succeed, skydiving isn’t for you.’",
  "‘I put the ‘pro’ in procrastination.’"
];

const stories = [
  "I drove a lobster boat… lobsters mutinied and tossed me overboard.",
  "Lost my shoes at a rave—ended up DJing barefoot till dawn.",
  "Bubbles zip-taped my hood—now my car sounds like a drumline.",
  "Sassy stole my bait and danced into the woods.",
  "Built a lobster trap that caught seagulls—they formed a rescue squad.",
  "Hosted a rave in a fishing hut. Lobsters vibed.",
  "Fixed a car with bubblegum & paperclips. Still runs!"
];

const compliments = [
  "You’re my lobster 🦞❤️","Legendary vibes only ✨",
  "Engineering genius 🛠️","Best rave buddy 🎉",
  "My heart’s DJ 🎧","Sasquatch whisperer 🌲"
];

// —— Helper ——
function pickAndShow(arr, id, pre = '') {
  document.getElementById(id).textContent = pre + arr[Math.floor(Math.random() * arr.length)];
}

// —— Module Functions ——
function showFact()      { pickAndShow(lobsterFacts, 'fact'); }
function playFishing()   { pickAndShow(fishTypes, 'fishResult', 'You caught a '); }
function chooseCar()     { pickAndShow(cars, 'car', 'Your ride: '); }
function playBeat() {
  const b = beats[Math.floor(Math.random() * beats.length)];
  const a = document.getElementById('beatAudio');
  a.src = b.src; a.play();
}
function tellJoke()      { pickAndShow(jokes, 'joke'); }
function tellStory()     { pickAndShow(stories, 'story'); }

// —— DanteBox ——  
function openBox() {
  const box = document.getElementById('box');
  box.classList.add('shake');
  setTimeout(() => {
    box.classList.remove('shake');
    pickAndShow(compliments, 'compliment');
  }, 500);
}

// —— Lobster Game ——  
let gameInterval, lobsterX, lobsterY, caught = false;
const canvas = document.getElementById('gameCanvas'),
      ctx    = canvas.getContext('2d'),
      img    = new Image();
img.src = 'lobster.png';

canvas.addEventListener('click', e => {
  if (caught) return;
  const r = canvas.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;
  if (x > lobsterX && x < lobsterX + 50 && y > lobsterY && y < lobsterY + 50) {
    caught = true; clearInterval(gameInterval);
    document.getElementById('gameMsg').textContent = 'You caught it! 🦞🎉';
    new Audio('cheer.mp3').play(); confettiBurst();
  }
});

function startGame() {
  caught = false;
  document.getElementById('gameMsg').textContent = '';
  clearInterval(gameInterval);
  gameInterval = setInterval(() => {
    lobsterX = Math.random() * (canvas.width - 50);
    lobsterY = Math.random() * (canvas.height - 50);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, lobsterX, lobsterY, 50, 50);
  }, 800);
}

// —— Preload ——
window.onload = () => { /* images/sounds preload if needed */ };