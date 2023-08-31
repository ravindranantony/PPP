const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
let currentPlayer = 'X';
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

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (cell.textContent === '' && gameActive) {
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      status.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (isBoardFull()) {
      status.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `${currentPlayer}'s turn`;
    }
  }
}

function checkWin(player) {
  return winningCombos.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function isBoardFull() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
status.textContent = `${currentPlayer}'s turn`;
