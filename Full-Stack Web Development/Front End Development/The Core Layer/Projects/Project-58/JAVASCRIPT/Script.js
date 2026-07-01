      // variables

      let count = parseInt(localStorage.getItem("savedCount")) || 0;

      const counterDisplay = document.getElementById("counter-display");
      const plusBtn = document.getElementById("plusBtn");
      const minusBtn = document.getElementById("minusBtn");
      const resetButton = document.getElementById("reset-button");

      function updateCount() {
        localStorage.setItem("savedCount", count);
        counterDisplay.innerText = count;

        if (count < 0) {
          counterDisplay.style.color = "var(--red)";
        } else {
          counterDisplay.style.color = "#fff";
        }
      }

      // Addition function
      plusBtn.addEventListener("click", () => {
        count++;
        updateCount();
      });

      // Subtraction function
      minusBtn.addEventListener("click", () => {
        count--;
        updateCount();
      });

      // Reset function
      resetButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset the Counter?") == true) {
          count = 0;
          updateCount();
        }
      });

      updateCount();