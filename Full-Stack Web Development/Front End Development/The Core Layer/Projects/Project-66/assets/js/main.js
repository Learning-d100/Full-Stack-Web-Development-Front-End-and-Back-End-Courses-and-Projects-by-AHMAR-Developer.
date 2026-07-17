/******************************************************************************
 * 🚀 MAIN FRONTEND LOGIC
 * This script handles UI interactions: Mobile Navigation, Auto-closing Menus,
 * Swiper.js Sliders, GSAP Animations, and Dynamic Scroll Effects.
 ******************************************************************************/

/*=============================================================================
 * 📱 1. MOBILE MENU TOGGLE LOGIC
 *=============================================================================*/
// 🎯 Target DOM elements by their ID to manipulate them
const navMenu = document.getElementById("nav-menu"),     // The actual menu container wrapper
      navToggle = document.getElementById("nav-toggle"), // The hamburger menu button
      navClose = document.getElementById("nav-close");   // The 'X' close button

/* ---> OPEN MENU <--- */
// Safety check: ensure the toggle button exists on the current page before adding a listener
if (navToggle) {
  navToggle.addEventListener("click", () => {
    // When clicked, add the CSS class "show-menu" to slide/fade the menu into view
    navMenu.classList.add("show-menu");
  });
}

/* ---> CLOSE MENU <--- */
// Safety check: ensure the close button exists on the current page
if (navClose) {
  navClose.addEventListener("click", () => {
    // When clicked, remove the "show-menu" CSS class to hide the menu
    navMenu.classList.remove("show-menu");
  });
}

/*=============================================================================
 * 🔗 2. AUTO-CLOSE MENU ON LINK CLICK
 *=============================================================================*/
// 🎯 Grab all navigation links inside the menu
const navLink = document.querySelectorAll(".nav__link");

// Define the action that happens when a link is clicked
const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // Remove the "show-menu" class so the mobile menu collapses automatically
  // after the user selects a destination
  navMenu.classList.remove("show-menu");
};

// Loop through each individual link and attach the click listener
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============================================================================
 * 🏎️ 3. SWIPER.JS INITIALIZATION (HERO CAROUSEL)
 *=============================================================================*/
// Initialize a new Swiper instance on the container with class "home__swiper"
const swiperHome = new Swiper(".home__swiper", {
  speed: 1200,      // Transition speed between slides in milliseconds (1.2 seconds)
  effect: "fade",   // Use a smooth cross-fade effect instead of a standard horizontal slide

  pagination: {
    el: ".swiper-pagination", // Designate the HTML element for the pagination dots
    clickable: true,          // Allow users to click the dots to navigate between slides
    
    // 🎨 CUSTOM PAGINATION BULLETS:
    // Instead of standard dots, this renders numbers (e.g., "01", "02")
    renderBullet: (index, className) => {
      return (
        // Generate a span tag for each bullet
        '<span class="' + className + '">' +
        // Add 1 to the index (since arrays start at 0) and pad with a leading zero
        String(index + 1).padStart(2, "0") +
        "</span>"
      );
    },
  },
});

/*=============================================================================
 * ✨ 4. GSAP ANIMATIONS (INITIAL PAGE LOAD)
 *=============================================================================*/
// GSAP .from() animates elements FROM a specified state TO their natural CSS state.

// Drop panel 1 straight down from 1000px above its normal position
gsap.from(".home__panel-1", { y: -1000, duration: 1 });

// Push panel 2 straight up from 1000px below its normal position
gsap.from(".home__panel-2", { y: 1000, duration: 1 });

// Slide the main hero image in from 1000px to the right
gsap.from(".home__image", { x: 1000, duration: 1 });

// Fade in and gently slide up the titles container
// delay: 1 ensures this happens AFTER the panels and image finish loading
gsap.from(".home__titles", { y: 100, opacity: 0, delay: 1 });

// Fade in the specific main title slightly after the container
// delay: 1.1 creates a staggered, cascading animation effect
gsap.from(".home__title", { y: 100, opacity: 0, delay: 1.1 });

/*=============================================================================
 * 🌫️ 5. DYNAMIC BLUR HEADER ON SCROLL
 *=============================================================================*/
const blurHeader = () => {
  const header = document.getElementById("header");
  
  // Use a ternary operator to check vertical scroll position (scrollY)
  // If user scrolled down 50px or more (?) -> Add "blur-header" class
  // If user is at the top (:) -> Remove "blur-header" class
  this.scrollY >= 50
    ? header.classList.add("blur-header")
    : header.classList.remove("blur-header");
};

// Listen to the window for any scroll event, and constantly evaluate the blurHeader function
window.addEventListener("scroll", blurHeader);