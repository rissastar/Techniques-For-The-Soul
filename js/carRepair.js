export function carRepairPuzzle(gameArea) {
  gameArea.innerHTML = `
    <p class="neon-text" style="color: var(--neon2); font-weight: 900; font-size: 1.5rem;">🔧 Car Repair Puzzle</p>
    <p style="font-weight: 700; margin-bottom: 1rem;">Click the right tools to fix the car!</p>
    <div id="tools" style="display:flex; gap:1rem; flex-wrap: wrap;">
      <button data-tool="wrench" style="padding: 0.5rem 1rem;">Wrench</button>
      <button data-tool="screwdriver" style="padding: 0.5rem 1rem;">Screwdriver</button>
      <button data-tool="hammer" style="padding: 0.5rem 1rem;">Hammer</button>
      <button data-tool="oil" style="padding: 0.5rem 1rem;">Oil</button>
    </div>
    <p id="status" style="margin-top: 1rem; font-weight: 700;"></p>
  `;

  const toolsDiv = gameArea.querySelector("#tools");
  const status = gameArea.querySelector("#status");
  const correctTools = ["wrench", "oil"];
  let clickedTools = [];

  toolsDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const tool = e.target.getAttribute("data-tool");
      if (!clickedTools.includes(tool)) {
        clickedTools.push(tool);
        e.target.disabled = true;
        e.target.style.opacity = "0.5";
        status.textContent = `Used ${tool}!`;
      }
      if (correctTools.every(t => clickedTools.includes(t))) {
        status.textContent = "Car fixed! Good job, Dante! 🚗✨";
      }
    }
  });
}