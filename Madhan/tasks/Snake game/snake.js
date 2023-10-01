const gameContainer = document.querySelector('.game-board');
const scoreDisplay = document.getElementById('score');

const gridSize = 30;
const snakeSpeed = 150;

let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let dx = 1;
let dy = 0;
let score = 0;


function createGameBoard() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameContainer.appendChild(cell);
        }
    }
}

function drawSnake() {
    snake.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.classList.add('snake');
        snakeSegment.style.gridColumnStart = segment.x + 1;
        snakeSegment.style.gridRowStart = segment.y + 1;
        gameContainer.appendChild(snakeSegment);
    });
}

function drawFood() {
    const foodCell = document.createElement('div');
    foodCell.classList.add('food');
    foodCell.style.gridColumnStart = food.x + 1;
    foodCell.style.gridRowStart = food.y + 1;
    gameContainer.appendChild(foodCell);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * gridSize);
    food.y = Math.floor(Math.random() * gridSize);
}

function checkCollision() {
    const head = snake[0];

    // Check collision with walls
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        gameOver();
        return;
    }

    // Check collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over! Your Score: ' + score);
    location.reload();
}

function gameLoop() {
    moveSnake();
    checkCollision();
    gameContainer.innerHTML = ''; // Clear the board
    drawSnake();
    drawFood();
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

// Your existing JavaScript code (provided earlier) goes here.

// Add the button functionality below your existing code.

const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const restartButton = document.getElementById('restart-button');

let gameInterval; // To control the game loop

function startGame() {
    if (!gameInterval) {
        gameInterval = setInterval(gameLoop, snakeSpeed);
        startButton.disabled = true;
        pauseButton.disabled = false;
        restartButton.disabled = true;
    }
}

function pauseGame() {
    clearInterval(gameInterval);
    gameInterval = null;
    startButton.disabled = false;
    pauseButton.disabled = true;
    restartButton.disabled = false;
}

function restartGame() {
    clearInterval(gameInterval);
    snake = [{ x: 5, y: 5 }];
    food = { x: 10, y: 10 };
    dx = 1;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = score;
    gameContainer.innerHTML = ''; // Clear the board
    drawSnake(); // Draw the initial snake
    generateFood();
    startButton.disabled = false;
    pauseButton.disabled = true;
    restartButton.disabled = true;
}

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
restartButton.addEventListener('click', restartGame);
