// Initial setup variables
/* These lines grab the necessary HTML elements and set up the foundation for pagination and request management before any function run */
// Grab the 'gallery' (where images go) and 'loader' (the loading spinner) from HTMl DOM.
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
// Controls the pagination. It starts on page-1 and requests 12 images per API call.
let currentPage = 1;
const limitPerPage = 12;
// A 'Lock' variable. It prevents the script from accidentally triggering.
//  Multiple API calls at the exact same time if user scrolls aggressively.
let isFetching = false;
// Render images inside HTML dynamically
/* The displayPhotos function takes the row JSON data array from the API and turns it into visible HTML elements on webpage. */
function displayPhotos(photos) {
    // uses a loop to go through every single photo object in the returned array.
    photos.forEach((photo) => {
        // Create a new Div element for each photo and assign it the CSS class 'img-card' (image-card)
        const card= document.createElement('div');
        card.classList.add('img-card');
        // Generate an optimized image URL using Picsum's ID endpoints
        /* Instead of using the default, potentially massive image size, this constructs a custom URL. 
           By injecting `${photo.id}`, it asks a API for the exact image. 
           The `/500/600` at the end forces the API to crop and resize the image to exactly 500x600 pixels, 
           ensuring all cards look uniform and load much faster. */
        const optimizedUrl = `https://picsum.photos/id/${photo.id}/500/600`;
        // Inject <img> tag (with native lazy loading) and author text label into the card.
        card.innerHTML = `
        <img src="${optimizedUrl}" alt="Photo by ${photo.author}" loading="lazy">
        <div class="author-overlay">📸 by ${photo.author}</div>
        `;
        // Physically attaches this newly created card to the gallery container on the webpage.
        gallery.appendChild(card);
    });
}
// Fetch data from Picsum's paginated list APi.a
/* the fetchPhotos function goes out to the internet to get the image data.
   It is the an 'async' function, meaning it can pause and wait for the network request to finish.  */
async function fetchPhotos () {
    // This Lock: If a fetch is already in progress, stop running immediately to prevent spamming the API.
    if (isFetching) return;
    // Sets the lock to true, makes the loading spinner visible to user.
    isFetching = true;
    loader.style.visibility = 'visible';
    try {
        // Calls the Picsum API, dynamically inserting the current 'page' and 'limit' into the URL.
        // 'await' makes the code pause here until the API call finishes.   
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limitPerPage}`);
        // if the server returns an error (like 404  or 500 status), throw an error tos top execution.
        if (!response.ok)
            throw new Error("Network issues fetching images");
        // converts the raw network response into a usable javascript object / array (JSON).
        const data = await response.json();
        // The Update: if the data comes back successfully and does not empty
        if (data.length > 0) {
            // Pass the data to display function to render the HTML.
            displayPhotos(data);
            // Setup next page number for subsequent triggers
            /* Crucially, we increment the page number. This ensures that the 'next' time
                this function runs, it asks for page-2, then page-3, and so on. */
            currentPage++;
        }
    }
    catch (error) {
        // if anything goes wrong in the try block, log the error to the console safely without breaking the page.
        console.error("Error loading images:", error);
    }
    finally {
        // Cleanup: whether the fetch succeeded or failed, make the lock false and hide the loading spinner.
        isFetching = false;
        loader.style.visibility = 'hidden';
    }
}
// Setup Intersection Observer to listen for the scroll position.
/* Instead of calculating exact pixel scroll depths manually (which is bad for performance),
the code users an intersection observer. This highly efficient built in browser toll simply.
alerts you when a specific HTML element enters ar exits the visible screen.*/
const observer = new IntersectionObserver((entries) => {
    // When the bottom loader enters visual screen space, run fetch
    /* entries[0].isIntersecting means the loading spinner has scrolled into the trigger zone.
       !isFetching ensures we aren't already actively loading data.
       If both are true, it triggers fetchPhotos() to get the next batch of images.*/
    if (entries[0].isIntersecting && !isFetching) {
        fetchPhotos();
    }
},
{
    // Fetch 300px early for fluid, non-stop scrolling experience
    /* USER EXPERIENCE OPTIMIZATION: By setting rootMargin to '300px', the observer's "trigger zone" 
      is artificially expanded 300 pixels below the actual bottom of the screen.
      The network request starts *before* the user actually hits the bottom, so by the time 
      they scroll down that final 300 pixels, the images have already loaded, creating a seamless feel.*/
    rootMargin: '300px'
});
// Initialize the tracking
/* Kicks the whole process off. It tells the Intersection Observer to specifically attach 
  itself to the 'loader' HTML element and start watching its position relative to the viewport.*/
observer.observe(loader);