const cards = [
  {name: 'rap', emoji: '🎤'},
  {name: 'rap', emoji: '🎤'},
  {name: 'car', emoji: '🚗'},
  {name: 'car', emoji: '🚗'},
  {name: 'lobster', emoji: '🦞'},
  {name: 'lobster', emoji: '🦞'},
  {name: 'dog', emoji: '🐕'},
  {name: 'dog', emoji: '🐕'},
];

export function memoryMatch(gameArea) {
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matches = 0;

  gameArea.innerHTML = `
    <p class="neon-text" style="color: var(--neon1); font-weight: 900; font-size: 1.5rem;">🧠 Memory Match</p>
    <p style="margin-bottom: 1rem;">Find all the matching pairs!</p>
    <div id="memory-board" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
    </div>
    <p id="match-status" style="margin-top: 1rem; font-weight: 700;"></p>
  `;

  const board = gameArea.querySelector("#memory-board");
  const status = gameArea.querySelector("#match-status");

  // Shuffle cards
  const shuffled = cards.sort(() => 0.5 - Math.random());

  shuffled.forEach((card, index) => {
    const cardDiv = document.createElement('button');
    cardDiv.style = `
      width: 70px; height: 70px; font-size: 2rem; border-radius: 12px;
      background: var(--button-bg); color: var(--text); cursor: pointer; box-shadow: 0 0 5px var(--neon2);
    `;
    cardDiv.dataset.name = card.name;
    cardDiv.textContent = "?";
    cardDiv.addEventListener("click", () => {
      if(lockBoard) return;
      if(cardDiv === firstCard) return;
      cardDiv.textContent = card.emoji;

      if(!firstCard) {
        firstCard = cardDiv;
        return;
      }
      secondCard = cardDiv;
      lockBoard = true;

      if(firstCard.dataset.name === secondCard.dataset.name){
        matches++;
        firstCard.style.visibility = "hidden";
        secondCard.style.visibility = "hidden";
        status.textContent = `Good job! Matches found: ${matches}`;
        resetTurn();
        if(matches === cards.length/2){
          status.textContent = "🎉 You matched all pairs! Nice memory, Dante!";
        }
      } else {
        setTimeout(() => {
          firstCard.textContent = "?";
          secondCard.textContent = "?";
          resetTurn();
        }, 1000);
      }
    });
    board.appendChild(cardDiv);
  });

  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }
}