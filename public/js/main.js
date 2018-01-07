
var canvas       = document.getElementById("canvas");
var context      = canvas.getContext("2d");

var ballX        = canvas.width / 2;
var ballY        = canvas.height - 30;
var ballColor    = "#0095DD";
var ballRadius   = 6;
var ballDx       = 2;
var ballDy       = -1.5;

var paddleHeight = 12;
var paddleWidth  = 75;
var paddleX      = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed  = false;

setInterval(draw, 10);
document.addEventListener("keyup"  , keyUpHandler  , false);
document.addEventListener("keydown", keyDownHandler, false);

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
}

function drawBall() {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
  context.fillStyle = ballColor;
  context.fill();
  context.closePath();

  if (ballX + ballDx > canvas.width - ballRadius ||
      ballX + ballDx < ballRadius) {
    setBallColor();
    ballDx = -ballDx;
  }

  if (ballY + ballDy > canvas.height - ballRadius  ||
      ballY + ballDy < ballRadius) {
    setBallColor();
    ballDy = -ballDy;
  }


  ballX += ballDx;
  ballY += ballDy;
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
  context.rect(paddleX, canvas.height - paddleHeight - 5, paddleWidth, paddleHeight);
  context.fillStyle = "#0095DD";
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
