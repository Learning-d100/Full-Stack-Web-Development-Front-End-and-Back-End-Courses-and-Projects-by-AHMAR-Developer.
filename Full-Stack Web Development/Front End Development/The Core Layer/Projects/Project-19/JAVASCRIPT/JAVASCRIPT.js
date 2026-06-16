// DOM elements
const calculateFormEL = document.getElementById('calculate-form')
const resultEL = document.getElementById('result');
// Function to calculate marks and percentage
function calculateMarks(event) {
    event.preventDefault(); // Prevent form submission
    // Get input values
    const maths = parseFloat(document.querySelector('[name="maths"]').value);
    const english = parseFloat(document.querySelector('[name="english"]').value);
    const computerScience = parseFloat(document.querySelector('[name="computer science"]').value);
    const urdu = parseFloat(document.querySelector('[name="urdu"]').value);
    const physics = parseFloat(document.querySelector('[name="physics"]').value);
    const islamiyat = parseFloat(document.querySelector('[name="islamiyat"]').value);
    const alQuran = parseFloat(document.querySelector('[name="al-quran"]').value);
    // Calculate total mark
    const totalMarks = maths + english + computerScience + urdu + physics + islamiyat + alQuran;
    // Calculate percentage
    const percentage = (totalMarks / 445) * 100; // Total possible marks is 75*4 + 60*2 + 50*2 = 300 + 120 + 100 = 520 (Correction: 75*3 + 60*2 + 50*2 = 225 + 120 + 100 = 445)
    // Display result
    resultEL.textContent = `Total Marks: ${totalMarks.toFixed(2)} | Percentage: ${percentage.toFixed(2)}%`;
}
// Event listener for form submission
calculateFormEL.addEventListener('submit', calculateMarks);