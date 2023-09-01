// Variables to keep track of the game state
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

// Elements
const boxes = document.querySelectorAll('.box');
const playerText = document.getElementById('playerText');
const restartBtn = document.getElementById('restartBtn');

// Event listeners for each box
boxes.forEach((box, index) => {
  box.addEventListener('click', () => handleBoxClick(index));
});

// Handle box click
function handleBoxClick(index) {
  if (gameState[index] === '' && gameActive) {
    gameState[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;
    checkResult();
    togglePlayer();
  }
}

// Check for a win or a draw
function checkResult() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      highlightCombo(combo);
      playerText.textContent = `Player ${currentPlayer} wins!`;
      break;
    } else if (!gameState.includes('')) {
      gameActive = false;
      playerText.textContent = "It's a draw!";
    }
  }
}

// Highlight the winning combination
function highlightCombo(combo) {
  for (const index of combo) {
    boxes[index].classList.add('win');
  }
}

// Toggle player turn
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerText.textContent = `Player ${currentPlayer}'s turn`;
}

// Restart the game
restartBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  boxes.forEach(box => {
    box.textContent = '';
    box.classList.remove('win');
  });
  playerText.textContent = `Player ${currentPlayer}'s turn`;
});

// Initialize the game
playerText.textContent = `Player ${currentPlayer}'s turn`;
