const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal');


const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;

let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];

window.addEventListener('keydown', keyPress)
startGame();

function startGame(){
 context.fillStyle = '#212121';
 context.fillRect(0,0,WIDTH,HEIGHT);
 createFood();
 displayFood();
 nextTick()
}

function clearBoard(){
    context.fillStyle = '#212121';
    context.fillRect(0,0,WIDTH,HEIGHT);
}

function createFood(){
foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
foodY = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
}

function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,UNIT,UNIT);
}

function drawSnake(){
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121'
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
    })
}

function moveSnake(){
   const head = {x:snake[0].x+xVel,
                  y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop()
    }
    
}

function nextTick(){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        nextTick();
    }, 300);
}

function keyPress(event){
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch(true){
        case(event.keyCode==LEFT && xVel!==UNIT):
           xVel =-UNIT;
           yVel = 0;
           break;
        case(event.keyCode==RIGHT && xVel!==-UNIT):
           xVel=UNIT;
           yVel=0;
           break;
        case(event.keyCode==UP && yVel!==UNIT):
           xVel=0;
           yVel=-UNIT;
           break;
        case(event.keyCode==DOWN && yVel!==-UNIT):
           xVel=0;
           yVel=UNIT;
           break;
    }
}