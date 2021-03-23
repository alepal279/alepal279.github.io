
var points = 100;
document.getElementById("points").innerHTML="points: "+points;


function tossHeads(){
var image = new Array("Bilder/heads.png","Bilder/tails.png");
var randomImage = Math.floor(Math.random()*image.length);
document.getElementById("coin").src = image[randomImage];
if(randomImage==0){
    document.getElementById("res").innerHTML = "You Win";
    points+=10;
    document.getElementById("points").innerHTML="points "+points;
}
else{
    document.getElementById("res").innerHTML = "You Loose";
    points-=10;
    document.getElementById("points").innerHTML="points: "+points;
}
}

function tossTails(){
    var image = new Array("Bilder/heads.png","Bilder/tails.png");
    var randomImage = Math.floor(Math.random()*image.length);
    document.getElementById("coin").src = image[randomImage];
    if(randomImage==0){
        document.getElementById("res").innerHTML = "You Loose";
        points-=10;
        document.getElementById("points").innerHTML="points: "+points;
    }
    else{
        document.getElementById("res").innerHTML = "You Win";
        points+=10;
        document.getElementById("points").innerHTML="points: "+points;
    }
    }