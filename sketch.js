var width;
var height;
var snake;
var ratio;
var running;
var gameOver;
var valid_input;

function setup() {
    width = 800;
    height = 500;
    ratio = 10;
    framerate = 7;
    createCanvas(width, height);
    frameRate(8);
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
    valid_input = false;
    // direction is set and cannot be changed
    background(51);


    if(!gameOver && running && snake.willHitBorder()) {
        console.log("Hit border! Game over!")
        stopGame()
    }
    if(!gameOver && running && snake.willHitFood(food)) {
        snake.eat()
        food.changePosition(snake.tail, snake.size);
    }
    if(!gameOver && running && snake.willHitTail()){
        console.log("Hit tail! Game over!")
        stopGame()
    }

    if(running) {
        snake.update();
    }

    snake.show();
    food.show();
    valid_input = true;
}


function keyPressed() {
    if(valid_input) {
        switch(keyCode) {
            case UP_ARROW:
                if(snake.y_speed == 0 && running && !gameOver) {
                    snake.direction(0, -1);
                }
                break;
            case DOWN_ARROW:
                if(snake.y_speed == 0 && running && !gameOver) {
                    snake.direction(0, 1);
                }
                break;
            case RIGHT_ARROW:
                if(snake.x_speed == 0 && running && !gameOver) {
                    snake.direction(1, 0);
                }
                break;
            case LEFT_ARROW:
                if(snake.x_speed == 0 && running && !gameOver) {
                    snake.direction(-1, 0);
                }
                break;
            case 82:  // 'r' key, reset
                reset()
                break;
            case 80:  // 'P' key, reset
                togglePause()
                break;
            case 49:  // '1' key, reset
                frameRate(1)
                break;
            case 50:  // '.' key, reset
                frameRate(8)
                break;
            case 69:  // 'e' key, reset
                snake.eat()
                break;
            default:
                break;
        }
    }
    return false;  // convention
}
