function myFunction() {
    var age = document.getElementById("age").value;
    var lname = document.getElementById("lname").value;
    var fname = document.getElementById("fname").value;
    if(age>17){
        document.getElementById("demo").innerHTML = "<p>Thank you " + fname + " " + lname + "! Your information has been noted.</p>";
    }
    else{
        document.getElementById("demo").innerHTML = "<p>We are sorry to tell you that you are a bit too young to work for us right now.</p>"
    }
    }