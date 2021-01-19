var canvas = document.getElementById("myCanvas1");
var ctx = canvas.getContext("2d");

var x = 20;
var y = 10;
var height = 10;
var width = 10;

draw();

function draw(){
    staplar();
}

function staplar(){
    for(i=0; i<10; i++){
    ctx.beginPath();
    ctx.rect(x*i,y,width,height*i);
    ctx.filStyle = "red";
    ctx.fill();
    ctx.closePath;
    }
}

var canvas = document.getElementById("myCanvas2");
var ctx = canvas.getContext("2d");

var X = 20;
var Y = 20;
var kvadratW = 20;
var kvadratH = 20;

kvadrat();

function kvadrat(){
    for(i = 0; i<10; i++){
    ctx.beginPath();
    ctx.rect(X*i,Y*i,kvadratW*i,kvadratH*i);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath;
    }
}

var canvas = document.getElementById("myCanvas3");
var ctx = canvas.getContext("2d");

linjer();

function linjer(){
    for(i=1; i<40; i++){
    ctx.beginPath();
    ctx.moveTo(0,400);
    ctx.lineTo(10*i,0);
    ctx.strokeStyle = "white";
    ctx.stroke();
    

        ctx.beginPath();
        ctx.moveTo(400,400);
        ctx.lineTo(10*i,0);
        ctx.strokeStyle = "white";
        ctx.stroke();
        }
}