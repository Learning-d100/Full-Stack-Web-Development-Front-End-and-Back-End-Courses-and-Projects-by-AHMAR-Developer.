// Animate-on-scroll Javascript
AOS.init(
    {
        duration: 1500,
        once: true,
        mirror: true,
        easing: 'ease-in-out'
    }
);
// fUNCTION TO SHOW THE VALUE OF DROPDOWN MENU IN TEXTBOX
function show(anything) {
    document.querySelector('.textBox').value = anything;
}
// TOGGLE DROPDOWN MENU
let dropdown = document.querySelector('.dropdown');
// FUNCTION TO TOGGLE THE DROPDOWN MENU WHEN CLICKED
dropdown.onclick = function () {
    dropdown.classList.toggle('active');
}