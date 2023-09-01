let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let gameOver = false;

function makeMove(row, col) {
    if (!gameOver && board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.getElementById('board').children[row * 3 + col].textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winningCombos = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
            document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
            return;
        }
    }

    if (!board.flat().includes('')) {
        document.getElementById('message').textContent = "It's a draw!";
        gameOver = true;
    }
}
