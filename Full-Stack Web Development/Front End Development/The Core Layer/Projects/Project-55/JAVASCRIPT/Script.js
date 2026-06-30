// Animate on Scroll Duration
AOS.init(
    {
        duration: 1500
    }
);
// Initialize an array of objects to act as our local database (simulating IMDB).
// Each object represents a movie with three properties: name, lead, and collection.
const IMDB = [
    { name: "Thor", lead: "Thor", collection: "90" },
    { name: "Hulk", lead: "Banner", collection: "95" },
    { name: "DR. Strange", lead: "Strange", collection: "100" },
    { name: "Superman", lead: "Kent Clerk", collection: "120" },
    { name: "Iron Man", lead: "Tony Junior", collection: "130" },
];

// Get the main DOM element where all the movie cards will be rendered and injected.
const movieContainerRef = document.getElementById("movieContainer");

// --- form section ---
// Grab references to the input fields used for adding a new movie.
const nameObj = document.getElementById("name");             // Input for movie name
const leadObj = document.getElementById("lead");             // Input for lead actor
const collectionObj = document.getElementById("collection"); // Input for box office collection

// Grab references to the form's submit button and the error message container.
const formBtn = document.querySelector("#addmovie");
const errorBox = document.querySelector(".error-box");

// --- pop-up section ---
// Grab references to the elements that make up the modal/pop-up UI.
const overlay = document.getElementById("overlay");                     // The dark background overlay
const popUp = document.querySelector(".pop-up-container");              // The actual modal container
const popUpCloseBtn = document.querySelector(".close-btn-container");   // The button to close the modal

// --- edit form ---
// Grab references to the input fields inside the edit pop-up modal.
const editMovieName = document.querySelector(".edit-movie-name");
const editLeadRole = document.querySelector(".edit-lead-role");
const editTotalCollection = document.querySelector(".edit-total-collections");

// --- edit form btn ---
// Grab references to the buttons and error message container inside the edit pop-up modal.
const editFormSubmitBtn = document.querySelector(".edit-form-submit"); // Saves edits
const editFormCancelBtn = document.querySelector(".edit-form-cancel"); // Clears edit inputs
const editFormErrorBox = document.querySelector(".edit-from-error");   // Shows edit validation errors

// --- main area ---
// This function is responsible for building the HTML for the movie list and displaying it.
function renderMovie() {
    // First, clear out any existing HTML inside the container so we don't duplicate data.
    movieContainerRef.innerHTML = "";

    // Check if there is more than 1 movie in the array. 
    // (Note: This means if there is exactly 1 movie left, it won't render it. It requires at least 2).
    if (IMDB.length > 1) {
        // Iterate over the IMDB array using map. 'movie' is the object, 'idx' is its position in the array.
        IMDB.map((movie, idx) => {
            // Append a newly constructed HTML string for each movie to the container's innerHTML.
            // Template literals (backticks) are used to inject variables directly into the string.
            movieContainerRef.innerHTML += `
    <div class="movieParent">
      <section class="head"></section>
      <section class="body">
        <p class="name">${movie.name}</p>
        <p class="lead">${movie.lead}</p>
        <p class="collection">$${movie.collection} M</p>
      </section>
      <section class="action">
        <!-- The edit and delete buttons pass the current array index ('idx') to their respective functions -->
        <button class="actionBtn" onClick="editCard(${idx})">
          Edit
        </button>
        <button class="actionBtn" onClick="deleteMovie(${idx})">
          Delete
        </button>
      </section>
    </div>

            `;
        });
    } else {
        // If the array has 1 or 0 items, display this fallback text instead of the cards.
        movieContainerRef.innerHTML = "Data not available";
    }
}

// This function removes a movie from the database. It is triggered by the inline onClick in the HTML.
function deleteMovie(index) {
    // Prompt the user with a browser confirmation dialog to ensure they actually want to delete it.
    userSelection = confirm(`are u sure want to delete '${IMDB[index].name}'?`);

    // If the user clicks "OK", userSelection will be true.
    if (userSelection) {
        // Remove exactly 1 item from the IMDB array at the specified 'index'.
        IMDB.splice(index, 1);
        // Re-render the UI to reflect the updated array.
        renderMovie();
    }
}

// This function handles creating a new movie from the main add form.
function addNewMovie() {
    // Validate that all three input fields have a truthy value (not empty).
    if (nameObj.value && leadObj.value && collectionObj.value) {
        // Construct a new movie object using the values from the input fields.
        const newMovie = {
            name: nameObj.value,
            lead: leadObj.value,
            collection: collectionObj.value,
        };

        // Add the new movie object to the VERY BEGINNING of the IMDB array.
        IMDB.unshift(newMovie);

        // Clear out the form input fields so they are empty for the next entry.
        nameObj.value = "";
        leadObj.value = "";
        collectionObj.value = "";

        // Re-render the UI to show the newly added movie.
        renderMovie();
    } else {
        // If any field was empty, make the error box visible and show a message.
        errorBox.style.display = "block";
        errorBox.textContent = "All fields are required!";
    }
}

// A global variable to keep track of which movie is currently being edited.
// Set to null initially because nothing is being edited when the script loads.
let currentEditIndex = null;

// This function opens the edit modal and populates it with the selected movie's data.
const editCard = (idx) => {
    // Store the index of the movie being edited in the global variable so the submit function can access it.
    currentEditIndex = idx;

    // Show the dark overlay by adding an "active" CSS class.
    overlay.classList.add("active");
    // Show the pop-up modal by changing its display style from 'none' to 'block'.
    popUp.style.display = "block";

    // Fill the edit form inputs with the existing data of the selected movie.
    editMovieName.value = IMDB[idx].name;
    editLeadRole.value = IMDB[idx].lead;
    editTotalCollection.value = IMDB[idx].collection;
};

// Event listener for the "Submit" button inside the Edit modal.
editFormSubmitBtn.addEventListener("click", (e) => {
    // Prevent the default behavior (which would refresh the page if this button is inside a <form> tag).
    e.preventDefault();

    // Validate that all three edit input fields have values.
    if (
        editMovieName.value &&
        editLeadRole.value &&
        editTotalCollection.value
    ) {
        // Overwrite the existing movie object at the stored index with a brand new object containing the updated values.
        IMDB[currentEditIndex] = {
            name: editMovieName.value,
            lead: editLeadRole.value,
            collection: editTotalCollection.value,
        };

        // Hide the modal pop-up and the dark overlay.
        popUp.style.display = "none";
        overlay.classList.remove("active");

        // Re-render the UI to reflect the edited data.
        renderMovie();
    } else {
        // If validation fails, show the error box inside the edit modal.
        editFormErrorBox.style.display = "block";
        editFormErrorBox.textContent = `All fields are required!`;
    }
});

// Event listener for the "Cancel" button inside the Edit modal.
editFormCancelBtn.addEventListener("click", (e) => {
    // Prevent default form submission.
    e.preventDefault();
    // Simply clear the input fields (Note: this specific logic doesn't close the modal, it just empties the text boxes).
    editMovieName.value = "";
    editLeadRole.value = "";
    editTotalCollection.value = "";
});

// Event listener for the main "Add Movie" form button.
formBtn.addEventListener("click", (e) => {
    // Prevent default form submission page refresh.
    e.preventDefault();
    // Call the function to handle adding the movie.
    addNewMovie();
});

// Event listener for the "X" (close) button on the modal.
popUpCloseBtn.addEventListener("click", () => {
    // Hide the pop-up and remove the active class from the overlay to hide it as well.
    popUp.style.display = "none";
    overlay.classList.remove("active");
});

// Event listener attached to the dark background overlay itself.
overlay.addEventListener("click", (e) => {
    // Check if the actual element clicked was NOT inside the popUp container.
    // This allows users to close the modal by clicking anywhere outside of it.
    if (!popUp.contains(e.target)) {
        // If clicked outside, hide the pop-up and the overlay.
        popUp.style.display = "none";
        overlay.classList.remove("active");
    }
});

// Finally, call renderMovie() once right as the script loads to draw the initial 5 movies to the screen.
renderMovie();