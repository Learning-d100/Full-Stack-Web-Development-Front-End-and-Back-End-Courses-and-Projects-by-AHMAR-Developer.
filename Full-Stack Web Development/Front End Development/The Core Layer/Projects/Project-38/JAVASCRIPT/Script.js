// Enforces strict mode to catch common coding mistakes and prevent unsafe actions (e.g., declaring global variables accidentally)
"use strict";
// --- GAME STATE VARIABLES ---
// Tracks whose turn it is. 1 = Player One, 2 = Player Two. Starts with Player One.
let player = 1;
// Boolean flag to track if Player One has won the game.
let p1Winner = false;
// Boolean flag to track if Player Two has won the game.
let p2Winner = false;
// --- DOM ELEMENT SELECTION ---
// Selects the HTML element displaying the current turn or match outcome status (e.g., "first player", "player one won !")
let playerTitle = document.querySelector(".player-title");
// NOTE: These two variables (icon1 and icon2) are declared but never actually used later in the script.
let icon1 = "<img src='../ICONS/icon1.png' alt='player sign' />";
let icon2 = "<img src='../ICONS/icon2.png' alt='player sign' />";
// Selects all board grid elements with the class ".boxes" (used later in resetGame)
let boxes = document.querySelectorAll(".boxes");
// Individual selections for each of the 9 Tic-Tac-Toe grid slots to read their attributes during win checks
let box1 = document.querySelector(".box1");
let box2 = document.querySelector(".box2");
let box3 = document.querySelector(".box3");
let box4 = document.querySelector(".box4");
let box5 = document.querySelector(".box5");
let box6 = document.querySelector(".box6");
let box7 = document.querySelector(".box7");
let box8 = document.querySelector(".box8");
let box9 = document.querySelector(".box9");
// --- EVENT LISTENERS FOR GRID CLICK ---
// Re-selects all elements with the class ".boxes" to attach event listeners
let allBoxes = document.querySelectorAll(".boxes");
// Loops through every box on the board to listen for user interaction
allBoxes.forEach((box) => {
	box.addEventListener("click", () => {// Logs a true/false value to the console checking if the box is currently empty
		console.log(box.innerHTML == "");
		// Conditional check: Runs only if the box has no HTML content (prevents overriding an already played box)
		if (!box.innerHTML) {// 1. Places the current player's image and assigns their identification value to the box's attributes
			putPlayerSign(box);
			// 2. Swaps the turn value (e.g., changes player state from 1 to 2)
			changePlayer();
			// 3. Evaluates if the move resulted in a win pattern
			checkWinner();
		}
	});
});// --- RESET BUTTON SYSTEM ---
// Selects the container/button with class ".gameplay-div" to handle game reset functionality
let resetBtn = document.querySelector(".gameplay-div");
// Attaches a click event listener that triggers the resetGame function
resetBtn.addEventListener("click", resetGame);
// --- GAME LOGIC FUNCTIONS ---
/*Alternates the active player turn value and updates the visible status text.*/
function changePlayer() {
	if (player == 1) {
		player = 2; // Handover turn to Player Two
		playerTitle.innerHTML = "second player"; // Update UI text
	} else if (player == 2) {
		player = 1; // Handover turn to Player One
		playerTitle.innerHTML = "first player"; // Update UI text
	}
}/*Marks the clicked box with data belonging to the player who just claimed it.@param {HTMLElement} clickedBox - The specific DOM element grid square that was clicked.*/
function putPlayerSign(clickedBox) {// Sets a custom HTML data attribute "data-a" equal to the current player's number ("1" or "2")
	clickedBox.setAttribute("data-a", player);
	// Dynamically inserts the player's corresponding image token right inside the box elementNote: The code contains a hidden non-breaking space typo (`img  class`) but acts to render the image
	clickedBox.insertAdjacentHTML("beforeEnd", `<img  class="1" src='../ICONS/icon${player}.png' alt='player sign' />`);
}/* Checks all 8 possible winning combinations (3 horizontal, 3 vertical, 2 diagonal).Crucial Logic Note: Because changePlayer() is executed BEFORE checkWinner() in the event loop, the 'player' variable has already swapped. Therefore, if three matching values belong to Player 1,  the active 'player' variable is now 2, and vice-versa.*/
function checkWinner() {// Combination 1: Top Horizontal Row (Box 1, 2, 3)
	if (box1.getAttribute("data-a") == box2.getAttribute("data-a") && box2.getAttribute("data-a") == box3.getAttribute("data-a")) {
		if (player == 1) p2Winner = true; // If currently player 2's turn, player 1 made the matching move
		else if (player == 2) p1Winner = true;
	// Combination 2: Middle Horizontal Row (Box 4, 5, 6)
	} else if (box4.getAttribute("data-a") == box5.getAttribute("data-a") && box5.getAttribute("data-a") == box6.getAttribute("data-a")) {
		if (player == 1) p2Winner = true;
		else if (player == 2) p1Winner = true;
	// Combination 3: Bottom Horizontal Row (Box 7, 8, 9)
	} else if (box7.getAttribute("data-a") == box8.getAttribute("data-a") && box8.getAttribute("data-a") == box9.getAttribute("data-a")) {
		if (player == 1) p2Winner = true;
		else if (player == 2) p1Winner = true;
	// Combination 4: Left Vertical Column (Box 1, 4, 7)
	} else if (box1.getAttribute("data-a") == box4.getAttribute("data-a") && box4.getAttribute("data-a") == box7.getAttribute("data-a")) {
		if (player == 1) p2Winner = true;
		else if (player == 2) p1Winner = true;
	// Combination 5: Middle Vertical Column (Box 2, 5, 8)
	} else if (box2.getAttribute("data-a") == box5.getAttribute("data-a") && box5.getAttribute("data-a") == box8.getAttribute("data-a")) {
		if (player == 1) p2Winner = true;
		else if (player == 2) p1Winner = true;
	// Combination 6: Right Vertical Column (Box 3, 6, 9)
	} else if (box3.getAttribute("data-a") == box6.getAttribute("data-a") && box6.getAttribute("data-a") == box9.getAttribute("data-a")) {
		if (player == 1) p2Winner = true;
		else if (player == 2) p1Winner = true;
	// Combination 7: Diagonal Down-Right (Box 1, 5, 9)
	} else if (box1.getAttribute("data-a") == box5.getAttribute("data-a") && box5.getAttribute("data-a") == box9.getAttribute("data-a")) {
		if (player == 1) p2Winner = true;
		else if (player == 2) p1Winner = true;
	// Combination 8: Diagonal Up-Right (Box 3, 5, 7)
	} else if (box3.getAttribute("data-a") == box5.getAttribute("data-a") && box5.getAttribute("data-a") == box7.getAttribute("data-a")) {
		if (player == 1) p2Winner = true;
		else if (player == 2) p1Winner = true;
	}// --- RENDER WINNER STATUS ---
	// If the flag for Player 1 winning is true, change status text to celebrate player one
	if (p1Winner == true) {
		playerTitle.innerHTML = "player one won !";
	// If the flag for Player 2 winning is true, change status text to celebrate player two
	} else if (p2Winner == true) {
		playerTitle.innerHTML = "player two won !";
	}
}/*Resets the entire game state back to initial conditions so players can play again.*/
function resetGame() {
	player = 1;         // Set active player back to Player One
	p1Winner = false;   // Clear victory flag for Player One
	p2Winner = false;   // Clear victory flag for Player Two
	playerTitle.innerHTML = "first player"; // Reset visual turn text
	// Clear out visual images inside the grid elements
	boxes.forEach((box) => {
		box.innerHTML = "";
	});// IMPORTANT LOGIC: Sets every box's "data-a" attribute to completely unique numerical strings (3 through 11).
	// This prevents the checkWinner() function from seeing blank or identical starting values as a valid matching row!
	box1.setAttribute("data-a", "3");
	box2.setAttribute("data-a", "4");
	box3.setAttribute("data-a", "5");
	box4.setAttribute("data-a", "6");
	box5.setAttribute("data-a", "7");
	box6.setAttribute("data-a", "8");
	box7.setAttribute("data-a", "9");
	box8.setAttribute("data-a", "10");
	box9.setAttribute("data-a", "11");
}