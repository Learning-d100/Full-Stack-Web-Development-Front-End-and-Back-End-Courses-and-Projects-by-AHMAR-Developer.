// pick value
function pick(val){
    document.getElementById("inputField").value += val;
}
// clear value
function clearField(){
    document.getElementById("inputField").value = "";
}
// calculate value
function calculate(){
    var x = document.getElementById("inputField").value;
    var y = eval(x);
    document.getElementById("inputField").value = y;
}