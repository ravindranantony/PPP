const canvas=document.getElementById('mycanvas');
const abc=canvas.getContext('2d');
//increase snake size 
class snakePart{
constructor(x, y){
    this.x=x;
    this.y=y;
 }

}

let speed=7;
let tileCount=20; 

let tileSize=canvas.clientWidth/tileCount-2;
let headX=10;
let headY=10;

// array representing parts of the snake
const snakeParts=[];
let tailLength=2;

//initialize the speed of the snake
let xSpeed=0;
let ySpeed=0;

//draw food
let foodAtX=5;
let foodAtY=5;

//scores
let score=0;

// create a game loop to continuously update the screen
function startGame(){
    changeInPos();
    // game over logic
    let result=isGameOver();
    if(result){// if result is true
        return;
    }
    setScreen();
    drawSnake(); //Method to display the body of the Snake
    drawFood(); // Method to display food
  
    eatFood() // Method used for detecting the food intake
    drawScore();
    setTimeout(startGame, 1000/speed);//update screen 7 times a second
}
// isGameOver() method to be invoked after the game becomes over
function isGameOver(){
    let gameOver=false; 
    //check if the game has begun
    if(ySpeed===0 && xSpeed===0){
        return false;
    }
    if(headX<0){//condition if snake collides with the left wall
        gameOver=true;
    }
    else if(headX===tileCount){// condition if snake collides with the right wall
        gameOver=true;
    }
    else if(headY<0){//if snake collides with wall at the top
        gameOver=true;
    }
    else if(headY===tileCount){//if snake collides with the wall at the bottom
        gameOver=true;
    }

    //condition for collision with its own body

     for(let i=0; i<snakeParts.length;i++){
         let part=snakeParts[i];
         if(part.x===headX && part.y===headY)
         { //check whether any part of the snake is occupying the same space
             gameOver=true;
             break; // to break out of for loop
         }
     }
    

    //To display the "Game Over" text after a collision occurs
    if(gameOver){
     abc.fillStyle="black";
     abc.font="30px verdana";
     abc.fillText("Oops...Game Over! ", canvas.clientWidth/6.5, canvas.clientHeight/2);//position our text in center
    }

    return gameOver;// to stop the execution of Game
}

// Method to display the score
function drawScore(){
abc.fillStyle="black"// set our text color to white
abc.font="12px verdena"// font size to 12px
abc.fillText("Score: " +score, canvas.clientWidth -50,10);// position our score at right hand corner 
}

// clear our screen
 function setScreen(){

abc.fillStyle= 'Brown'// make screen brown
abc.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)// brown color start from 0px left, right to canvas width and canvas height
}
 function drawSnake(){
    
    abc.fillStyle="blue";
    //traversing through snakeparts array
    for(let i=0;i<snakeParts.length;i++){
        //draw snake parts
        let part=snakeParts[i]
         abc.fillRect(part.x *tileCount, part.y *tileCount, tileSize,tileSize)
    }
    //add parts to the snake --through push
    snakeParts.push(new snakePart(headX,headY));//put item at the end of the list next to the head
    if(snakeParts.length>tailLength){
        snakeParts.shift();//remove the furthest item from  snake part if we have more than our tail size

    }
    abc.fillStyle="orange";
    abc.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize)


 }
 function changeInPos(){
     headX=headX + xSpeed;
     headY=headY+ ySpeed;
     
 }
 function drawFood(){
     abc.fillStyle="blue";
     abc.fillRect(foodAtX*tileCount, foodAtY*tileCount, tileSize, tileSize)
 }
 // check for collision and change apple position
 function eatFood(){
     if(foodAtX==headX && foodAtY==headY){
         foodAtX=Math.floor(Math.random()*tileCount);
         foodAtY=Math.floor(Math.random()*tileCount);
         tailLength++;
         score++; //increase our score value

     }
 }
 //add event listener to our body
 document.body.addEventListener('keydown', keyDown);

function keyDown()
//up
{
    if(event.keyCode==38){
        //prevent the snake from moving in the opposite direction
        if(ySpeed==1)
        return;
        ySpeed=-1;
        xSpeed=0;
        
    }
    //down
    if(event.keyCode==40){
        if(ySpeed==-1)
        return;
        ySpeed=1;
        xSpeed=0;
    }

//left
    if(event.keyCode==37){
        if(xSpeed==1)
        return;
        ySpeed=0;
        xSpeed=-1;
    }
    //right
    if(event.keyCode==39){
        if(xSpeed==-1)
        return;
        ySpeed=0;
        xSpeed=1;
    }
}

 startGame(); 
