const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const startMenu = document.getElementById('start-menu');
const gameContainer = document.getElementById('game-container');
const btn1v1 = document.getElementById('btn-1v1');
const btnBot = document.getElementById('btn-bot');

let vsBot = false; // default mode is 1v1
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  // If vs bot and it's bot's turn
  if (vsBot && currentPlayer === "O") {
    setTimeout(botMove, 500); // slight delay for realism
  }
}

function botMove() {
  if (!gameActive) return;

  // Simple AI: random empty cell
  let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  board[move] = "O";
  document.querySelector(`.cell[data-index="${move}"]`).textContent = "O";

  if (checkWinner()) {
    statusText.textContent = `Player O wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

btn1v1.addEventListener('click', () => {
  vsBot = false;
  startGame();
});

btnBot.addEventListener('click', () => {
  vsBot = true;
  startGame();
});

function startGame() {
  startMenu.style.display = "none";
  gameContainer.style.display = "block";
  resetGame();
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}
  

function checkWinner() {
  return winningCombos.some(combo => {
    return combo.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = 'X';
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);


