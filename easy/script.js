let timerInterval;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let isRunning = false;
// Function to handle radio button clicks
function handleRadioClick() {
    const startButton = document.getElementById('start-btn');
    if (!isRunning) {
        startButton.click(); // Simulate clicking the start button
    }
}

// Function to add click listeners to all radio buttons
function addRadioListeners() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('click', handleRadioClick);
    });
}

// Function to check if time limit is reached
function checkTimeLimit() {
    if (minutes >= 1) {
        const submitButton = document.getElementById('submit-btn');
        if (submitButton) {
            submitButton.click(); // Automatically submit the quiz
        }
    }
}

// Modify the existing updateTimer function
function updateTimer() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            checkTimeLimit(); // Check time limit every minute
        }
    }
    
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${(milliseconds / 10).toString().padStart(2, '0')}`;
    timerElement.textContent = `Time: ${formattedTime}`;
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', addRadioListeners);

// Function to start the timer
function startTimer() {
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');
    
    function updateTimer() {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
        }
        
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${(milliseconds / 10).toString().padStart(2, '0')}`;
        timerElement.textContent = `Time: ${formattedTime}`;
    }

    function toggleTimer() {
        if (!isRunning) {
            timerInterval = setInterval(updateTimer, 10);
            startButton.textContent = 'Stop Quiz';
            startButton.style.backgroundColor = '#dc3545';
            isRunning = true;
        } else {
            clearInterval(timerInterval);
            startButton.textContent = 'Resume Quiz';
            startButton.style.backgroundColor = '#007bff';
            isRunning = false;
        }
    }

    startButton.addEventListener('click', toggleTimer);

    // Initial call to set up the timer display
    timerElement.textContent = 'Time: 00:00.00';

    // Move restart button functionality outside of updateTimer
    const restartButton = document.getElementById('restart-btn');
    restartButton.addEventListener('click', restartQuiz);
}

// Add this function outside of startTimer
function restartQuiz() {
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');


    // Reset background color of questions to default white
    const questionElements = document.querySelectorAll('.question');
    questionElements.forEach(question => {
        question.style.backgroundColor = 'white';
    });
    // Reset timer
    clearInterval(timerInterval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    timerElement.textContent = 'Time: 00:00.00';
    
    // Reset all answers and question backgrounds
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => radio.checked = false);
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => question.style.backgroundColor = '');

    // timerElement = document.getElementById('timer');
    timerElement.style.color = 'black';
    timerElement.style.fontWeight = 'normal';
    // Reset start button
    startButton.textContent = 'Start Quiz';
    startButton.style.backgroundColor = '#007bff';
    isRunning = false;
}

const newQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "c"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "b"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "b"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: "c"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correctAnswer: "b"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "d"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Silver", "Oxygen", "Iron"],
        correctAnswer: "c"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: "b"
    }
];
// Function to append new questions to the form
function Questions() {
    const quizForm = document.getElementById('quiz-form');
    const submitButton = document.getElementById('submit-btn');

    // New questions to be added
  

    // Loop through new questions and append them to the form
    newQuestions.forEach((q, index) => {
        const questionNumber = document.querySelectorAll('.question').length + 1;
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>Question ${questionNumber}:</h3>
            <p>${q.question}</p>
            ${q.options.map((option, i) => `
                <input type="radio" name="q${questionNumber}" value="${String.fromCharCode(97 + i)}" id="q${questionNumber}${String.fromCharCode(97 + i)}">
                <label for="q${questionNumber}${String.fromCharCode(97 + i)}">${option}</label><br>
            `).join('')}
        `;
        quizForm.insertBefore(questionDiv, submitButton);
    });
}
// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const questions = document.querySelectorAll('.question');
    // Stop the timer when the form is submitted
    clearInterval(timerInterval);
    const timerElement = document.getElementById('timer');
    timerElement.style.color = 'red';
    timerElement.style.fontWeight = 'bold';
    questions.forEach((questionDiv, index) => {
        const radios = questionDiv.querySelectorAll('input[type="radio"]');
        const selectedAnswer = Array.from(radios).find(radio => radio.checked);
        const correctAnswer = newQuestions[index].correctAnswer.toLowerCase();
        
        if (selectedAnswer) {
            if (selectedAnswer.value === correctAnswer) {
                questionDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';  // Light green
            } else {
                questionDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';  // Light red
            }
        } else {
            questionDiv.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';  // Light yellow for unanswered
        }
    });
}

// Add event listener to the submit button
document.getElementById('submit-btn').addEventListener('click', handleSubmit);

// Call the function to append new questions
Questions();

// Call startTimer once to set up the functionality
startTimer();
