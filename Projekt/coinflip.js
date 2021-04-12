
var points = 100;
var wins = 0;
var losses = 0;
document.getElementById("points").innerHTML="Points: "+points;
document.getElementById("wins").innerHTML = "Wins: "+wins;
document.getElementById("losses").innerHTML = "Losses: "+losses;


function tossHeads(){
var image = new Array("Bilder/heads.png","Bilder/tails.png");
var randomImage = Math.floor(Math.random()*image.length);
document.getElementById("coin").src = image[randomImage];
if(randomImage==0){
    document.getElementById("res").innerHTML = "Heads<br>You Win 10 points";
    points+=10;
    document.getElementById("points").innerHTML="Points "+points;
    wins++;
    document.getElementById("wins").innerHTML = "Wins: "+wins;
}
else{
    document.getElementById("res").innerHTML = "Tails<br>You Loose 10 points";
    points-=10;
    document.getElementById("points").innerHTML="Points: "+points;
    losses++;
    document.getElementById("losses").innerHTML = "Losses: "+losses;
}
if(points<=0){
    alert("You are out of points");
    location.reload();
}
}

function tossTails(){
    var image = new Array("Bilder/heads.png","Bilder/tails.png");
    var randomImage = Math.floor(Math.random()*image.length);
    document.getElementById("coin").src = image[randomImage];
    if(randomImage==0){
        document.getElementById("res").innerHTML = "Heads<br>You Loose 10 points";
        points-=10;
        document.getElementById("points").innerHTML="Points: "+points;
        losses++;
        document.getElementById("losses").innerHTML = "Losses: "+losses;
    }
    else{
        document.getElementById("res").innerHTML = "Tails<br>You Win 10 points";
        points+=10;
        document.getElementById("points").innerHTML="Points: "+points;
        wins++;
        document.getElementById("wins").innerHTML = "Wins: "+wins;
    }
    if(points<=0){
        alert("You are out of points");
        location.reload();
    }
    }


