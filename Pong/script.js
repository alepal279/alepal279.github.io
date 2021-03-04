var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// some sounds
var hitSound = new Audio('hitSound.wav');
var scoreSound = new Audio('scoreSound.wav');
var wallHitSound = new Audio('wallHitSound.wav');

var netWidth = 4;
var netHeight = canvas.height;

var paddleWidth = 10;
var paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

var net = {
    x: canvas.width / 2 - netWidth / 2,
    y: 0,
    width: netWidth,
    height: netHeight,
    color: "#FFF"
};


var user = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0
};

var ai = {
    x: canvas.width - (paddleWidth + 10),
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#FFF',
    score: 0
};


var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 7,
    speed: 7,
    velocityX: 5,
    velocityY: 5,
    color: '#05EDFF'
};
//kollar om någon knapp trycks ner
window.addEventListener('keydown',keyDownHandler);
//kollar om någon knappp släpps
window.addEventListener('keyup',keyUpHandler);

//är det någon av dessa knappar?
function keyDownHandler(event){
    switch(event.keyCode){
        case 38:
            upArrowPressed = true;
            break;
        case 40:
            downArrowPressed = true;
            break;
    }
}

function keyUpHandler(event){
    switch(event.keyCode){
    case 38:
        upArrowPressed = false;
        break;
    case 40:
        downArrowPressed = false;
        break;
    }
}




function update(){
    //rör bollen

    //kollar efter kollisioner mot kanterna
if(ball.y + ball.radius >= canvas.height || ball.y + ball.radius<=0){
    wallHitSound.play();

    ball.velocityY = -ball.velocityY;
}

if (ball.x+ball.radius >= canvas.width){
    scoreSound.play();
    
    user.score ++;
    reset();
}
if(ball.x + ball.radius <= 0){
    scoreSound.play();

    ai.score++;
    reset();
}
    //rör bollen
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    //rör paddle
    ai.y += ((ball.y - (ai.y + ai.height / 2))) * 0.09;
    //röra paddle
if(upArrowPressed == true){
    user.y -= 8;
} else if (downArrowPressed){
    user.y += 8;
}
    //kolla efter kollsioner mot paddlarna
let player = (ball.x<canvas.width/2)?user:ai;
if(collisionDetect(player,ball)){
   hitSound.play();
   
    let angle = 0;

    // if ball hit the top of paddle
    if (ball.y < (player.y + player.height / 2)) {
      // then -1 * Math.PI / 4 = -45deg
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + player.height / 2)) {
      // if it hit the bottom of paddle
      // then angle will be Math.PI / 4 = 45deg
      angle = Math.PI / 4;
    }
    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);
    ball.speed += 0.2;
}
}

function reset(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 7;

    ball.velocityX = -ball.velocityX;
    ball.velocityY = -ball.velocityY;
}

function collisionDetect(player,ball){
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;
  
    ball.top = ball.y - ball.radius;
    ball.right = ball.x + ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
  
    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawNet();
    drawScore(canvas.width / 4, canvas.height / 6, user.score);
    drawScore(3 * canvas.width / 4, canvas.height / 6, ai.score);
    drawPaddle(user.x, user.y, user.width, user.height, user.color);
    drawPaddle(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

function drawNet() {
    ctx.fillStyle = net.color;
    ctx.fillRect(net.x, net.y, net.width, net.height);
}

function drawScore(x, y, score) {
    ctx.fillStyle = '#fff';
    ctx.font = '35px sans-serif';

    ctx.fillText(score, x, y);
}

function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}



function drawBall(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}


function gameLoop(){
    update();
    draw();
}

setInterval(gameLoop,1000/60);


