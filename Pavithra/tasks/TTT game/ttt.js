let currentPlayer = 'X';
let cells = Array.from(document.getElementsByClassName('cell'));
let messageElement = document.getElementById('message');

function makeMove(index) {
    if (!cells[index].innerHTML) {
        cells[index].innerHTML = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]           // diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            messageElement.textContent = `Player ${cells[a].innerHTML} wins!`;
            cells.forEach(cell => cell.style.pointerEvents = 'none');
            return;
        }
    }

    if (cells.every(cell => cell.innerHTML !== '')) {
        messageElement.textContent = "It's a draw!";
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.pointerEvents = 'auto';
    });
    messageElement.textContent = '';
    currentPlayer = 'X';
}
