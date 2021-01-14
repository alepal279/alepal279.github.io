var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
var xspeed = 2;
var yspeed = -2;
var ballRadius = 10;
var paddleH = 10;
var paddleW = 70;
var paddleX = (canvas.width - paddleW) / 2;
var right = false;
var left = false;
var score = 0;
var lives = 3;

//bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickW = 75;
var brickH = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += xspeed;
    y += yspeed;
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    drawBricks();

    if (y + yspeed < ballRadius) {
        yspeed = -yspeed;
    }
    else if (y + yspeed + ballRadius > canvas.height) {
        if (x > paddleX && x < paddleX + paddleW) {
            yspeed = -yspeed;
        }

        else if(lives>0){
        lives--;
        x = canvas.width/2;
        y = canvas.height-30;
        xspeed = 2;
        yspeed = -2;
        paddleX = (canvas.width-paddleW)/2;
        }

        else {

            alert("Game Over")
            document.location.reload();
            clearInterval(interval); //behövs för att chrome ska avsluta spelet
        }
    }
    if (x + xspeed < ballRadius || x + xspeed + ballRadius > canvas.width) {
        xspeed = -xspeed;
    }


    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleW > canvas.width) {
            paddleX = canvas.width - paddleW;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }


}



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleH, paddleW, paddleH);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickW + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickH + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickW, brickH);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickW && y > b.y && y < b.y + brickH) {
                    yspeed = -yspeed;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount){
                        alert("You WON");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillstyle = "#0095DD";
    ctx.fillText("Score: "+score,8,20);
}

function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20)
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e){
    var relativeX = e.clientX-canvas.offsetLeft;
    if(relativeX>0 && relativeX<canvas.width){
        paddleX = relativeX-paddleW/2;
    }
}

function keyDownHandler(e) {
    if (e.key == "right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

var interval = setInterval(draw, 10);

//femte steget är jag på
//https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Game_over
