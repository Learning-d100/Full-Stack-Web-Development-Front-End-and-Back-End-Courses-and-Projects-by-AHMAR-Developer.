// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.textContent.trim();

      if (buttonText === "C") {
        // Clear the display completely
        display.value = "";
      } else if (buttonText === "=") {
        // Evaluate the math expression safely
        try {
          if (display.value.trim() !== "") {
            // Function() is a cleaner, slightly safer alternative to eval() for basic math strings
            const result = Function(
              `"use strict"; return (${display.value})`,
            )();

            // Handle cases like division by zero resulting in Infinity
            if (result === Infinity || result === -Infinity) {
              display.value = "Error";
            } else {
              display.value = result;
            }
          }
        } catch (error) {
          // If the user inputs an invalid expression (like "7++5"), show Error
          display.value = "Error";
        }
      } else {
        // If the screen currently shows "Error", clear it before typing a new number
        if (display.value === "Error") {
          display.value = "";
        }

        // Append the clicked button's value to the display
        display.value += buttonText;
      }
    });
  });

  // Optional: Allow users to press 'Enter' on their keyboard to calculate when focused on the input
  display.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const equalButton = Array.from(buttons).find(
        (btn) => btn.textContent.trim() === "=",
      );
      if (equalButton) equalButton.click();
    }
  });
});
