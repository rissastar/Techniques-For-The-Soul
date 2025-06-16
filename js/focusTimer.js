export function focusTimer(gameArea) {
  gameArea.innerHTML = `
    <p class="neon-text" style="color: var(--neon3); font-weight: 900; font-size: 1.5rem;">⏱️ Focus Timer</p>
    <p style="font-weight: 700; margin-bottom: 1rem;">Set a timer to focus on tasks — perfect for ADHD bursts!</p>
    <input type="number" id="timer-input" placeholder="Minutes" min="1" max="60" style="font-size:1.2rem; padding: 0.5rem; width: 120px; border-radius: 10px; border:none; margin-right: 1rem;">
    <button id="start-timer" style="font-weight: 700; padding: 0.5rem 1rem; border-radius: 10px; cursor: pointer;">Start</button>
    <p id="timer-display" style="font-size: 2rem; font-weight: 900; margin-top: 1rem; color: var(--neon1);"></p>
  `;

  const input = gameArea.querySelector("#timer-input");
  const startBtn = gameArea.querySelector("#start-timer");
  const display = gameArea.querySelector("#timer-display");

  let timerId = null;
  let timeLeft = 0;

  startBtn.addEventListener("click", () => {
    if(timerId) clearInterval(timerId);
    const mins = parseInt(input.value);
    if(isNaN(mins) || mins < 1 || mins > 60) {
      alert("Please enter a valid number between 1 and 60.");
      return;
    }
    timeLeft = mins * 60;
    updateDisplay();
    timerId = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if(timeLeft <= 0) {
        clearInterval(timerId);
        display.textContent = "⏰ Time's up! Great focus session, Dante!";
        navigator.vibrate && navigator.vibrate([200,100,200]);
      }
    }, 1000);
  });

  function updateDisplay() {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    display.textContent = `${m}:${s}`;
  }
}