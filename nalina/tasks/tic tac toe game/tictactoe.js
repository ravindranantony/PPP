const board = document.getElementById("board");
const cells = [];
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let isGameOver = false;

// Initialize the board
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        cells.push(cell);
        board.appendChild(cell);

        cell.addEventListener("click", () => handleCellClick(cell));
    }
}

function handleCellClick(cell) {
    if (cell.innerText || isGameOver) return;

    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) {
        message.innerText = `${currentPlayer} wins!`;
        isGameOver = true;
    } else if (isBoardFull()) {
        message.innerText = "It's a draw!";
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (currentPlayer === "O") {
            // Computer's turn
            setTimeout(makeComputerMove, 500); // Delay for visual effect
        }
    }
}

function makeComputerMove() {
    if (isGameOver) return;

    const bestMove = getBestMove();
    const cell = cells[bestMove.index];
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWinner()) {
        message.innerText = `${currentPlayer} wins!`;
        isGameOver = true;
    } else if (isBoardFull()) {
        message.innerText = "It's a draw!";
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function getBestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText === "") {
            cells[i].innerText = currentPlayer;
            const score = minimax(cells, 0, false);
            cells[i].innerText = "";

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return { index: move };
}

function minimax(board, depth, isMaximizing) {
    if (checkWinner()) {
        return isMaximizing ? -1 : 1;
    } else if (isBoardFull()) {
        return 0;
    }

    const scores = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i].innerText === "") {
            board[i].innerText = isMaximizing ? "O" : "X";
            const score = minimax(board, depth + 1, !isMaximizing);
            board[i].innerText = "";
            scores.push(score);
        }
    }

    return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

function checkWinner() {
    // Implement the winning logic as before
}

function isBoardFull() {
    // Implement the logic to check if the board is full as before
}

resetButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("X", "O", "win");
    });
    message.innerText = "";
    currentPlayer = "X";
    isGameOver = false;
});
