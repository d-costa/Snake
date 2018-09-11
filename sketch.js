var width;
var height;
var snake;
var ratio;
var running;
var gameOver;

function setup() {
  width = 800;
  height = 500;
  ratio = 10;
  framerate = 10;
  createCanvas(width, height);
  frameRate(10);
  snake = new Snake();
  food = new Food();
  food.changePosition();
  running = true;
  gameOver = false;
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
  if(running) {
    snake.update();
  }
  if(!gameOver && running && !snake.insideBorders()) {
    console.log("Game over!")
    stopGame()
  }
  if(snake.checkFood(food)) {
    food.changePosition(snake.tail, snake.size);
    snake.eat()
  }
  snake.show();
  food.show();
}


function keyPressed() {
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
    case 82:  // 'R' key, reset
      reset()
      break;
    case 80:  // 'P' key, reset
      togglePause()
      break;
    default:
      break;
  }

}
