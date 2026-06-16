// show right angle triangle star pattern below
function generateRightAnglePattern() {
    let rightAngleStarPattern = "";
    let a = document.getElementById("number1").value;
    for (i = 1; i <= a; i++) {
        for (j = 1; j <= i; j++){
            rightAngleStarPattern += " * ";
        }
        rightAngleStarPattern += " <br>";
    }
    document.getElementById("rightAngleStarPattern").innerHTML = rightAngleStarPattern;
}
// Mirror Right Angle Star Pattern
function generateMirrorRightAnglePattern() {
    let mirrorRightAngleStarPattern = "";
    let b = document.getElementById("number2").value;
    for (k = b; k >= 1; k--) {
        for (j = 1; j < k; j++){
            mirrorRightAngleStarPattern += " &nbsp; ";
        }
        for (l = b; l >=k; l--){
            mirrorRightAngleStarPattern += " * ";
        }
        mirrorRightAngleStarPattern += " <br>";
    }
    document.getElementById("mirrorRightAngleStarPattern").innerHTML = mirrorRightAngleStarPattern;
}
// Inverted Right Angle Star Pattern
function generateInvertedRightAnglePattern() {
    let invertedRightAngleStarPattern = "";
    let c= document.getElementById("number3").value;
    for (m = c; m >= 1; m--) {
        for (n = 1; n <= m; n++){
            invertedRightAngleStarPattern += " * ";
        }
        invertedRightAngleStarPattern += " <br>";
    }
    document.getElementById("invertedRightAngleStarPattern").innerHTML = invertedRightAngleStarPattern;
}
// Inverted Mirror Right Angle Star Pattern
function generateInvertedMirrorRightAnglePattern() {
    let invertedMirrorRightAngleStarPattern = "";
    let d = document.getElementById("number4").value;
    for (o = 1; o <= d; o++) {
        for (p = 1; p < o; p++){
            invertedMirrorRightAngleStarPattern += " &nbsp; ";
        }
        for (q = d; q >=o; q--){
            invertedMirrorRightAngleStarPattern += " * ";
        }
        invertedMirrorRightAngleStarPattern += " <br>";
    }
    document.getElementById("invertedMirrorRightAngleStarPattern").innerHTML = invertedMirrorRightAngleStarPattern;
}
// pyramid star pattern
function generatePyramidStarPattern() {
    let pyramidStarPattern = "";
    let e = document.getElementById("number5").value;
    for (r = 1; r <= e; r++) {
        for (s = 1; s <= e - r; s++){
            pyramidStarPattern += " &nbsp; ";
        }
        for (t = 1; t <= 2 * r - 1; t++){
            pyramidStarPattern += " * ";
        }
        pyramidStarPattern += " <br>";
    }
    document.getElementById("pyramidStarPattern").innerHTML = pyramidStarPattern;
}

// inverted pyramid star pattern
function generateInvertedPyramidStarPattern() {
    let invertedPyramidStarPattern = "";
    let f = document.getElementById("number6").value;
    for (u = 1; u <= f; u++) {
        for (v = 1; v <= u - 1; v++){
            invertedPyramidStarPattern += " &nbsp; ";
        }
        for (w = 1; w <= 2 * (f - u) + 1; w++){
            invertedPyramidStarPattern += " * ";
        }
        invertedPyramidStarPattern += " <br>";
    }
    document.getElementById("invertedPyramidStarPattern").innerHTML = invertedPyramidStarPattern;
}
// Hollow Square Star Pattern
function generateHollowSquareStarPattern() {
    let hollowSquareStarPattern = "";
    let g = document.getElementById("number7").value;
    for (x = 1; x <= g; x++) {
        for (y = 1; y <= g; y++){
            if (x === 1 || x === g || y === 1 || y === g){
                hollowSquareStarPattern += " * ";
            } else {
                hollowSquareStarPattern += " &nbsp; &nbsp; ";
            }
        }
        hollowSquareStarPattern += " <br>";
    }
    document.getElementById("hollowSquareStarPattern").innerHTML = hollowSquareStarPattern;
}
// Rhombus Star Pattern
function generateRhombusStarPattern() {
    let rhombusStarPattern = "";
    let h = document.getElementById("number8").value;
    for (z = 1; z <= h; z++) {
        for (x = 1; x <= h - z; x++){
            rhombusStarPattern += " &nbsp; ";
        }
        rhombusStarPattern += "";
        for (y = 1; y <= h; y++){
            rhombusStarPattern += " * ";
        }
        rhombusStarPattern += " <br>";
    }   
    document.getElementById("rhombusStarPattern").innerHTML = rhombusStarPattern;
}
// Hollow Pyramid Star Pattern
function generateHollowPyramidStarPattern() {
    let hollowPyramidStarPattern = "";
    let i = document.getElementById("number9").value;
    for (j = 1; j <= i; j++) {
        for (k = 1; k <= i - j; k++){
            hollowPyramidStarPattern += " &nbsp; ";
        }
        for (l = 1; l <= 2 * j - 1; l++){
            if (l === 1 || l === 2 * j - 1){
                hollowPyramidStarPattern += " * ";
            } else {
                hollowPyramidStarPattern += " &nbsp; &nbsp; ";
            }
        }
        hollowPyramidStarPattern += " <br>";
    }
    document.getElementById("hollowPyramidStarPattern").innerHTML = hollowPyramidStarPattern;
}