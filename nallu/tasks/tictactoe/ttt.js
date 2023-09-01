const board = Array(9).fill('');
let currentPlayer = 'X';
const statusElement = document.getElementById('status');

function makeMove(index) {
    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        const cell = document.getElementsByClassName('cell')[index];
        cell.innerText = currentPlayer;
        cell.classList.add('clicked');
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function updateStatus() {
    if (checkWinner()) {
        statusElement.innerText = `Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`;
    } else if (board.every(cell => cell !== '')) {
        statusElement.innerText = "It's a draw!";
    } else {
        statusElement.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board.fill('');
    currentPlayer = 'X';
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.innerText = '';
        cell.classList.remove('clicked');
    }
    updateStatus();
}

updateStatus();
