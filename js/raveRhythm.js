export function raveRhythmTapper(gameArea) {
  let tapCount = 0;
  gameArea.innerHTML = `
    <p class="neon-text" style="color: var(--neon1); font-weight: 900; font-size: 1.5rem;">🎵 Rave Rhythm Tapper</p>
    <p style="font-weight: 700; margin-bottom: 1rem;">Tap the button as fast as you can!</p>
    <button id="tap-btn" style="font-size:2rem; padding:1rem 2rem; border-radius: 12px; cursor: pointer;">Tap me!</button>
    <p id="tap-count" style="font-weight: 900; margin-top: 1rem;">Taps: 0</p>
  `;

  const tapBtn = gameArea.querySelector("#tap-btn");
  const tapCountDisplay = gameArea.querySelector("#tap-count");

  tapBtn.addEventListener("click", () => {
    tapCount++;
    tapCountDisplay.textContent = `Taps: ${tapCount}`;
  });
}