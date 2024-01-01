var start = document.querySelector('#start');
var startScreen = document.querySelector('#start-screen');
var questionsScreen = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var choices = document.querySelector('#choices');
var feedback = document.querySelector('#feedback');
var timer = document.querySelector('#time');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var initials = document.querySelector('#initials');
var submit = document.querySelector('#submit');

var intervalHandle;
var currentQuestionIndex = 0;
var time = 60;
var timerId;


//When the 'Start Quiz' button is clicked, this function will run
function displayQuestion() {
    // Checks if all questions have been answered, and if so, shows the end screen
    if (currentQuestionIndex === 5) {
        questionsScreen.classList.add('hide');
        endScreen.classList.remove('hide');
        return
    }

    var currentQuestion = questions[currentQuestionIndex];

    //Adding the question title to the question title element
    questionTitle.innerText = currentQuestion.title;

    choices.innerHTML = '';

    // Using a forEach loop to create buttons for each answer choice
    currentQuestion.choices.forEach(function (choice) {
        var choicesButton = document.createElement('button');

        choicesButton.innerText = choice;
        choicesButton.addEventListener('click', function () {

            //if statement used to determine which sound effect should be played upon user selection
            if (currentQuestion.answer === choice) {

                feedback.innerText = 'Correct!';
                function playCorrectAudio() {
                    var correct = new Audio('./assets/sfx/correct.wav');
                    correct.play();
                }
                playCorrectAudio();

            } else {

                feedback.innerText = 'Wrong answer!';
                function playIncorrectAudio() {
                    var incorrect = new Audio('./assets/sfx/incorrect.wav');
                    incorrect.play();
                    timer.textContent = time -= 10;
                }
                playIncorrectAudio();
            }

            currentQuestionIndex++;
            displayQuestion();
        })
        choices.append(choicesButton);
    })
}


//This function will also run as soon as 'start quiz' button is clicked
// It starts a countdown of 60 seconds on the questions screen
function clockTick() {
    time--;

    timer.textContent = time

    if (time === 0 || currentQuestionIndex === 5) {

        clearInterval(timerId);
        quizEnd();
    }
};


//This function will run as soon as all questions have been completed
//It displays the end screen
function quizEnd() {
    questionsScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    feedback.classList.add('hide');
    finalScore.innerText = time;
}

//Setting up an event listener for when the 'Start Quiz' button is clicked
//It hides the start screen, shows the questions screen, initiates the function to display questions and sets a timer that updates every second
start.addEventListener('click', function () {
    startScreen.classList.add('hide');
    endScreen.classList.add('hide')
    questionsScreen.classList.remove('hide');
    feedback.classList.remove('hide');
    displayQuestion();
    timerId = setInterval(clockTick, 1000); //1000 milliseconds (1 second) 
    clockTick();

});

//Adding an event listener for the submit button
submit.addEventListener('click', function () {
    // Saving the scores as an object containing the score and initials
    var scoreboard = JSON.parse(localStorage.getItem('score'));

    if (Array.isArray(scoreboard)) {

    } else {
        scoreboard = [];
    }

    var highscores = {
        score: time,
        initials: initials.value
    };

    scoreboard.push(highscores);
    //saving the score and initials
    localStorage.setItem('score', JSON.stringify(scoreboard));
    window.location.href = 'highscores.html';
});