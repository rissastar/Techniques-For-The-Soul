export function lobsterTrapMaze(gameArea) {
  gameArea.innerHTML = `
    <p class="neon-text" style="color: var(--neon2); font-weight: 900; font-size: 1.5rem;">🦞 Lobster Trap Maze</p>
    <p style="font-weight: 700; margin-bottom: 1rem;">Use arrow keys to navigate the trap and reach the lobster!</p>
    <canvas id="mazeCanvas" width="300" height="300" style="background:#111; border: 2px solid var(--neon1); border-radius: 15px;"></canvas>
    <p id="maze-status" style="margin-top: 1rem; font-weight: 700;"></p>
  `;

  const canvas = gameArea.querySelector("#mazeCanvas");
  const ctx = canvas.getContext("2d");
  const status = gameArea.querySelector("#maze-status");

  const gridSize = 6;
  const cellSize = 50;

  const walls = [
    [1,1],[1,2],[1,3],
    [2,3],[3,3],[4,3],
    [4,1],[4,2],
    [2,5],[3,5],[4,5],
  ];

  let playerPos = {x: 0, y: 0};
  const goalPos = {x: 5, y: 5};

  function drawGrid() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let y=0; y<gridSize; y++){
      for(let x=0; x<gridSize; x++){
        if(walls.some(w => w[0] === x && w[1] === y)){
          ctx.fillStyle = "var(--neon3)";
          ctx.fillRect(x*cellSize,y*cellSize,cellSize,cellSize);
        } else {
          ctx.strokeStyle = "var(--neon2)";
          ctx.strokeRect(x*cellSize,y*cellSize,cellSize,cellSize);
        }
      }
    }
    // Draw goal lobster
    ctx.fillStyle = "var(--neon1)";
    ctx.font = "40px Arial";
    ctx.fillText("🦞", goalPos.x * cellSize + 10, goalPos.y * cellSize + 40);

    // Draw player
    ctx.fillStyle = "var(--neon2)";
    ctx.font = "40px Arial";
    ctx.fillText("🐕", playerPos.x * cellSize + 10, playerPos.y * cellSize + 40);
  }

  function movePlayer(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    if(newX < 0 || newY < 0 || newX >= gridSize || newY >= gridSize) return;
    if(walls.some(w => w[0] === newX && w[1] === newY)) return;
    playerPos.x = newX;
    playerPos.y = newY;
    drawGrid();
    if(playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
      status.textContent = "You rescued the lobster! Great job, Dante! 🦞🎉";
      window.removeEventListener("keydown", keyHandler);
    }
  }

  function keyHandler(e) {
    switch(e.key) {
      case "ArrowUp": movePlayer(0, -1); break;
      case "ArrowDown": movePlayer(0, 1); break;
      case "ArrowLeft": movePlayer(-1, 0); break;
      case "ArrowRight": movePlayer(1, 0); break;
    }
  }

  drawGrid();
  status.textContent = "Use arrow keys to move Zeus (🐕) through the trap!";
  window.addEventListener("keydown", keyHandler);
}