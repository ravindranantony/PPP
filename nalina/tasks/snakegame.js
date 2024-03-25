const snake = document.getElementById("snake");
const food = document.getElementById("food");
const gridSize = 20;
const gridSizeInPixels = 300;
const initialSnakeSize = 3;

let snakeX = 0;
let snakeY = 0;
let foodX;
let foodY;
let dx = gridSize;
let dy = 0;
let snakeSize = initialSnakeSize;
const snakeBody = [];

function getRandomPosition() {
    return Math.floor(Math.random() * gridSize) * gridSize;
}

function placeFood() {
    foodX = getRandomPosition();
    foodY = getRandomPosition();
    food.style.left = foodX + "px";
    food.style.top = foodY + "px";
}

function updateSnake() {
    snakeX += dx;
    snakeY += dy;

    // Wrap around when hitting the edges
    if (snakeX >= gridSizeInPixels) {
        snakeX = 0;
    } else if (snakeX < 0) {
        snakeX = gridSizeInPixels - gridSize;
    }
    if (snakeY >= gridSizeInPixels) {
        snakeY = 0;
    } else if (snakeY < 0) {
        snakeY = gridSizeInPixels - gridSize;
    }

    snake.style.left = snakeX + "px";
    snake.style.top = snakeY + "px";

    // Check for collision with food
    if (snakeX === foodX && snakeY === foodY) {
        snakeSize++;
        placeFood();
    }

    // Update the snake's body
    snakeBody.push({ x: snakeX, y: snakeY });
    if (snakeBody.length > snakeSize) {
        const removedSegment = snakeBody.shift();
        document.getElementById(removedSegment.x + "-" + removedSegment.y).remove();
    }

    // Check for self-collision
    for (let i = 0; i < snakeBody.length - 1; i++) {
        if (snakeBody[i].x === snakeX && snakeBody[i].y === snakeY) {
            alert("Game Over! Your score: " + (snakeSize - initialSnakeSize));
            location.reload();
        }
    }
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (dy !== gridSize) {
                dx = 0;
                dy = -gridSize;
            }
            break;
        case "ArrowDown":
            if (dy !== -gridSize) {
                dx = 0;
                dy = gridSize;
            }
            break;
        case "ArrowLeft":
            if (dx !== gridSize) {
                dx = -gridSize;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx !== -gridSize) {
                dx = gridSize;
                dy = 0;
            }
            break;
    }
});

// Create grid cells
for (let i = 0; i < gridSizeInPixels; i += gridSize) {
    for (let j = 0; j < gridSizeInPixels; j += gridSize) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        cell.id = i + "-" + j;
        cell.style.width = gridSize + "px";
        cell.style.height = gridSize + "px";
        cell.style.position = "absolute";
        cell.style.left = i + "px";
        cell.style.top = j + "px";
        document.querySelector(".game-container").appendChild(cell);
    }
}

placeFood();
setInterval(updateSnake, 100);
