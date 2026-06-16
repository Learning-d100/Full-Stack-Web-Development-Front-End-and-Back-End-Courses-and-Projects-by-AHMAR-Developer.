// Square finder
function square(){
    let num = document.getElementById("squareInput").value;
    document.getElementById("square-result").innerHTML  = ("Square of " + num + " = " + (num * num));
}
// Cube finder
function cube(){
    let num = document.getElementById("cubeInput").value;
    document.getElementById("cube-result").innerHTML  = ("Cube of " + num + " = " + (num * num * num));
}