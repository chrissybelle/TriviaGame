$(document).ready(function() {
// V A R I A B L E S 
var timeRemaining = 10;
var interval;
var intervalCount = 0;
var intervalChange = true;
var questions = ["who?","why?","where?","what?"];
var choices = [["him","because","there","idk"],["q2a","q2b","q2c","q2d"]];
var correctAnswers = ["A", "C"];
// var indexOfCorrectAnswers = [];
var correct;
var userAnswer;

// F U N C T I O N S
//stores index positions of correct answers within the choices array
// for (var i = 0; i < choices.length; i++) {
//     indexOfCorrectAnswers[i] = choices[i].indexOf[correctAnswers[i]];
//     }
//decrements time remaining by 1
function decrement() {
    timeRemaining--;
    $("#timer").text("Time Remaining: " + timeRemaining);
}
//runs decrement function every second
function countDown() {
    interval = setInterval(decrement, 1000);
}
//if user runs out of time or answers correctly/incorectly, this function will stop the clock, reset it, and keep track of the question #
function stop() {
    clearInterval(interval);
    timeRemaining = 10;

}
//displays current question
function showQuestion() {
    $("#question").text(questions[intervalCount]);
}
//displays current answer choices
function showChoices() {
    $("#choices").html("<button class='A'>"+choices[intervalCount][0]+"</button><button class='B'>"+choices[intervalCount][1]+"</button><button class='C'>"+choices[intervalCount][2]+"</button><button class='D'>"+choices[intervalCount][3]+"</button>");
}
//checks if user's choice is correct
function checkAnswer() {
    if (correctAnswers.indexOf(userAnswer) >= 0) {
        correct = true;
        correctAnswer();
    } else {
        correct = false;
        incorrectAnswer();
    }
}
//displays correct answer feedback
function correctAnswer() {
    $("#question").text("CORRECT!");
    $("."+indexOfCorrectAnswers[intervalCount]).addClass("correctAnswer");
}
//displays incorrect answer feedback
function incorrectAnswer() {
    $("#question").text("WRONG!");
    $("#choices").html(correctAnswer[intervalCount-1]);

}
while (intervalChange = false) {

}
// E V E N T S

//on start button click, begin timer countdown, show first question
$("#start").on("click", function() {
    $("#start").hide();
    countDown();
    showQuestion();
    showChoices();
    $("#timer").text("Time Remaining: " + timeRemaining);
    $("#question").text();
    $("#choices").text();
    intervalChange = false;
    //stops timer at 0
    if (timeRemaining === 0) {
    stop();
    console.log(intervalCount);
    showQuestion();
    }
});

$("#choices").on("click", function() {
    userAnswer = $(this).attr("class");
    console.log(userAnswer);
    checkAnswer();
    console.log(intervalCount);
        //if answer is correct
        if (correct === true) {
            stop();
            correctAnswer();
        } else if (correct === false) {
            stop();
            incorrectAnswer();
        }
    intervalCount++; //take out of this function?
});



});