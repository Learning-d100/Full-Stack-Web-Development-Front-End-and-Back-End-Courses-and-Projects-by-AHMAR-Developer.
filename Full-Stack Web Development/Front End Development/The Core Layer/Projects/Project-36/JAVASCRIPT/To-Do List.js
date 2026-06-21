"use strict"; // Enforces stricter parsing and error handling in JavaScript
// / Variable declarations targeting specific HTML elements by their IDs or Classes
let newTodoBtn = document.querySelector("#new-todo"); // The main "Add a new ToDo" button
let popupsSection = document.querySelector("#popups"); // The semi-transparent overlay
let todoPopup = document.querySelector("#newtodo-popup"); // The actual form box
let closePopupBtn = document.querySelectorAll(".close-popup-btn"); // The "X" image (using querySelectorAll incase there are multiple)
let todoSubmitBtn = document.querySelector("#todo-submit"); // The "Add to list" submit button inside the form
let newTodoTitle = document.querySelector("#newtodo-title"); // The input text box
let todoList = document.querySelector(".todo-list"); // The empty container where to-dos will be injected
// Opens the popup modal when the "Add a new ToDo" button is clicked
newTodoBtn.addEventListener("click", () => {
    popupsSection.style.display = "flex"; // Unhides the overlay by changing display from 'none' to 'flex'
    todoPopup.style.display = "flex"; // Unhides the form box
});// Loops through all close buttons (even though there's only one) and attaches the close function
closePopupBtn.forEach((closeBtn) => {
    closeBtn.addEventListener("click", closePopup);
});// Function to hide the popup by resetting display styles back to 'none'
function closePopup() {
    popupsSection.style.display = "none";
    todoPopup.style.display = "none";
}// Listens for the form submission
todoSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevents the form from refreshing the page, which is the default browser behavior
    if (newTodoTitle.value.trim() === "") return; // Stops the function early if the input is completely empty or just spaces
    todoToDom(newTodoTitle.value); // Calls the function to visually display the new task
    addTodoTolocalStorage(newTodoTitle.value); // Calls the function to save the task in the browser's memory
    newTodoTitle.value = ""; // Empties the input box for the next time it's opened
    closePopup(); // Closes the popup modal
});// Generates the HTML for a new task and injects it into the DOM (Document Object Model)
function todoToDom(title) {
    // insertAdjacentHTML adds new HTML right inside the end of the container, preserving existing items
    todoList.insertAdjacentHTML(
        "beforeend",
        `<div class="todo">
                        <div class="todo-text">${title}</div>
                        <div class="todo-btns">
                            <button class="done-btn"><img src="../IMAGES/done-icon.png" alt="done"></button>
                            <button class="delete-btn"><img src="../IMAGES/trash-icon.png" alt="trash"></button>
                        </div>
                    </div>`
    );// Immediately after creating the HTML, we must re-attach event listeners to the NEW buttons
    addEvenForDeleteBtn();
    addEvenForSubmitBtn();
}let todos = []; // Array to hold the data globally
// Runs when the page finishes loading
window.addEventListener("load", () => {
    // If there is no "todos" key in browser's local storage, create an empty one
    if (!localStorage.getItem("todos")) localStorage.setItem("todos", JSON.stringify(todos));
    // Retrieve the saved items from local storage and convert them from a String back to a JS Array
    todos = JSON.parse(localStorage.getItem("todos"));
    // Loop through the saved data and render each item onto the screen
    todos.forEach((todo) => {
        todoToDom(todo.title);
    });
});// Adds a newly typed task to the local storage database
function addTodoTolocalStorage(todoTitle) {
    // Push an object containing the text and a default 'done' status of false
    todos.push({ title: todoTitle, done: false });
    // Convert the updated array to a JSON string and save it over the old one
    localStorage.setItem("todos", JSON.stringify(todos));
}// Attaches the "deleteCard" logic to all trash buttons
function addEvenForDeleteBtn() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        // Removes existing listeners before adding a new one to prevent double-firing clicks
        btn.removeEventListener("click", deleteCard);
        btn.addEventListener("click", deleteCard);
    });
}// Logic to delete a task visually and from storage
function deleteCard() {
    let todoCard = this.parentElement.parentElement; // Traverses up the HTML tree to grab the entire card wrapper `<div class="todo">`
    let todoTitle = todoCard.querySelector(".todo-text").innerHTML; // Grabs the exact text of the task to be deleted
    todoCard.remove(); // Removes the card from the visible web page
    let tempTodos = JSON.parse(localStorage.getItem("todos")); // Pulls the current list from storage
    // Rebuilds the 'todos' array, keeping ONLY the items whose text does NOT match the one we clicked
    todos = tempTodos.filter((todo) => todo.title !== todoTitle);
    // Saves the newly filtered list back to storage
    localStorage.setItem("todos", JSON.stringify(todos));
}// Attaches the "completedCard" logic to all checkmark buttons
function addEvenForSubmitBtn() {
    document.querySelectorAll(".done-btn").forEach((btn) => {
        // Removes existing listeners before adding a new one to prevent double-firing clicks
        btn.removeEventListener("click", completedCard);
        btn.addEventListener("click", completedCard);
    });
}// Logic to mark a task as visually complete and update storage
function completedCard() {
    let completedTodo = this.parentElement.parentElement; // Traverses up to get the wrapper card
    let completedTodoTitle = completedTodo.querySelector(".todo-text").innerHTML; // Gets the text of the task
    todos = JSON.parse(localStorage.getItem("todos")); // Fetches current array from storage
    // Loops through the array to find the exact task we just clicked
    todos.forEach((todo) => {
        if (todo.title === completedTodoTitle) {
            todo.done = !todo.done; // Flips the boolean (if true, becomes false. If false, becomes true).
            // If it is now marked as done, make it visually green
            if (todo.done) {
                completedTodo.style.backgroundColor = "#4ea347";
                completedTodo.style.color = "white";
            } else {
                // If it was toggled back to 'not done', restore default white visuals
                completedTodo.style.backgroundColor = "white";
                completedTodo.style.color = "rgb(65, 65, 65)";
            }// Saves the updated status back to browser storage
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    });
}