let cells = document.querySelectorAll(".cell");
let currentPlayer = "x";

// Fetch random image from Unsplash and set as background
fetch('https://source.unsplash.com/random/1920x1080')
    .then((response) => {
        document.body.style.backgroundImage = `url(${response.url})`;
    })
    .catch((err) => {
        console.error("Error fetching the background image:", err);
    });

// ... [rest of the code remains the same]


function makeMove(position) {
    if (!cells[position].classList.contains('x') && !cells[position].classList.contains('o')) {
        cells[position].classList.add(currentPlayer);
        if (checkWinner()) {
            setTimeout(() => {
                alert(currentPlayer.toUpperCase() + " wins!");
                resetGame();
            }, 100);
        } else if (Array.from(cells).every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
            setTimeout(() => {
                alert("It's a draw!");
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === "x" ? "o" : "x";
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentPlayer);
        });
    });
}

function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
    });
    currentPlayer = "x";
}
