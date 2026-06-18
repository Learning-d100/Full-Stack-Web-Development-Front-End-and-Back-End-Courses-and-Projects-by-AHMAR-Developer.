// Enforce "Strict Mode" which helps catch common coding bloopers and prevents the use of undeclared variables.
"use strict";
// ========================================
// 1. DOM ELEMENTS SELECTION & SETUP
// ========================================
// We use document.querySelector() method to select all the elements by their ID (#) we need to manipulate them.
let generateBox = document.querySelector("#generated-pass"); // The container where the final password will be displayed
let copyPass = document.querySelector("#copy"); // The "Copy" button (To copy the generated password)
let passLengthBox = document.querySelector("#pass-length-box"); // The number input field for password length
let passLengthRange = document.querySelector("#pass-length-range"); // The slider (range) input for password length
let uppercaseCheck = document.querySelector("#uppercase"); // Checkbox for uppercase letters
let lowercaseCheck = document.querySelector("#lowercase"); // Checkbox for lowercase letters
let numbersCheck = document.querySelector("#numbers"); // Checkbox for numbers
let symbolsCheck = document.querySelector("#symbols"); // Checkbox for symbols
let btnGenerate = document.querySelector("#generat-btn"); // The "Generate Password" button (To generate password)
// Initialize the password length based on whatever thq value is in the input field (current value)
let passLength = passLengthBox.value;
// ========================================
// 2. CHARACTER SET ARRAYS
// ========================================
// These arrays hold all the possible characters the password generator can pull from.
let upperCaseChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]; // uppercase
let lowerCaseChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // lowercase
let numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // numbers
let symbolChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "~", "`", "|", "{", "}", "[", "]", ":", ";", "<", ">", ",", ".", "/", "-"]; // symbols
// ========================================
// 3. EVENT LISTENERS: SYNCHRONIZING INPUTS
// ========================================
// These listeners ensure that if the user moves the slider, the number box updates, and vice versa.
passLengthBox.addEventListener("input", syncPassLength); // Input event listener for the number (Password Length) input field
passLengthRange.addEventListener("input", syncPassLength); // Input event listener for the range (Password Range) slider
// This function fires whenever either the range slider or the number box is changed.
function syncPassLength(e) {
    // e.target.value gets the current value of the element the user just interacted with
    passLengthBox.value = e.target.value;   // Update the number box
    passLengthRange.value = e.target.value; // Update the slider
    passLength = passLengthBox.value;       // Update our global variable that dictates the loop later
}// ========================================
// 4. HELPER FUNCTION: ADD TO DOM
// =========================================
// Takes the final generated array, joins it into a string, and adds it to the DOM (HTMl).
let addToDom = (newPass) => {
    // .join("") takes the array (e.g., ["A", "b", "3"]) and mashes it into a string (e.g., "Ab3")
    generateBox.innerHTML = newPass.join("");
}// =========================================
// 5. CORE LOGIC: THE PASSWORD GENERATOR
// ==========================================
// This function determines which characters are allowed, then randomly picks them until the desired length is reached.
let newPassGenerator = (isUpper, isLower, isNumber, isSymbol) => {
    let allValidChars = []; // This will act as our master pool of allowed characters
    // If a checkbox is checked (true), concatenate (add) its specific character array to our master pool
    if (isUpper == true) allValidChars = allValidChars.concat(upperCaseChars); // (Uppercase) If the first argument is true, add the first array to the master pool
    if (isLower == true) allValidChars = allValidChars.concat(lowerCaseChars); // (Lowercase) If the second argument is true, add the second array to the master pool
    if (isNumber == true) allValidChars = allValidChars.concat(numberChars); // (Numbers) If the third argument is true, add the third array to the master pool
    if (isSymbol == true) allValidChars = allValidChars.concat(symbolChars); // (Symbols) If the fourth argument is true, add the fourth array to the master pool
    let generatedPass = []; // An empty array to store the randomly selected characters
    let randIndex; // A variable to store a random index number we generate
    let i = passLength; // We set our loop counter to the user's chosen password length
    // Developer tool: Logs the master pool to the browser console for debugging
    console.log("allValidChars:", allValidChars);
    // Loop exactly 'i' times (where 'i' is the password length)
    while (i != 0) {
        // Generate a random index number based on the size of our master pool (allValidChars)
        // Math.random() gives a decimal between 0 and 1. We multiply by array length and use Math.floor to round down to a whole number.
        randIndex = Math.floor(Math.random() * allValidChars.length);
        // Take the character at that random index and add it to our final password array
        generatedPass = generatedPass.concat(allValidChars[randIndex]);
        // Developer tools: logs each step to the console
        console.log("randIndex:", randIndex);
        console.log("allValidChars[randIndex]:", allValidChars[randIndex]);
        console.log("generatedPass:", generatedPass);
        i--; // Decrease the loop counter by 1. Once it hit 0, the loop stops. 
    }// Call the helper function to display the result on the screen
    addToDom(generatedPass);
};// ========================================
// 6. EVENT LISTENER: BUTTON CLICKS
// ==========================================
// ---------- Generate Password Button ----------
btnGenerate.addEventListener("click", () => {
    // Validation: Check if ALL checkboxes are unchecked. 
    if (!uppercaseCheck.checked && !lowercaseCheck.checked && !numbersCheck.checked && !symbolsCheck.checked) {
        // If everything is unchecked, show the warning message (because we can't generate a password from nothing)
        document.getElementById("warning").style.display = "block";
    } else {
        // If at least one checkbox is checked, hide the warning message
        document.getElementById("warning").style.display = "none";
        // ...and run the generator, passing in the true/false state of all checkboxes.
        newPassGenerator(uppercaseCheck.checked, lowercaseCheck.checked, numbersCheck.checked, symbolsCheck.checked);
    }
});// ---------- Copy Button ----------
copyPass.addEventListener("click", (e) => {
    // Uses the modern clipboard API to copy the password to the clipboard
    window.navigator.clipboard.writeText(generateBox.innerHTML);
    // Show a visual "Copied!" confirmation message
    document.querySelector("#copied").style.display = "inline-block";
    // Set a timer to hide the "Copied!" message after 3000 milliseconds (3 seconds)
    setTimeout(() => {
        document.querySelector("#copied").style.display = "none";
    }, 3000);
});