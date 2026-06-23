// Enforces stricter parsing and error handling in JavaScript,  preventing the use of undeclared variables and other unsafe actions.
"use strict";
// Initializes an empty global array to store the newly created Quiz objects.
let quizes = [];
// Defines the data structure for a single Quiz.
class Quiz {// The constructor initializes the properties of a Quiz instance when it is created.
    constructor(id, title, description, count, timeout, questions) {
        this.id = id;                   // Unique identifier for the quiz
        this.title = title;             // The name/title of the quiz
        this.description = description; // A brief description of what the quiz is about
        this.count = count;             // The total number of questions in this quiz
        this.timeout = timeout;         // Time limit for the quiz (likely in minutes or seconds)
        this.questions = questions;     // An array holding the individual question objects
    }
}// Defines the main controller class that handles the UI and logic for creating a quiz.
class QuizMaker {// The constructor is called immediately when a new QuizMaker is instantiated.
    constructor() {// Automatically triggers the render method to set up event listeners.
        this.render();
    }// Handles binding events to the DOM elements (buttons, inputs).
    render() {// Variables to track the number of questions the user wants to add.
        let count;
        let tempCount;
        // Selects the input field where the user specifies the total number of questions.
        let countInput = document.querySelector("#create-quiz-count");
        // Listens for a 'change' event (when the user types a number and clicks away/presses enter).
        countInput.addEventListener("change", () => {// Grabs the current value from the input field.
            count = document.querySelector("#create-quiz-count").value;
            // Stores a backup of the original count to use later for the final quiz object.
            tempCount = count;
        });
        let qId = 1;        // Tracks the current question number being added (starts at 1).
        let questions = []; // Local array to temporarily hold questions before the quiz is finalized.
        // Selects the button used to add an individual question to the quiz.
        let qAddBtn = document.querySelector("#question-add-btn");
        // Listens for a 'click' on the "Add Question" button.
        qAddBtn.addEventListener("click", (e) => {// Prevents the default form submission behavior (which would refresh the page).
            e.preventDefault();
            // Calls the creatQuestions method to build a question object, 
            // and pushes that object into the local 'questions' array.
            questions.push(this.creatQuestions(count, qId));
            // Decreases the remaining count of questions to be added.
            count--;
            // Increases the current question ID for the next question.
            qId++;
            // Updates the UI to show the user which question number they are on next, but only if they haven't exceeded the total number of questions (tempCount).
            if (qId <= tempCount) {
                document.querySelector("#show-count").innerHTML = `${qId}.`;
            } // empty values for next input Clears the question text area.
            document.querySelector("#create-quiz-question").value = "";
            // Selects all answer option inputs and clears them out for the next question.
            document.querySelectorAll(".options").forEach((answer) => {
                answer.value = "";
            });
        });// Variables to hold the quiz metadata.
        let title;
        let description;
        let timeout;
        // Selects the final "Submit" button used to finalize and save the entire quiz.
        let submitBtn = document.querySelector("#create-form-sumbit");
        // Listens for a 'click' on the "Submit Quiz" button.
        submitBtn.addEventListener("click", (e) => {// Prevents the default form submission behavior.
            e.preventDefault();
            // Gathers the final quiz metadata from the DOM.
            title = document.querySelector("#create-quiz-title").value;
            description = document.querySelector("#create-quiz-description").value;
            timeout = document.querySelector("#create-quiz-timeout").value;
            // Calls the method to generate the Quiz object and add it to the global array.It uses the current length of the 'quizes' array as the temporary ID.
            this.createTheQuiz(quizes.length, title, description, tempCount, timeout, questions);
            // Saves the newly updated global array to the browser's Local Storage.
            this.updateLocalStorage();// empty values for next input Resets the metadata input fields back to empty.
            document.querySelector("#create-quiz-title").value = "";
            document.querySelector("#create-quiz-description").value = "";
            document.querySelector("#create-quiz-timeout").value = "";
            // Resets the question counter display back to 1.
            document.querySelector("#show-count").innerHTML = "1.";
            // Alerts the user that the process was successful.
            alert("your Quiz Added to Quizes");
        });
    }// Method to extract a single question's data from the DOM and return it as an object.
    creatQuestions(count, id) {
        let qTitle;      // Will hold the question text
        let options = []; // Will hold the multiple-choice text options
        let qCorrect;    // Will hold the ID/index of the correct answer
        // Ensures the user hasn't tried to add more questions than they initially specified.
        if (count > 0) {// Gets the main question text.
            qTitle = document.querySelector("#create-quiz-question").value;
            // Grabs all elements with the class 'options' (likely text inputs for the answers).
            let answers = document.querySelectorAll(".options");
            // Loops through each option input and pushes its text value into the 'options' array.
            answers.forEach((answer) => {
                options.push(answer.value);
            });// An Immediately Invoked Function Expression (IIFE) to figure out which answer is correct.
            qCorrect = (function () {
                let correctOne;
                // Grabs all checkboxes or radio buttons used to mark the correct answer.
                let options = document.querySelectorAll(".correctA");
                // Loops through them to find the one that the user checked.
                options.forEach((option) => {
                    if (option.checked) {
                        // Extracts the correct answer's identifier. 
                        // It assumes the ID looks like "correct1", "correct2", etc., 
                        // so it slices off the first 7 characters ("correct") to just get the number.
                        correctOne = option.getAttribute("id").slice(7);
                    }
                });return correctOne; // Returns the parsed number.
            })();// Returns the assembled question object.
            return { id: id, title: qTitle, options: options, correct: qCorrect };
        } else {
            // If the user tries to click "Add Question" after reaching the limit, show an error.
            alert(`Error: you have entered all your questions`);
        }
    }// Method to instantiate a new Quiz and store it in the runtime 'quizes' array.
    createTheQuiz(id, title, description, count, timeout, questions) {
        let newQuiz = new Quiz(id, title, description, count, timeout, questions);
        quizes.push(newQuiz);
    }// Method to synchronize the runtime data with the browser's persistent Local Storage.
    updateLocalStorage() {
        let i = 1;
        // Retrieves existing quizzes from Local Storage and parses them from JSON into a JS array.
        // NOTE: If localStorage is empty, this will return null and throw an error on the next line.
        let allQuizes = JSON.parse(localStorage.getItem("quizes"));

        // Takes all newly created quizzes currently sitting in the runtime 'quizes' array 
        // and adds them to the array pulled from Local Storage.
        quizes.forEach((q) => {
            allQuizes.push(q);
        });
        // Loops through the entire combined array to reassign sequential, 1-based IDs to every quiz.
        allQuizes.forEach((quiz) => {
            quiz.id = i;
            i++;
        });// Converts the updated array back into a JSON string and saves it into Local Storage.
        localStorage.setItem("quizes", JSON.stringify(allQuizes));
    }
}// Instantiates the QuizMaker class, which immediately runs the constructor, triggering this.render() and setting up the whole application.
let q = new QuizMaker();