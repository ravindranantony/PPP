let currentPlayer = 'X';
let gameActive = true;
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const winnerMessage = document.getElementById('winner');

cells.forEach(cell => {
  cell.addEventListener('click', makeMove);
  cell.addEventListener('mouseover', () => {
    if (!cell.textContent) {
      cell.style.backgroundColor = '#eee';
    }
  });
  cell.addEventListener('mouseout', () => {
    if (!cell.textContent) {
      cell.style.backgroundColor = 'white';
    }
  });
});

resetButton.addEventListener('click', resetGame);

function makeMove(event) {
  const cell = event.target;
  if (gameActive && !cell.textContent) {
    cell.textContent = currentPlayer;
    cell.style.backgroundColor = 'white'; // Reset cell color
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      cells[a].style.backgroundColor = 'blue';
      cells[b].style.backgroundColor = 'blue';
      cells[c].style.backgroundColor = 'blue';
      winnerMessage.textContent = `${currentPlayer} wins!`;
      gameActive = false;
      cells.forEach(cell => cell.removeEventListener('click', makeMove));
      return;
    }
  }

  if ([...cells].every(cell => cell.textContent)) {
    winnerMessage.textContent = "It's a draw!";
    gameActive = false;
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    winnerMessage.textContent = '';
  });
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => cell.addEventListener('click', makeMove));
}
