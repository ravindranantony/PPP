const snake = document.getElementById('snake');
const food = document.getElementById('food');

let snakeX = 2;
let snakeY = 2;
let foodX = 5;
let foodY = 5;
let snakeDirection = 'right';

function update() {
    snakeX += snakeDirection === 'right' ? 1 : snakeDirection === 'left' ? -1 : 0;
    snakeY += snakeDirection === 'down' ? 1 : snakeDirection === 'up' ? -1 : 0;

    snake.style.left = `${snakeX * 20}px`;
    snake.style.top = `${snakeY * 20}px`;

    if (snakeX === foodX && snakeY === foodY) {
        foodX = Math.floor(Math.random() * 15);
        foodY = Math.floor(Math.random() * 15);
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection !== 'down') {
                snakeDirection = 'up';
            }
            break;
        case 'ArrowDown':
            if (snakeDirection !== 'up') {
                snakeDirection = 'down';
            }
            break;
        case 'ArrowLeft':
            if (snakeDirection !== 'right') {
                snakeDirection = 'left';
            }
            break;
        case 'ArrowRight':
            if (snakeDirection !== 'left') {
                snakeDirection = 'right';
            }
            break;
    }
});

setInterval(update, 150);
