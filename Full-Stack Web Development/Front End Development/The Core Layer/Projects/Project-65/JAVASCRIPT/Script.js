/*
================================================================================
🧮 SHINY & POWERFUL CALCULATOR ENGINE
================================================================================
This script manages the complete lifecycle of a modern calculator app. 
It controls:
  1. Responsive UI typography (text resizing to fit the screen)
  2. Transaction history panel (logging previous math equations)
  3. UI Theme Toggling (Dark mode vs. Light mode via CSS classes)
  4. Core arithmetic loops (handling decimals, percents, signs, and errors)
================================================================================
*/

/*
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 1. MEMORY & STATE MANAGEMENT                                           │
 * │ These variables track what is currently happening on the calculator's  │
 * │ display and preserve previous actions in memory.                       │
 * └────────────────────────────────────────────────────────────────────────┘
 */

let currentInput = "0"; // Holds the string value currently typed or displayed (defaults to "0")
let previousInput = null; // Remembers the first number in a multi-step calculation (e.g., the '5' in '5 + 3')
let operator = null; // Stores the active mathematical operator (+, -, *, /)
let resetScreen = false; // Flag: If true, the next typed number overwrites the screen rather than appending
let equationHistory = ""; // Formats the math expression shown in the upper sub-screen (e.g., "(5 * 3")
let savedHistory = []; // An array acting as a memory bank to store completed equations

/*
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 2. DOM SELECTORS                                                       │
 * │ Grabbing handle hooks on HTML elements so JavaScript can update them.  │
 * └────────────────────────────────────────────────────────────────────────┘
 */

const display = document.getElementById("display"); // Main display area for the current number
const expressionDisplay = document.getElementById("expression"); // Sub-display for running math equations
const clearBtn = document.getElementById("clearBtn"); // The All-Clear (AC) or Clear (C) button
const historyPanel = document.getElementById("historyPanel"); // Sliding container holding historical operations
const historyList = document.getElementById("historyList"); // The target container where history items are injected

/*
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 3. THEME TOGGLING ENGINE                                               │
 * │ SVG Icon definitions and logic to switch between Light & Dark themes.  │
 * └────────────────────────────────────────────────────────────────────────┘
 */

// SVG path markup representing a shiny Sun icon (for Dark Theme mode)
const sunIcon = `<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/></svg>`;

// SVG path markup representing a Crescent Moon icon (for Light Theme mode)
const moonIcon = `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`;

/**
 * Toggles the calculator's styling theme by altering document classes.
 */
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("themeIcon");

  // Toggle the '.light-mode' CSS class on the <body> tag
  body.classList.toggle("light-mode");

  // Switch icons depending on the newly activated state
  if (body.classList.contains("light-mode")) {
    themeBtn.innerHTML = moonIcon; // If light mode is active, display the Moon (to click for dark)
  } else {
    themeBtn.innerHTML = sunIcon; // If dark mode is active, display the Sun (to click for light)
  }
}

/*
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 4. HISTORY PANEL UI                                                    │
 * │ Controls the off-canvas panel to display previous calculation logs.    │
 * └────────────────────────────────────────────────────────────────────────┘
 */

/**
 * Slides open or closes the calculation history panel.
 */
function toggleHistory() {
  historyPanel.classList.toggle("open"); // Toggles 'open' class which triggers CSS transforms
}

/**
 * Adds a new equation string to the top of the history list.
 * @param {string} text - The formatted math expression (e.g., "(4+5 = 9)")
 */
function addHistoryItem(text) {
  savedHistory.unshift(text); // Inserts the newly calculated equation at index 0
  renderHistory(); // Repopulate the UI list
}

/**
 * Erases all entries from the history log.
 */
function clearHistory() {
  savedHistory = []; // Wipe the memory array
  renderHistory(); // Repopulate the UI list (shows empty state)
}

/**
 * Generates and updates the HTML for the history side panel.
 */
function renderHistory() {
  // If no calculations have been run, display a placeholder message
  if (savedHistory.length === 0) {
    historyList.innerHTML = '<div class="history-empty">No history yet</div>';
    return;
  }

  // Clear the existing list items to avoid duplicate renders
  historyList.innerHTML = "";

  // Loop through each calculation in history and append it as a styled DOM node
  savedHistory.forEach((item) => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerText = item;
    historyList.appendChild(div);
  });
}

/*
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 5. UTILITY & FORMATTING FUNCTIONS                                      │
 * │ Handles dynamic font sizes, visual commas, and mathematical symbols.  │
 * └────────────────────────────────────────────────────────────────────────┘
 */

/**
 * Formats flat string numbers into thousands-separated comma values.
 * @param {string} numStr - The raw numeric string (e.g., "1250000")
 * @returns {string} - Formatted string (e.g., "1,250,000")
 */
function formatNumber(numStr) {
  // Avoid attempting to format errors or non-numerical values
  if (!numStr || numStr === "Error" || numStr === "NaN") return numStr;

  let parts = numStr.split("."); // Split string into whole numbers and decimal values

  // Regex insertion of commas at standard thousand boundaries
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join("."); // Re-attach decimal points if they exist
}

/**
 * Simple converter returning standard mathematical symbol representations.
 */
function getOperatorSymbol(op) {
  if (op === "/") return "/";
  if (op === "*") return "*";
  if (op === "-") return "-";
  if (op === "+") return "+";
  return "";
}

/**
 * Dynamically shrinks the text size as number length expands to prevent overflow.
 */
function adjustFontSize() {
  const len = display.innerText.length;
  const isMobile = window.innerWidth < 480;

  // Determine starting baseline font size based on current view width (Responsive styling)
  let baseSize = isMobile ? window.innerWidth * 0.2 : 78;

  if (len > 6) {
    // Drop the font size proportionally for every character typed beyond 6 digits
    let newSize = baseSize - (len - 6) * 7.5;
    if (newSize < 35) newSize = 35; // Don't let it shrink to unreadable levels (< 35px)
    display.style.fontSize = newSize + "px";
  } else {
    display.style.fontSize = ""; // Use the default size specified in CSS stylesheets
  }
}

/**
 * Synchronizes JavaScript memory variables with the physical screen displays.
 */
function updateDisplay() {
  let rawString = currentInput;

  // Restrict screen output to 9 digits max to prevent screen breakage (unless it's scientific notation)
  if (rawString.length > 9 && !rawString.includes("e")) {
    rawString = rawString.substring(0, 9);
  }

  display.innerText = formatNumber(rawString); // Display formatted value
  expressionDisplay.innerText = equationHistory; // Display running sub-expression formula

  // Context-aware Clear Key: Show "AC" if calculator is empty, else "C" to clear current line
  clearBtn.innerText =
    currentInput === "0" && previousInput === null ? "AC" : "C";

  adjustFontSize(); // Re-calculate text bounds
}

/*
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 6. INPUT HANDLING & OPERATIONS                                         │
 * │ Controls how keypress clicks stream into the calculator's engine.      │
 * └────────────────────────────────────────────────────────────────────────┘
 */

/**
 * Orchestrates when a number or a decimal point button is clicked.
 * @param {string} num - The typed character ("0"-"9" or ".")
 */
function handleNumber(num) {
  // Scenario A: Overwriting screen if active value is 0 or we just hit an operator
  if (currentInput === "0" || resetScreen) {
    currentInput = num === "." ? "0." : num;
    resetScreen = false;

    // Clear display expression if typing new calculation directly after striking equals ('=')
    if (equationHistory.includes("=")) {
      equationHistory = "";
    }
  } else {
    // Scenario B: Input validation and concatenation rules
    if (num === "." && currentInput.includes(".")) return; // Prevent double decimals (e.g. "9.8.2")
    if (currentInput.replace(".", "").length >= 9) return; // Enforce maximum numeric length limits

    currentInput += num; // Concatenate typed key onto our active working string
  }
  updateDisplay();
}

/**
 * Removes active highlighting outline from all colored operator buttons.
 */
function clearOperatorFocus() {
  document
    .querySelectorAll(".btn-orange")
    .forEach((b) => b.classList.remove("active-operator"));
}

/**
 * Directs logical operations when math buttons (+, -, *, /) are struck.
 * @param {string} op - Operator code selected
 * @param {HTMLElement} btn - The DOM element of the button selected
 */
function handleOperator(op, btn) {
  clearOperatorFocus();
  if (btn) btn.classList.add("active-operator"); // Highlight active operation

  // Chain multiple operations continuously without hitting equals (e.g., "5 + 5 + 5")
  if (operator !== null && !resetScreen) {
    calculate(false); // Calculates background step but postpones showing final result
  }

  previousInput = currentInput; // Cache current string as original operand
  operator = op; // Store selected operation
  resetScreen = true; // Ready screen to rewrite upon next number strike
  equationHistory = `(${formatNumber(previousInput)}${getOperatorSymbol(op)}`; // Format sub-display
  updateDisplay();
}

/*
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 7. MATH CALCULATIONS ENGINE                                            │
 * │ Processes current and previous memory registers using arithmetic laws. │
 * └────────────────────────────────────────────────────────────────────────┘
 */

/**
 * Compiles stored expressions and solves the math equation.
 * @param {boolean} isEquals - Specifies if action is finalizing total ("=") or routing next operation
 */
function calculate(isEquals = true) {
  // Exit quickly if calculations are empty or don't have secondary operands
  if (operator === null || previousInput === null) return;

  let result;
  const prev = parseFloat(previousInput); // Convert first operand to float
  const current = parseFloat(currentInput); // Convert second operand to float

  if (isNaN(prev) || isNaN(current)) return; // Safety boundary checks

  // Arithmetic Routing Switch
  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      // Division-by-Zero Protection
      if (current === 0) {
        currentInput = "Error";
        operator = null;
        previousInput = null;
        equationHistory = "";
        resetScreen = true;
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
  }

  // Floating-point precision fix: Rounds down weird floating anomalies (like 0.1 + 0.2 = 0.300000004)
  const finalResultStr = String(Math.round(result * 100000000) / 100000000);

  if (isEquals) {
    // If user clicked Equals (=), build completed equation format string
    const fullEquation = `(${formatNumber(previousInput)}${getOperatorSymbol(operator)}${formatNumber(String(current))} = ${formatNumber(finalResultStr)})`;
    equationHistory = fullEquation;

    addHistoryItem(fullEquation); // Save completed equation to local history panel
    clearOperatorFocus(); // Turn off button highlight states
    operator = null; // Clear working memory
    previousInput = null;
  } else {
    // If running in background chain (e.g. "5 + 5 + ..."), build open formula notation
    equationHistory = `(${formatNumber(finalResultStr)}${getOperatorSymbol(operator)}`;
  }

  currentInput = finalResultStr; // Transfer calculated result into display view
  resetScreen = true; // Mark screen ready to receive next inputs
  updateDisplay();
}

/**
 * Handles action buttons such as Clear (C/AC), sign flips (+/-), or percentage divisions (%).
 * @param {string} action - Event type being dispatched
 */
function handleAction(action) {
  if (action === "clear") {
    currentInput = "0"; // Soft reset: Clears only the current numeric display typing line

    // Hard Reset (All-Clear): If screen is already zeroed, clear operations memory completely
    if (clearBtn.innerText === "AC") {
      previousInput = null;
      operator = null;
      equationHistory = "";
    }
  } else if (action === "sign") {
    // Reverses numeric state (Positive to Negative / Negative to Positive)
    if (currentInput !== "0" && currentInput !== "Error") {
      currentInput = String(parseFloat(currentInput) * -1);
    }
  } else if (action === "percent") {
    // Divides active input by 100
    if (currentInput !== "Error") {
      currentInput = String(parseFloat(currentInput) / 100);
    }
  }
  updateDisplay();
}

/*
 * ┌────────────────────────────────────────────────────────────────────────┐
 * │ 8. EVENT LISTENERS                                                     │
 * │ Binds global browser interactions back into JavaScript procedures.     │
 * └────────────────────────────────────────────────────────────────────────┘
 */

// Dynamically scale display fonts when viewport dimensions change
window.addEventListener("resize", adjustFontSize);
