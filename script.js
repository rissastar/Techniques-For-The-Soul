// Expanded content for Dante

// Lobster facts
const lobsterFacts = [
  "Lobsters can live over 100 years and grow by molting their shells.",
  "Baby lobsters have blue shells before turning their adult brownish color.",
  "Lobsters pee through holes under their eyes to communicate!",
  "Lobsters have taste sensors on their feet.",
  "Lobsters’ claws are specialized: one for crushing, one for cutting.",
  "The world’s largest lobster was over 44 pounds!",
  "Lobsters can regenerate lost limbs over time."
];

// General fishing
const fishTypes = [
  "Salmon 🐟",
  "Rainbow Trout 🌈🐠",
  "Bass 🎣",
  "Catfish 🐡",
  "Northern Pike 🐊",
  "Walleye 🎯",
  "Carp 🐟"
];

// Dream cars
const cars = [
  "Tesla Cybertruck ⚡",
  "1967 Mustang 🐎",
  "Nissan GT-R 🏁",
  "Bugatti Chiron 💨",
  "Chevy Camaro 🔥",
  "Dodge Charger 🏎️",
  "Ford F-150 🔧",
  "Jeep Wrangler 🚙"
];

// Rap beats (using placeholder mp3 links from freesound or similar — replace with real files)
const beats = [
  { src: "https://cdn.pixabay.com/download/audio/2022/03/18/audio_f7c86db6a8.mp3?filename=hip-hop-loop-4-11310.mp3", name: "808 Banger" },
  { src: "https://cdn.pixabay.com/download/audio/2021/11/16/audio_f4e8d541bb.mp3?filename=hip-hop-beat-11154.mp3", name: "Smooth Flow" },
  { src: "https://cdn.pixabay.com/download/audio/2021/12/10/audio_4a3f703495.mp3?filename=hip-hop-beat-11275.mp3", name: "Night Ride" },
  { src: "https://cdn.pixabay.com/download/audio/2022/02/25/audio_b1a5078bf6.mp3?filename=hip-hop-rap-beat-11532.mp3", name: "Rave Energy" }
];

// Dark & sassy jokes (including Trailer Park Boys style, Sassy the Sasquatch, dark humor)
const jokes = [
  "Ricky: 'I’m not addicted to crack, I just like the way it smells.'",
  "Bubbles once said: 'If I can’t fix it with duct tape, I’m not interested.'",
  "Why did Sassy the Sasquatch cross the road? To escape the cops!",
  "I told my therapist about my fear of commitment – we’re now together until further notice.",
  "Parallel lines have so much in common. It’s a shame they’ll never meet.",
  "Life’s too short to be serious all the time, so if you can’t laugh at yourself, call me!",
  "Sassy says: 'You can’t catch me, I’m the legend of the forest!'",
  "Why don’t skeletons fight each other? They don’t have the guts."
];

// Wild & funny stories (mix of rave, fishing, Sasquatch, and Trailer Park Boys inspired)
const stories = [
  "That time I tried to drive a lobster boat… and the lobsters threw me overboard.",
  "The rave where I accidentally hopped the fence and ended up DJing all night.",
  "Bubbles tried to fix my car with zip ties and duct tape — now it sounds like a rave!",
  "Once, Sassy the Sasquatch stole my fishing bait and vanished into the woods laughing.",
  "At the festival, I lost my shoes but found a legendary party under the neon moon.",
  "The fair’s bumper cars were my getaway vehicle after a fishy fishing story went sideways.",
  "Trailer Park Boys taught me that ‘work smarter, not harder’ means nap until inspiration strikes.",
  "My engineering brain once built a lobster trap that caught more seagulls than lobsters."
];

// Functions

function showFact() {
  const fact = lobsterFacts[Math.floor(Math.random() * lobsterFacts.length)];
  document.getElementById('fact').textContent = fact;
}

function playFishing() {
  const fish = fishTypes[Math.floor(Math.random() * fishTypes.length)];
  document.getElementById('fishResult').textContent = `You caught a ${fish}!`;
}

function chooseCar() {
  const car = cars[Math.floor(Math.random() * cars.length)];
  document.getElementById('car').textContent = `Your ride: ${car}`;
}

function playBeat() {
  const beat = beats[Math.floor(Math.random() * beats.length)];
  const audio = document.getElementById('beatAudio');
  audio.src = beat.src;
  audio.play();
}

function tellJoke() {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  document.getElementById('joke').textContent = joke;
}

function tellStory() {
  const story = stories[Math.floor(Math.random() * stories.length)];
  document.getElementById('story').textContent = story;
}