let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function makeMove(tileIndex) {
    if (gameBoard[tileIndex] === '' && gameActive) {
        gameBoard[tileIndex] = currentPlayer;
        document.getElementById('board').children[tileIndex].textContent = currentPlayer;
        document.getElementById('board').children[tileIndex].classList.add('filled');
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            document.getElementById('board').children[a].classList.add('winner');
            document.getElementById('board').children[b].classList.add('winner');
            document.getElementById('board').children[c].classList.add('winner');
            gameActive = false;
            document.getElementById('winner-message').textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameActive = false;
        document.getElementById('winner-message').textContent = "It's a tie!";
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.textContent = '';
        tile.classList.remove('filled', 'winner');
    });

    document.getElementById('winner-message').textContent = '';
}

document.getElementById('clear-button').addEventListener('click', resetGame);

// Initialize the game
resetGame();
