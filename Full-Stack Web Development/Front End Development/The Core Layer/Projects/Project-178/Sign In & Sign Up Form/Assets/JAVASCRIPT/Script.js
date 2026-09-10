/* User Strict Mode means that the code will be executed in "strict mode".
   This strict mode makes the code more secure and easier to debug. */
"use strict";

/* DOM ELEMNTS SELECTION */

// select the 'Sign Up' button element from the HTMl document using its ID
const signUpButton = document.getElementById('signUp');

// select the 'Sign In' button element from the HTMl document using its ID
const signInButton = document.getElementById('signIn');

// select the 'Container' (likely holding both forms) element from the HTMl document using its ID
const container = document.getElementById('container');

/* 3D HOVER TILT EFFECT LOGIC */

// define a function to handle what happens when the Mouse moves over the container
const onMouseMove = (e) => {

   // getBoundingClientRect() returns the size of the container and its position relative to viewport.
   const rect = container.getBoundingClientRect();

   // calculate the mouse's X (horizontal) position relative to the left edge of the container
   // e.clientX is the mouse position on the screen, rect.left is where the container starts
   const x = e.ClientX - rect.left;

   // calculate mous's Y (vertical) position relative to the top edge of the container
   const y = e.ClientY - rect.top;

   // calculate the exact horizontal center of the container ( width divided by 2 )
   const centerX = container.offsetWidth / 2;

   // calculate the exact vertical center of the container ( height divided by 2 )
   const centerY = container.offsetHeight / 2;

   // Calculate the rotation amount for x-axis ( up / dowm tilt )
   // 1.( y - centerY ) gets distance from the center
   // 2. dividing by ( centerY ) normalizes it to a value between -1 and 1
   // 3. Multiplying by ( -10 ) means the max tilt is 10 degrees. The negative flips the direction
   //    so the element tilts *towards* the mouse rather than away from it.
   const rotateX = ((y - centerY) / centerY) * -10;

   // calculate the rotation amount for y-axis ( left / right tilt )
   // 1.( x - centerX ) gets the distance from the center
   // 2. dividing by ( centerX ) normalizes it to a value between -1 and 1
   // 3. Multiplying by ( 10 ) means the max tilt is 10 degrees. The negative flips the direction
   //    so the element tilts *towards* the mouse rather than away from it.
   const rotateY = ((x - centerX) / centerX) * 10;

   // apply the calculated rotations to the container using CSS transforms
   // perspective ( 1000px ) applies a 3D effect to the element so the tilt is actually visible
   container.style.transform = `

                              perspective(1000px)
                              rotateX(${rotateX}deg)
                              rotateY(${rotateY}deg)
   
                               `;

};

// define a fucntion to reset the container's rotation when the mouse leaves it
const onMouseLeave = () => {

   // reset the transform back to a flat, unrotated state (0 degrees on both axes)
   container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';

};

// attach the 'mousemove'  event listener to the container to trigger the tilt effect continuously
container.addEventListener('mousemove', onMouseMove);

// attach the 'mouseleave' event listener to snap the container back to flat when the cursor leaves
container.addEventListener('mouseleave', onMouseLeave);

/* SIGN IN / SIGN UP PANEL TOGGLE */

// listen for a click on the "Sign Up" button
signUpButton.addEventListener('click', () => {

   // Add the CSS class 'right-panel-active' to the container
   // In the associated CSS file, this class likely slides the overlay and forms 
   // to reveal the registration view.
   container.classList.add("right-panel-active");

});

// listen for a click on the "Sign In" button
signInButton.addEventListener('click', () => {

   // Remove the CSS class 'right-panel-active' from the container.
   // This resets the layout to the default login view.
   container.classList.remove("right-panel-active");

});

/* PARTICLES.JS BACKGROUND CONFIGURATION */

// initialize the particles .js library inside the HTMl element with its ID
particlesJS('particles-js', {

   // Configuration for the visual appearance and behavior of the particles
   "particles": {

      "number": {

         // Total number of particles on the screen
         "value": 80,
         "density": {

            // Automatically adjust the number of particles based on screen size
            "enable": true,

            // The area (in square pixels) used to calculate particle density
            "value_area": 800

         }
      },

      "color": {

         // Hex code setting the particles to white
         "value": "#ffffff"

      },

      "shape": {

         // Shape of the particles
         "type": "circle",
         "stroke": {

            // No outline (stroke width 0)
            "width": 0,
            "color": "#000000"

         },

         "polygon": {

            // If the shape were set to 'polygon', it would have 5 sides
            "nb_sides": 5

         }

      },

      "opacity": {

         // Base transparency of the particles (50% visible)
         "value": 0.5,

         // Particles don't have randomly generated opacities
         "random": false,
         "anim": {

            // Disables opacity animation (pulsing effect)
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false

         }

      },

      "size": {

         // Base radius size of the particles (3px)
         "value": 3,

         // Allow particles to have randomly varied sizes up to 3px
         "random": true,
         "anim": {

            // Disables size animation (shrinking/growing effect)
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false

         }

      },

      "line_linked": {

         // Disables the connecting lines between particles that get close to each other
         "enable": false

      },

      "move": {

         // Enables particle movement
         "enable": true,

         // Sets movement speed to a slow drift
         "speed": 2,

         // Particles move in random directions, not uniformly
         "direction": "none",
         "random": false,

         // Particles drift smoothly, not in straight locked lines
         "straight": false,

         // When a particle reaches the edge of the canvas, it leaves ("out") rather than bouncing back
         "out_mode": "out",
         "bounce": false,
         "attract": {

            // Disables particles pulling towards each other
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200

         }

      }

   },

   // Configuration for how particles react to user input (mouse events)
   "interactivity": {

      // Detects mouse events on the canvas element generated by the library
      "detect_on": "canvas",
      "events": {

         "onhover": {

            // Enable hover interaction
            "enable": true,

            // When hovered, particles will be repelled away from the mouse cursor
            "mode": "repulse"

         },

         "onclick": {

            // Enable click interaction
            "enable": true,

            // When clicked, add (push) more particles to the canvas
            "mode": "push"

         },

         // Automatically resize the canvas and reposition particles if the window is resized
         "resize": true

      },

      "modes": {

         // Configuration for specific interactivity modes defined above
         "grab": {

            // (Not used here) Distance mouse needs to be to grab particles with lines
            "distance": 400,
            "line_linked": {

               // (Not used here) Distance mouse needs to be to grab particles with lines
               "opacity": 1

            }

         },

         "bubble": {

            // (Not used here) Settings if hover mode was set to 'bubble' (enlarge on hover)
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3

         },

         "repulse": {

            // The active hover setting: particles within 200px of the cursor move away
            "distance": 200,

            // Speed at which they return to normal state after the cursor leaves
            "duration": 0.4

         },

         "push": {

            // The active click setting: add 4 new particles at the cursor location per click
            "particles_nb": 4

         },

         "remove": {

            // (Not used here) How many particles to delete if click mode was 'remove'
            "particles_nb": 2

         }

      }

   },

   // Configuration for customizing the canvas element
   "customParams": {

      // Background color of the canvas
      "background_color": "#b61924"

   },

   // Optimizes visual clarity on high-density (Retina) displays, preventing blurriness
   "retina_detect": true
});