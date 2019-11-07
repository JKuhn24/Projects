/*

Original Author: Jeffrey Kuhn
Date Created: 10-3-19
Version: 1
Date Last Modified: 10-4-19
Modified by: Jeffrey Kuhn
Modification log: JavaScript written for Snake Game
 
*/



const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create unit
const box = 32;

//load image
const ground = new Image();
ground.src = "images/ground.png"

const foodImg = new Image();
foodImg.src = "images/apple.png";

//create the snake
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

//create food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

//create the score
let score = 0;
let highScore = 0;

//control snake

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
    } else if(event.keyCode == 38  && d != "DOWN"){
        d = "UP";
    } else if(event.keyCode == 39  && d != "LEFT"){
        d = "RIGHT";
    } else if(event.keyCode == 40  && d != "UP"){
        d = "DOWN";
    }
}

// check for collision
function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y)
        return true;
    }
    return false;
}
//draw to the canvas

function draw() {
    ctx.drawImage(ground,0,0);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

        ctx.drawImage(foodImg, food.x, food.y);

        //old head position
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        //which direction
        if( d == "LEFT") snakeX -= box;
        if( d == "UP") snakeY -= box;
        if( d == "RIGHT") snakeX += box;
        if( d == "DOWN") snakeY += box;

        // if the snake eats the food
        if(snakeX == food.x && snakeY == food.y) {
            score++;
            food = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box
            }
        }else{
            //remove the tail
            snake.pop();
        }

          //add new Head
          let newHead = {
            x : snakeX,
            y : snakeY
        }

        // add high score
        if (score > highScore) {
            highScore = score;
        }
        // game over
        if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
            clearInterval(game);
            d = "no";
        }

        //remove tail
        //snake.pop();

        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText(score,2*box,1.6*box);

        //ctx.fillText("High Score: ", highScore, 2*box, 30*box);
        document.getElementById("highScore").innerHTML = highScore;
}

function retry(){
    score = 0;
    snake = [];
    snake[0] = {
    x : 9 * box,
    y : 10 * box
}

    game = setInterval(draw,100);
    let newHead = 1;
    collision(newHead, snake);
}

//call draw function every 100 ms

let game = setInterval(draw,100);