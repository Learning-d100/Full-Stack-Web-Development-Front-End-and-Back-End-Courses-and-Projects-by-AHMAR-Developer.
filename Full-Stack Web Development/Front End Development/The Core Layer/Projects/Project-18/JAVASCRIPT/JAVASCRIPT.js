// DOM Elements
const slider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const generateBtn = document.getElementById('generate-trigger');
const passwordDisplay = document.getElementById('password-display');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
// Character Sets
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]\:;?><,./-='
};
// Synchronize Slider text label dynamically
slider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});
// Core Password Generation Routine
function generatePassword() {
    let allowedChars = '';
    let mandatoryChars = [];
    // Evaluate configuration and compile active character library
    if (uppercaseCheck.checked) {
        allowedChars += charSets.uppercase;
        mandatoryChars.push(charSets.uppercase[Math.floor(Math.random() * charSets.uppercase.length)]);
    }
    if (lowercaseCheck.checked) {
        allowedChars += charSets.lowercase;
        mandatoryChars.push(charSets.lowercase[Math.floor(Math.random() * charSets.lowercase.length)]);
    }
    if (numbersCheck.checked) {
        allowedChars += charSets.numbers;
        mandatoryChars.push(charSets.numbers[Math.floor(Math.random() * charSets.numbers.length)]);
    }
    if (symbolsCheck.checked) {
        allowedChars += charSets.symbols;
        mandatoryChars.push(charSets.symbols[Math.floor(Math.random() * charSets.symbols.length)]);
    }
    // Error Prevention: Ensure at least one parameter is selected
    if (allowedChars === '') {
        passwordDisplay.value = 'Select at least 1 option!';
        return;
    }
    const totalLength = parseInt(slider.value);
    let generatedPassword = [...mandatoryChars];
    // Fill up remaining slots with entirely random pooling selection
    for (let i = generatedPassword.length; i < totalLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        generatedPassword.push(allowedChars[randomIndex]);
    }
    // Shuffle the array elements to break structure uniformity
    generatedPassword = generatedPassword.sort(() => Math.random() - 0.5);
    // Print string output to display element
    passwordDisplay.value = generatedPassword.join('');
}
// Action binding
generateBtn.addEventListener('click', generatePassword);