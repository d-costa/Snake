var width;
var height;
var snake;
var ratio;
var running;
var gameOver;
var valid_input;

function setup() {
    width = 800;
    height = 600;
    ratio = 10;
    frameRate(8);
    createCanvas(width, height);
    snake = new Snake();
    food = new Food();
    food.changePosition();
    running = true;
    gameOver = false;
    validInput = false;
}


function reset() {
    snake = new Snake()
    food.changePosition()
    running = true;
    gameOver = false;
}

function togglePause() {
    running = !running;
}

function stopGame() {
    gameOver = true;
    reset()
}

function draw() {
    background(51);
    meal_time = false;

    if(!gameOver && running && snake.willHitBorder()) {
        console.log("Hit border! Game over!")
        stopGame()
    }
    else if(!gameOver && running && snake.willHitFood(food)) {
        meal_time = true;
    }
    else if(!gameOver && running && snake.willHitTail()){
        console.log("Hit tail! Game over!")
        stopGame()
    }

    if(running) {
      if(meal_time){
        snake.eat()
        food.changePosition(snake.tail, snake.size);
      }else {
        snake.update();
      }
      direction_changed = false;
    }

    snake.show();
    food.show();

}


function keyPressed() {
    switch(keyCode) {
        case UP_ARROW:
            if(snake.y_speed == 0 && running && !gameOver && !direction_changed) {
                snake.direction(0, -1);
                direction_changed = true;
            }
            break;
        case DOWN_ARROW:
            if(snake.y_speed == 0 && running && !gameOver && !direction_changed) {
                snake.direction(0, 1);
                direction_changed = true;
            }
            break;
        case RIGHT_ARROW:
            if(snake.x_speed == 0 && running && !gameOver && !direction_changed) {
                snake.direction(1, 0);
                direction_changed = true;
            }
            break;
        case LEFT_ARROW:
            if(snake.x_speed == 0 && running && !gameOver && !direction_changed) {
                snake.direction(-1, 0);
                direction_changed = true;
            }
            break;
        case 82:  // 'r' key, reset
            reset()
            break;
        case 80:  // 'P' key, reset
            togglePause()
            break;
        case 49:  // '1' key, reset
            frameRate(0.5)
            break;
        case 50:  // '2' key, reset
            frameRate(8)
            break;
        case 69:  // 'e' key, reset
            snake.eat()
            break;
        default:
            break;
    }

    return false;  // convention
}
