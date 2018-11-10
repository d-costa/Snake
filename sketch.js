var width;
var height;
var snake;
var ratio;
var running;
var gameOver;
var direction_changed;
var num_food;

function setup() {
    width = 800;
    height = 600;
    ratio = 10;
    num_food = 5;
    frameRate(8);
    createCanvas(width, height);
    snake = new Snake();
    food_col = [];
    create_food();
    running = true;
    gameOver = false;
    direction_changed = false;
}

function create_food() {
    for(var i = 0; i < num_food; i++) {
        food = new Food();
        food.changePosition(snake.tail, snake.size);
        food_col[i] = food;
    }
}

function reset() {
    snake = new Snake();
    control_food_number()
    create_food();
    running = true;
    gameOver = false;
    direction_changed = false;
    console.log("size:", snake.size)
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
    food = snake.willHitFood(food_col);

    if(!gameOver && running && snake.willHitBorder()) {
        console.log("Hit border! Game over!");
        stopGame()
    }
    else if(!gameOver && running && (food != null)) {
        meal_time = true;
    }
    else if(!gameOver && running && snake.willHitTail()){
        console.log("Hit tail! Game over!");
        stopGame()
    }

    if(running) {
      if(meal_time){
        snake.eat();
        food.changePosition(snake.tail, snake.size);
      }else {
        snake.update();
      }
      direction_changed = false;
    }

    snake.show();
    control_food_number();
    for(var i = 0; i < num_food; i++) {
        food_col[i].show()
    }
}
function control_food_number() {
    if(snake.size > 50)
        num_food = 1;
    else if(snake.size > 40)
        num_food = 2;
    else if(snake.size > 20)
        num_food = 3;
    else
        num_food = 5;
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
            reset();
            break;
        case 80:  // 'P' key, reset
            togglePause();
            break;
        case 49:  // '1' key, reset
            frameRate(0.5);
            break;
        case 50:  // '2' key, reset
            frameRate(8);
            break;
        case 69:  // 'e' key, reset
            snake.eat();
            break;
        default:
            break;
    }

    return false;  // convention
}
