
var canvas       = document.getElementById("canvas");
var context      = canvas.getContext("2d");

var paddleColor  = "#0095DD";
var paddleHeight = 12;
var paddleWidth  = 75;
var paddleX      = (canvas.width - paddleWidth) / 2;
var paddleY      = canvas.height - paddleHeight - 5;
var rightPressed = false;
var leftPressed  = false;

var ballColor    = "#0095DD";
var ballRadius   = 6;
var ballX        = paddleX + (paddleWidth / 2);
var ballY        = paddleY - ballRadius;
var ballDx       = 2;
var ballDy       = -1.5;

var bricks           = [];
var brickColor       = "orange";
var brickRowCount    = 3;
var brickColumnCount = 5;
var brickWidth       = 75;
var brickHeight      = 20;
var brickPadding     = 10;
var brickOffsetTop   = 30;
var brickOffsetLeft  = 30;

setInterval(draw, 10);
initBricksValues();
document.addEventListener("keyup"  , keyUpHandler  , false);
document.addEventListener("keydown", keyDownHandler, false);

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawBricks();
}

function drawBall() {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  context.fillStyle = ballColor;
  context.fill();
  context.closePath();

  checkBallCollisions();

  ballX += ballDx;
  ballY += ballDy;
}

function checkBallCollisions() {
  checkBorderCollisions();
  checkPaddleCollisions();
}

function checkBorderCollisions() {
  if (ballX + ballDx > canvas.width - ballRadius ||
      ballX + ballDx < ballRadius) {
    setBallColor();
    ballDx = -ballDx;
  }

  if (ballY + ballDy < ballRadius) {
      setBallColor();
      ballDy = -ballDy;
  } else if (ballY + ballDy > canvas.height - ballRadius) {
      alert("GAME OVER");
      document.location.reload();
  }
}

function checkPaddleCollisions() {
  if((ballX > paddleX && ballX < paddleX + paddleWidth) &&
     ballY + ballRadius > paddleY) {
    ballDy = -ballDy;
  }
}

function setBallColor() {
  ballColor = getRandomColor();
}

function getRandomColor() {
  var hexaValues  = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
  var randomColor = "#";
  var randomIndex = 0;

  for (var i = 0; i < 6; i++) {
    randomIndex = getRandomNumb(0, hexaValues.length);
    randomColor += hexaValues[randomIndex];
  }

  return randomColor;
}

function getRandomNumb(minNum, maxNum) {
  return Math.round(Math.random() * (maxNum - minNum) + minNum);
}

function drawPaddle() {
  context.beginPath();
  context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  context.fillStyle = paddleColor;
  context.fill();
  context.closePath();

  if(rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 5;
  } else if(leftPressed && paddleX > 0) {
      paddleX -= 5;
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 39) {
      rightPressed = true;
  } else if(e.keyCode == 37) {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = false;
  } else if(e.keyCode == 37) {
      leftPressed = false;
  }
}

function initBricksValues() {
  for(col = 0; col < brickColumnCount; col++) {
    bricks[col] = [];

    for(row = 0; row < brickRowCount; row++) {
      bricks[col][row] = { x: 0, y: 0 };
    }
  }
}

function drawBricks() {
  for (var col = 0; col < brickColumnCount; col++) {
    for (var row = 0; row < brickRowCount; row++) {
      var brickX = (col * (brickWidth  + brickPadding)) + brickOffsetLeft;
      var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;

      bricks[col][row].x = brickX;
      bricks[col][row].y = brickY;

      context.beginPath();
      context.rect(brickX, brickY, brickWidth, brickHeight);
      context.fillStyle = brickColor;
      context.fill();
      context.closePath();
    }
  }
}
