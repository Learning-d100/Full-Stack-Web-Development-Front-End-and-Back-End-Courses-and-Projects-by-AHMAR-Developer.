function check(){
   let num1 = parseInt(document.getElementById("number1").value);
    let num2 = parseInt(document.getElementById("number2").value);
    let num3 = parseInt(document.getElementById("number3").value);
    let num4 = parseInt(document.getElementById("number4").value);
    let num5 = parseInt(document.getElementById("number5").value);
    let total = num1 + num2 + num3 + num4 + num5;
    let perc = (total * 100 / 500);
    document.getElementById("data1").innerHTML = "Total Marks = " + total;
    document.getElementById("data2").innerHTML = "Percentage = " + perc + " % ";
if (perc >= 90) {
    document.getElementById("data3").innerHTML = "Grade = A+ " + perc + " %";
}
else if (perc >= 60) {
    document.getElementById("data3").innerHTML = "Grade = A " + perc + " % ";
}
else if (perc >= 45) {
    document.getElementById("data3").innerHTML = "Grade = B " + perc + " % ";
}
else if(perc >= 33) {
    document.getElementById("data3").innerHTML = "Grade = C " + perc + " % ";
}
else{
    document.getElementById("data3").innerHTML = "Grade = Fail " + perc + " % ";
}
}