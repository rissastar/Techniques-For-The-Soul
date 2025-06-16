import { raveRhythmTapper } from "raveRhythm.js";
import { carRepairPuzzle } from "carRepair.js";
import { darkJokeGenerator } from "darkJokes.js";
import { memoryMatch } from "memoryMatch.js";
import { lobsterTrapMaze } from "lobsterMaze.js";
import { focusTimer } from "focusTimer.js";

const gameArea = document.getElementById("game-area");
const welcomeText = document.getElementById("welcome-text");

document.getElementById('btn-rhythm').addEventListener('click', () => {
  raveRhythmTapper(gameArea);
});
document.getElementById('btn-carfix').addEventListener('click', () => {
  carRepairPuzzle(gameArea);
});
document.getElementById('btn-jokes').addEventListener('click', () => {
  darkJokeGenerator(gameArea);
});
document.getElementById('btn-memory').addEventListener('click', () => {
  memoryMatch(gameArea);
});
document.getElementById('btn-maze').addEventListener('click', () => {
  lobsterTrapMaze(gameArea);
});
document.getElementById('btn-timer').addEventListener('click', () => {
  focusTimer(gameArea);
});