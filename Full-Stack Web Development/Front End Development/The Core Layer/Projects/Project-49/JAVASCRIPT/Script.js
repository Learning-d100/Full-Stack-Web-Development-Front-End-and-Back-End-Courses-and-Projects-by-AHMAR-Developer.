// 1. Select the HTML <video> element where the screen share will be displayed
const videoElement = document.getElementById("video");

// 2. Select the HTML <button> element that the user will click to trigger Picture-in-Picture mode
const button = document.getElementById("button");

/**
 * 3. Asynchronous function to capture the user's screen or window
 * It uses 'async' because capturing a screen requires waiting for user permission.
 */
async function selectMediaStream() {
    try {
        // Await the user's permission to record/share their screen.
        // 'getDisplayMedia()' triggers the browser's built-in prompt (Share your screen/tab/window).
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();

        // Assign the live screen capture stream directly to the video element's source object
        videoElement.srcObject = mediaStream;

        // Once the video element successfully loads the stream's metadata (dimensions, duration, etc.),
        // trigger an anonymous arrow function to start playing the video automatically.
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (error) {
        // If the user denies permission, cancels the prompt, or an error occurs, 
        // catch it here and log it to the browser console.
        console.log("Error come :", error);
    }
}

/**
 * 4. Event Listener for the button click
 * When clicked, it attempts to put the running video into a floating "Picture-in-Picture" window.
 */
button.addEventListener("click", async () => {
    // Disable the button immediately so the user can't click it multiple times 
    // while the browser processes the Picture-in-Picture request.
    button.disabled = true;

    try {
        // Request the browser to pop out the video into a floating, always-on-top window.
        // This requires 'await' because it is an asynchronous browser action.
        await videoElement.requestPictureInPicture();
    } catch (pipError) {
        // Good practice: catch errors if the PiP request fails (e.g., if the video hasn't loaded yet)
        console.log("Picture-in-Picture error:", pipError);
    }

    // Re-enable the button so the user can interact with it again once the process finishes.
    button.disabled = false;
});

// 5. Automatically call the function to prompt the user for screen sharing as soon as the script loads.
selectMediaStream();