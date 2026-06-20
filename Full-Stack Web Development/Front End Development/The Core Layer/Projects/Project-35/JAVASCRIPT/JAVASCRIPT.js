/* "use strict" prevents the use of undeclared variables and makes code safer */
"use strict";
/* ---------- EVENT LISTENERS ---------- */
// Select All Elements with the class 'key' (all calculator buttons)
let keys = document.querySelectorAll(".key");
// Loop through each button and attach a click event listener
keys.forEach((key) => {
    key.addEventListener("click", (e) => {
        // When clicked, pass the text inside the button to the main logic function
        calcBoxGenerator(e.target.innerText);
    });
});// Attach a listener to the whole window to allow keyboard typing
window.addEventListener("keydown", (e) => {
    // Pass the pressed keyboard key to the main logic function
    calcBoxGenerator(e.key);
});/** ---------- STATE VARIABLES ---------- */
// Reference to the display screen element
let calcBox = document.querySelector(".calc-box");
let clickedKey; // Used to store the current key pressed
let numbers = []; // Array to hold the finalized numbers to calculate
let operators = []; // Array to hold the operators used in the calculation (-, +, etc.)
let tempNum = ""; // A string buffer to build multi-digit numbers (e.g., "1", then "2" becomes "12")
let answer; // Stores the final calculated result
/** ---------- MAIN LOGIC ---------- */
function calcBoxGenerator(clickedKey) {
    // 1. Handle Deletion and Clearing
    if (clickedKey == "back" || clickedKey == "C" || clickedKey == "Delete" || clickedKey == "Backspace") {
        // "C" or "Delete" completely resets the calculator state
        if (clickedKey == "C" || clickedKey == "Delete") {
            calcBox.innerHTML = "";
            numbers = [];
            operators = [];
            tempNum = "";
            answer = null;
        } // "back" or "Backspace" deletes the last entered digit
        else if (clickedKey == "back" || clickedKey == "Backspace") {
            // Only allow backspace if we haven't already solved the equation
            if (!answer) {
                tempNum = tempNum.slice(0, tempNum.length - 1);
                calcBox.innerHTML = calcBox.innerHTML.slice(0, calcBox.innerHTML.length - 1);
            }
        }
    }// 2. handle Inputs (Numbers & Operators)
    else {
        // If the user clicks an operator:
        if (clickedKey == "+" || clickedKey == "-" || clickedKey == "*" || clickedKey == "/" || clickedKey == "%" || clickedKey == "÷" || clickedKey == "x") {
            // Push the current built-up number to the numbers array
            numbers.push(Number(tempNum));
            tempNum = ""; // Reset the temporary number string for the next number
            // Push the operator to the operators array
            operators.push(clickedKey);
            // Update the screen display
            calcBox.insertAdjacentHTML("beforeend", clickedKey);
            // Changing operations: If there's already an answer, use it as the first number for next equation
            if (answer) {
                calcBox.innerHTML = "";
                calcBox.insertAdjacentHTML("beforeend", clickedKey);
                numbers = [answer]; // Start new calculation array with previous answer
                operators = [clickedKey]; // Start new operator array with new operators
                answer = null; // Reset the answer variables
            }
        }// If the user clicks Equals
        else if (clickedKey == "=" || clickedKey == "Enter"){
            // Push the very last number entered into the array
            numbers.push(Number(tempNum));
            tempNum = ""; // Reset the temporary number string for the next number
            // Pass the arrays to the calculator engine function
            answer = calculator(numbers, operators);
            // Append results to the screen
            calcBox.insertAdjacentHTML("beforeend", ` = ${answer}`); 
        }// If user clicks a Number (or a decimal point)
        else if (clickedKey >= "0" && clickedKey <= 9) {
            // Append the number to the temporary number string
            tempNum = tempNum.concat(clickedKey);
            // If they start typing a new number immediately after getting an answer, reset the calculator
            if (answer) {
                calcBox.innerHTML = "";
                numbers = []; // Start new calculation array
                operators = []; // Start new operator array with new operators
                answer = null; // Reset the answer variables
            }
            // Update the screen display
            calcBox.insertAdjacentHTML("beforeend", clickedKey);
        }
    }
}/* ---------- CALCULATOR ENGINE ---------- */
// This function processes the arrays of numbers and operators to find the final result
function calculator(nums, oprs) {
    let i = 0;
    let op;
    // Use the array.reduce method to process the calculation strictly left-to-right.
    // Note: This implementation processes calculations sequentially (e.g., 2 + 3 * 4 = 20) 
    // and does not follow strict order of operations (PEMDAS/BODMAS).
    let answer = nums.reduce(function (prevValue, currentValue) {
        op = oprs[i++]; // Get the next operator
        // Perform the matching mathematical operation
        if (op == "x" || op == "*") return prevValue * currentValue;
        else if (op == "%") return prevValue % currentValue;
        else if (op == "+") return prevValue + currentValue;
        else if (op == "-") return prevValue - currentValue;
        else if (op == "÷" || op == "/") return prevValue / currentValue;
        else return "none";
    });// Return the final result
    return answer; 
}