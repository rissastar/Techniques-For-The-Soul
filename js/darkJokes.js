const darkJokes = [
  "Why don’t skeletons fight each other? They don’t have the guts.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why don’t graveyards ever get overcrowded? People are dying to get in.",
  "I have a stepladder because my real ladder left when I was a kid.",
  "I’d tell you a chemistry joke but I know I wouldn’t get a reaction."
];

export function darkJokeGenerator(gameArea) {
  gameArea.innerHTML = `
    <p class="neon-text" style="color: var(--neon3); font-weight: 900; font-size: 1.5rem;">😈 Dark Joke Generator</p>
    <button id="new-joke" style="margin: 1rem 0; padding: 0.7rem 1.5rem; font-weight: 700; border-radius: 10px; cursor: pointer;">Get a Joke</button>
    <p id="joke-text" style="font-size: 1.2rem; font-weight: 600; min-height: 3rem;"></p>
  `;

  const btn = gameArea.querySelector("#new-joke");
  const jokeText = gameArea.querySelector("#joke-text");

  btn.addEventListener("click", () => {
    const joke = darkJokes[Math.floor(Math.random() * darkJokes.length)];
    jokeText.textContent = joke;
  });
}