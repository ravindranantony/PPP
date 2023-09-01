let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winner = null; // Add a winner variable

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const boardElement = document.getElementById('board');

function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            winner = currentPlayer; // Set the winner
            statusText.textContent = `${winner} wins!`; // Update the message with the correct winner

            // Remove the green background color from all cells
            cells.forEach((cell) => {
                cell.style.backgroundColor = '';
            });

            // Add intersection lines to indicate the winning combination
            cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = 'cyan';

            return;
        }
    }

    if (!board.includes('') && gameActive) {
        gameActive = false;
        winner = 'Draw'; // Set the winner to 'Draw'
        statusText.textContent = 'It\'s a draw!';
    }
}

function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWinner();
        
        if (gameActive) {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X'; // Toggle the player only if the game is still active
        }
    }
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    winner = null; // Reset the winner
    statusText.textContent = '';
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
    });
}

resetGame();
