document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const startButton = document.querySelector('.start-button');
    const scoreDisplay = document.querySelector('.score');

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let direction = 'right';
    let isPlaying = false;
    let score = 0;
    let intervalId;

    const gridSize = 20;
    const boardSize = 20;
    const speed = 100;

    function createGrid() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                gameBoard.appendChild(cell);
            }
        }
    }

    function drawSnake() {
        snake.forEach(segment => {
            const snakeSegment = document.createElement('div');
            snakeSegment.classList.add('snake');
            snakeSegment.style.gridRowStart = segment.y;
            snakeSegment.style.gridColumnStart = segment.x;
            gameBoard.appendChild(snakeSegment);
        });
    }

    function drawFood() {
        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        gameBoard.appendChild(foodElement);
    }

    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * boardSize) + 1,
            y: Math.floor(Math.random() * boardSize) + 1,
        };

        if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            generateFood(); // Regenerate food if it's on the snake
        }

        drawFood();
    }

    function checkCollision() {
        const head = snake[0];
        if (
            head.x < 1 ||
            head.x > boardSize ||
            head.y < 1 ||
            head.y > boardSize ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            gameOver();
        }
    }

    function gameOver() {
        clearInterval(intervalId);
        alert(`Game Over! Your Score: ${score}`);
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        isPlaying = false;
        createGrid();
        drawSnake();
    }

    function update() {
        if (!isPlaying) return;

        moveSnake();
        checkCollision();
        createGrid();
        drawSnake();
        drawFood();
    }

    startButton.addEventListener('click', () => {
        if (!isPlaying) {
            isPlaying = true;
            createGrid();
            drawSnake();
            generateFood();
            intervalId = setInterval(update, speed);
        }
    });

    // Handle keydown event to change direction
    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    createGrid();
    drawSnake();
    generateFood();
});
