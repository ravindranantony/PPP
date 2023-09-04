let currentPlayer = 'X';
let computerPlayer = 'O';
let gameOver = false;

function makeMove(cell) {
    if (!cell.textContent && !gameOver && currentPlayer === 'X') {
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            document.querySelector('.message').textContent = 'You win!';
            gameOver = true;
        } else if (checkDraw()) {
            document.querySelector('.message').textContent = "It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = computerPlayer;
            computerMove();
        }
    }
}

function computerMove() {
    if (gameOver) {
        return;
    }

    const cells = document.querySelectorAll('.cell');
    const emptyCells = [...cells].filter(cell => !cell.textContent);

    if (emptyCells.length === 0) {
        document.querySelector('.message').textContent = "It's a draw!";
        gameOver = true;
        return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    randomCell.textContent = computerPlayer;

    if (checkWin(computerPlayer)) {
        document.querySelector('.message').textContent = 'Computer wins!';
        gameOver = true;
    } else if (checkDraw()) {
        document.querySelector('.message').textContent = "It's a draw!";
        gameOver = true;
    }

    currentPlayer = 'X';
}

function checkWin(player) {
    const cells = document.querySelectorAll('.cell');
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent === player && cells[b].textContent === player && cells[c].textContent === player) {
            cells[a].style.backgroundColor = 'green';
            cells[b].style.backgroundColor = 'green';
            cells[c].style.backgroundColor = 'green';
            return true;
        }
    }
    return false;
}

function checkDraw() {
    const cells = document.querySelectorAll('.cell');
    return [...cells].every(cell => cell.textContent);
}

function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#eee';
    });
    document.querySelector('.message').textContent = '';
    currentPlayer = 'X';
    gameOver = false;
}

resetGame();