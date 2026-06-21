"use strict"; // Enforces stricter coding rules, catching common silent errors in JavaScript
// Variable Declarations: Grabbing elements from the HTML by their IDs (#) or Classes (.)
let newNoteBtn = document.querySelector("#new-note"); // The main "Add a new Note" button
let popupsSection = document.querySelector("#popups"); // The semi-transparent dark overlay
let notePopup = document.querySelector("#newnote-popup"); // The actual white form box
let closePopupBtn = document.querySelectorAll(".close-popup-btn"); // The 'X' image (returns an array-like NodeList)
let noteSubmitBtn = document.querySelector("#note-submit"); // The final "Add to notes" submit button
let newNoteTitle = document.querySelector("#newnote-title"); // The text input for the title
let newNoteDescription = document.querySelector("#newnote-description"); // The textarea for the description
let noteList = document.querySelector(".note-list"); // The empty div where note cards will go
// Event Listener: Opens the modal when the "Add a new Note" button is clicked
newNoteBtn.addEventListener("click", () => {
    popupsSection.style.display = "flex"; // Unhides the overlay
    notePopup.style.display = "flex"; // Unhides the form box
});// Loops through all close buttons (even though there's only one here) and attaches the close function
closePopupBtn.forEach((closeBtn) => {
    closeBtn.addEventListener("click", closePopup);
});// Function to hide the popup by resetting display styles back to 'none'
function closePopup() {
    popupsSection.style.display = "none";
    notePopup.style.display = "none";
}// Event Listener for the Form Submission
noteSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevents the default HTML form behavior which would refresh the page
    // Validation: If the title input is empty or just spaces, stop the function immediately
    if (newNoteTitle.value.trim() === "") return;
    // Calls the function to generate HTML and place the note on the screen
    noteToDom(newNoteTitle.value, newNoteDescription.value);
    // Calls the function to save the new note into the browser's persistent memory
    addNotesTolocalStorage(newNoteTitle.value, newNoteDescription.value);
    // Resets the form inputs to empty strings for the next time it is opened
    newNoteTitle.value = "";
    newNoteDescription.value = "";
    closePopup(); // Closes the modal window
});// Function to generate the physical Note Card HTML and inject it into the webpage
function noteToDom(title, description) {
    // insertAdjacentHTML injects raw HTML into the container without overwriting existing contents
    noteList.insertAdjacentHTML(
        "beforeend", // Places it inside the container, but at the very end
        `<div class="note">
                        <h4 class="note-title">${title}</h4>
                        <p class="note-text">${description}</p>
                        <div class="note-btns">
                            <button class="delete-btn"><img src="../IMAGES/trash-icon.png" alt="trash" /></button>
                        </div>
                    </div>`
    );// Because a new delete button was just created in the DOM, we must re-run this to attach a click listener to it
    addEvenForDeleteBtn();
}let notes = []; // Master array holding all note data globally
// Event Listener: Runs immediately when the web page finishes loading
window.addEventListener("load", () => {
    // If there is no existing data saved under the key "notes", create an empty array in storage
    if (!localStorage.getItem("notes")) localStorage.setItem("notes", JSON.stringify(notes));
    // Retrieve the saved text data and parse it back into a usable JavaScript Array
    notes = JSON.parse(localStorage.getItem("notes"));
    // Loop through every saved note and generate the HTML for it on the screen
    notes.forEach((note) => {
        noteToDom(note.title, note.description);
    });
});// Function to push new note data into the browser's Local Storage
function addNotesTolocalStorage(noteTitle, noteDescription) {
    // Add an object with the title and description to the global array
    notes.push({ title: noteTitle, description: noteDescription });
    // Convert the updated array to a JSON string and overwrite the old save file
    localStorage.setItem("notes", JSON.stringify(notes));
}// Function to attach click listeners to ALL delete buttons currently on the page
function addEvenForDeleteBtn() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        // Remove existing listener first to prevent accidental double-clicks firing the event twice
        btn.removeEventListener("click", deleteCard);

        // Attach the deletion logic
        btn.addEventListener("click", deleteCard);
    });
}// Logic to delete a note card visually and erase it from storage
function deleteCard() {
    // 'this' refers to the button clicked. parentElement goes up to '.note-btns', second goes up to '.note'
    let noteCard = this.parentElement.parentElement;
    // Grabs the exact title of the note we are trying to delete to use as a matching identifier
    let noteTitle = noteCard.querySelector(".note-title").innerHTML;
    noteCard.remove(); // Removes the note element entirely from the visible webpage
    // Pulls the current database list
    let tempNote = JSON.parse(localStorage.getItem("notes"));
    // Rebuilds the global array by keeping ONLY notes whose title DOES NOT match the one we clicked
    notes = tempNote.filter((note) => note.title !== noteTitle);
    // Saves the freshly filtered array back to storage, effectively finalizing the deletion
    localStorage.setItem("notes", JSON.stringify(notes));
}