const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverDisplay = document.querySelector('.game-over');
const finalScoreDisplay = document.getElementById('final-score');

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let score = 0;
let highScore = 0;
let snakeSpeed = 7;
let changingDirection = false;
let paused = false;

document.addEventListener('keydown', changeDirection);
document.addEventListener('keydown', pauseGame);
gameOverDisplay.addEventListener('click', startGame);

function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    const keyPressed = event.key;

    if (keyPressed === 'ArrowUp' && snakeSpeed !== 7) {
        snakeSpeed = -7;
    }
    if (keyPressed === 'ArrowDown' && snakeSpeed !== -7) {
        snakeSpeed = 7;
    }
    if (keyPressed === 'ArrowLeft' && snakeSpeed !== 1) {
        snakeSpeed = -1;
    }
    if (keyPressed === 'ArrowRight' && snakeSpeed !== -1) {
        snakeSpeed = 1;
    }
}

function pauseGame(event) {
    if (event.key === ' ') {
        paused = !paused;
        if (paused) {
            document.body.style.opacity = 0.5;
        } else {
            document.body.style.opacity = 1;
            requestAnimationFrame(main);
        }
    }
}

function startGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    score = 0;
    snakeSpeed = 7;
    changingDirection = false;
    paused = false;
    document.body.style.opacity = 1;
    gameOverDisplay.style.display = 'none';
    requestAnimationFrame(main);
}

function main(currentTime) {
    if (paused) {
        return;
    }

    changingDirection = false;
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) {
        requestAnimationFrame(main);
        return;
    }

    lastRenderTime = currentTime;

    update();
    draw();
    checkCollision();

    requestAnimationFrame(main);
}

function update() {
    const inputDirection = snakeSpeed;
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }

    snake[0].x += inputDirection;
    snake[0].y += inputDirection;
}

function draw() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function checkCollision() {
    if (snake[0].x < 1 || snake[0].x > 30 || snake[0].y < 1 || snake[0].y > 30) {
        endGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            endGame();
        }
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
        }
        food = getRandomFoodPosition();
    }
}

function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * 30) + 1;
    const y = Math.floor(Math.random() * 30) + 1;
    return { x, y };
}

function endGame() {
    paused = true;
    gameOverDisplay.style.display = 'block';
    finalScoreDisplay.textContent = score;
}

let lastRenderTime = 0;
startGame();
