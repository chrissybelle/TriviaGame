$(document).ready(function() {
// V A R I A B L E S 
var timeRemaining = 5;
var interval;
var questionCounter = 0;
var questions = ["1why?", "2when?","3how?","4what?"];
var answerChoices = [["a1", "b1", "c1", "d1"],["a2", "b2", "c2", "d2"],["a3","b3","c3","d3"],["a4","b4","c4","d4"]];
var correctAnswers = ["a1", "b2", "c3", "d4"];
var userAnswer;
var correctGuesses = 0;
var incorrectGuesses = 0;
var unanswered = 0;
var buttonClicked = false;

// F U N C T I O N S
//countdown timer
function decrement() {
    timeRemaining--;
    $("#timer").text("Time remaining: " + timeRemaining);
    //if time runs out, display time up
    if (timeRemaining === 0) {
        stop();
        $("#question").text("Time's up!");
        unanswered++;
        displayAnswer();
        displayNextQA();
    }
}
//decrement counter by 1 each second
function countdown() {
    interval = setInterval(decrement, 1000);
}
//stops timer
function stop() {
    clearInterval(interval);

}
//displays question
function displayQuestion() {
    $("#question").text(questions[questionCounter]);
    buttonClicked = false;
}
//displays current answer choices
function showChoices() {
    for (var i = 0; i < 4; i++) {
        var btn = $("<button>");
        var answer = answerChoices[questionCounter];
        btn.addClass("choices");
        btn.attr("data-value", answer[i]);
        btn.text(answer[i]);
        $("#choices").append(btn);
    }
}
//check if answer is correct
function checkAnswer() {
    if (correctAnswers[questionCounter] === userAnswer) {
        $("#question").text("CORRECT!");
        correctGuesses++;
        displayNextQA();
    } else {
        $("#question").text("WRONG!");
        displayAnswer();
        displayNextQA();
        incorrectGuesses++;
    }
}
//display correct answer
function displayAnswer() {
    $("#feedback").text("The correct answer was: " + correctAnswers[questionCounter]);
}
//clear previous answer buttons
function clearChoices() {
    $("#choices").empty();
}
//clear feedback
function clearFeedback() {
    $("#feedback").empty();
}
//pause for 3 seconds, then display next set of Q&A
function displayNextQA(){
    if (questionCounter < questions.length - 1) {
        clearChoices();
        setTimeout(reset, 3000);
        setTimeout(displayQuestion, 3000);
        setTimeout(showChoices, 3000);
    } else {
        stop();
        setTimeout(playAgain, 3000);
    }
}
//reset for next question
function reset() {
    timeRemaining = 5;
    $("#timer").text("Time remaining: " + timeRemaining);
    clearFeedback();
    countdown();
    questionCounter++;
    buttonClicked = false;
}
//play again
function playAgain() {
    $("#timer").html("<button id='startOver'>Play again?</button>");
    $("#question").text("Here's how you did:");
    clearChoices();
    $("#feedback").html("Correct: " + correctGuesses + "<br>Incorrect: " + incorrectGuesses + "<br>Unanswered: " + unanswered);
}
//reset game
function gameReset() {
    questionCounter = 0;
    correctGuesses = 0;
    incorrectGuesses = 0;
    unanswered = 0;
    buttonClicked = false;
    $("#startOver").hide();
    clearChoices();
    clearFeedback();
    timeRemaining = 5;
}

// E V E N T S
$("#start").on("click", function() {
    $("#start").hide();
    $("#timer").text("Time remaining: " + timeRemaining);
    countdown();
    displayQuestion();
    showChoices();
});

$(document).on("click", ".choices", function() {
    userAnswer = $(this).attr("data-value");
    buttonClicked = true;
    if (buttonClicked === true) {
        stop();
    }
    checkAnswer();
});
$("#timer").on("click", function() {
    gameReset();
    $("#timer").text("Time remaining: " + timeRemaining);
    countdown();
    displayQuestion();
    showChoices();
});


});