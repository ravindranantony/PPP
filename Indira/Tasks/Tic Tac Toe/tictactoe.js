const board = document.getElementById("board");
const status = document.getElementById("status");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function makeMove(index) {
    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName("cell")[index].textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes("")) {
        gameActive = false;
        return "Tie";
    }

    return null;
}

function updateStatus() {
    const winner = checkWinner();
    if (winner) {
        if (winner === "Tie") {
            status.textContent = "It's a Tie!";
        } else {
            status.textContent = `${winner} wins!`;
        }
    } else {
        status.textContent = `Current player: ${currentPlayer}`;
    }
}

function resetBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
    updateStatus();
}

updateStatus();