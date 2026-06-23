// Enforce stricter parsing error handling in javascript. Ir prevents you from using undeclared variables and makes debugging easier. 
"use strict";
// Initialize an empty array called 'quizzes'. This will eventually hold the data for all available quizzes.
let quizes = [];
// Retrieve the "quizes" string from the browser's Local Storage and parse it back into a JavaScript array/object.
quizes = JSON.parse(localStorage.getItem("quizes"));
// Class to handle rendering the list of quizzes to the screen.
class TakeQuiz { // Constructor is called immediately when a new TakeQuiz is instantiated.
    constructor() { // Initialize the user's starting score points to 0.
        this.point = 0; 
        // Extract the quiz ID from the URL hash. Example: if the URL is 'site.com/#123', location.hash.slice(1) removes the '#' and returns '123'.
        this.quizId = location.hash.slice(1);
        // Declare a property to store the specific quiz object the user is currently taking.
        this.quiz;
        // Ilerate through all available quizzes pulled from Local Storage.
        quizes.forEach((q) => { // Find the quiz that matches the ID from the URL hash and assign it to 'this.quiz'.
            if (q.id == this.quizId) this.quiz = q;
        }); // Call the render method to start mapping the quiz data to the user interface.
        this.render();
    } // render method to start mapping the quiz data to the user interface.
    render() { // Select necessary DOM elements from the HTML page using their IDs.
        let titleElem = document.querySelector("#header-quiz-title"); // Note: there is a typo in the HTML ID 'header-quiz-title'.
        let descriptionElem = document.querySelector("#descriptoion"); // Note: there is a typo in the HTML ID 'descriptoion'.
        let countElem = document.querySelector("#count-value"); // Note: there is a typo in the HTML ID 'count-value'.
        let submitAnswersBtn = document.querySelector("#submit-adswers"); // Note: there is a typo in the HTML ID 'adswers'.
        // Insert the fetched quiz data into the selected DOM elements.
        titleElem.innerHTML = this.quiz.title; // Usually represents the title of the quiz.
        descriptionElem.innerHTML = this.quiz.description; // Usually represents a description of the quiz.
        countElem.innerHTML = this.quiz.count; // Usually represents the number of questions in the quiz.
        // Initialize and start the countdown timer.
        this.timeoutMaker(); // Attach a click event listener to the submit button.
        submitAnswersBtn.addEventListener("click", () => { // calculate and display the final score when clicked.
            this.getQuizResult();
        }); // Build and render the HTML for the individual quiz questions.
        this.generateQuestions();
    } // Timeout function to start the timer.
    timeoutMaker() { // Select the DOM element where the timer will be displayed visually.
        let timeoutElem = document.querySelector("#timer-value"); 
        // Convert the quiz's timeout value to a number (the '+' operator coerces a string into an integer).
        let timeoutMinute = +this.quiz.timeout; 
        // Setup initial minutes and seconds (starts at Minute-1 and 59 seconds).
        let min = timeoutMinute - 1;
        let sec = 59;
        // Store a reference to the class context ('this') to be accessed safely inside the setInterval callback function.
        let thisTemp = this;
        // Execute the timeoutHandler function every 1000 milliseconds (1 second).
        setInterval(timeoutHandler, 1000);
        // Function executed after completing this keyframe
        function timeoutHandler() { // Condition 1: Time has completely run out.
            if (sec == 0 && min == 0) {
                timeoutElem.innerHTML = `${min}:${sec}`; // Update display to "0:0".
                thisTemp.getQuizResult(); // Automatically submit the quiz.
                // Bug Alert: clearInterval requires an interval ID as an argument to actually stop running. It should ideally look like: let timerId = setInterval(...); clearInterval(timerId);
                clearInterval();
            } // Condition 2: Seconds dropped below 0, meaning a full minute has passed.
            else if (sec < 0) {
                min--; // Decrement the minute.
                sec = 59; // Reset seconds back to 59.
                timeoutElem.innerHTML = `${min}:${sec}`; // Update the DOM.
                sec--; // Decrement seconds for the next tick.
            } // Condition 3: Normal countdown tick within a minute.
            else {
                timeoutElem.innerHTML = `${min}:${sec}`; // Update the DOM.
                sec--; // Decrement seconds.
            }
        }
    } // Generate and render the HTML for the individual quiz questions.
    generateQuestions(){ // Select the DOM element where the questions will be rendered.
        let questionsContainer = document.querySelector(".question-list");
        // Loop through the array of questions inside the current quiz object.
        this.quiz.questions.forEach((question) => {
            // Append a block of HTML for each question to the container without overwriting previous ones ('beforeend').
            questionsContainer.insertAdjacentHTML( // beforeend
                "beforeend",
                `
                    <div class="question">
                        <p class="question-number">${question.id}</p>
                        <div>
                            <p class="question-title">.${question.title}</p>
                            <div class="question-answers">
                                <div>
                                    <input type="radio" id="${question.id}answer1" name="${question.id}answer">
                                    <label for="${question.id}answer1">1.${question.options[0]}</label>
                                </div>
                                <div>
                                    <input type="radio" id="${question.id}answer2" name="${question.id}answer">
                                    <label for="${question.id}answer2">2.${question.options[1]}</label>
                                </div>
                                <div>
                                    <input type="radio" id="${question.id}answer3" name="${question.id}answer">
                                    <label for="${question.id}answer3">3.${question.options[2]}</label>
                                </div>
                                <div>
                                    <input type="radio" id="${question.id}answer4" name="${question.id}answer">
                                    <label for="${question.id}answer4">4.${question.options[3]}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            );
        });
    } // quiz result function
    getQuizResult() {
        // Select all the HTML blocks that contain the radio button answers.
        let questions = document.querySelectorAll(".question-answers");
        let correctAnswers = []; // Array to hold the correct answer numbers.
        let checkedAnswer = [];  // Array to hold the user's selected answer numbers.
        // Loop through the UI blocks to determine which options the user actively clicked.
        questions.forEach((question) => {// Find all radio inputs within this specific question block.
            let inputs = question.querySelectorAll("input");
            let isChecked = 0; // Flag to check if the user actually selected an answer for this question.
            inputs.forEach((input) => {// Check if the current radio button is toggled on.
                if (input.checked) {
                    // Extract the answer number from the ID. IMPORTANT LOGIC: slice(7) assumes the prefix before the answer number is exactly 7 characters long. Example: If question.id is "1" + "answer1" = "1answer1" (8 chars). slice(7) returns "1". The '+' converts that string "1" into a numeric 1.
                    checkedAnswer.push(+input.id.slice(7));
                    isChecked = 1; // Mark that an answer was successfully found.
                }
            }); // If the loop finishes and nothing was checked, push 0 as a placeholder (meaning "unanswered").
            if (isChecked == 0) checkedAnswer.push(0);
        }); // Loop through the original quiz data object to build the array of the actual correct answers.
        this.quiz.questions.forEach((question) => {// Convert the correct answer value to a number and store it.
            correctAnswers.push(+question.correct);
        });// Calculate the score value of a single question.
        let questinsCount = this.quiz.questions.length; // Total number of questions.
        let eachQuestionPoint = 100 / questinsCount;    // The mathematical weight of each question out of 100%.
        // Loop through the arrays to compare the user's answers against the correct answers.
        let i = 0;
        while (i < correctAnswers.length) {// If the values match perfectly, add the question's percentage value to the total score.
            if (correctAnswers[i] == checkedAnswer[i]) {
                this.point += eachQuestionPoint;
            }
            i++;
        }// --- UI Updates for the Results Screen ---
        let questionsContainer = document.querySelector(".question-list");
        let answerQuestionTitle = document.querySelector(".answer-the-test");
        let timeoutElem = document.querySelector("#timer-value");
        let submitBtn = document.querySelector("#submit-adswers");
        let cancelBtn = document.querySelector("#cancel-quiz");
        // Overwrite the entire questions list interface with a single element showing the final score.
        questionsContainer.innerHTML = `
        <h2 class="answer-the-test" style="color:green; margin:100px 0">your score is: ${this.point}%</h2>`;
        // Update various surrounding UI elements to reflect the "finished" state.
        answerQuestionTitle.innerHTML = "here is your result"; // Change header text.
        timeoutElem.style.display = "none";                    // Hide the timer block.
        submitBtn.style.display = "none";                      // Hide the submit button so they can't submit again.
        cancelBtn.innerHTML = "Back To Home";                  // Change 'Cancel' button text to 'Back to Home'.
    }
}  // Instantiate the TakeQuiz class. This kicks off the constructor and begins the entire quiz lifecycle.
let holdingQuiz = new TakeQuiz();