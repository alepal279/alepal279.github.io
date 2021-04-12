function responsive(){
    var x = document.getElementById("menu");
    if(x.className==="menu"){
        x.className += " responsive"
    } else{
        x.className = "menu"
    }
    docmuent.getElementById("h1").innerHTML = "test";
    
}