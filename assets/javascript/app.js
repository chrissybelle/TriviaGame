$(document).ready(function() {
// V A R I A B L E S 
var timeRemaining = 10;
var interval;
var questionCounter = 0;
var questions = ["If something is 'lit,' it means..", 
"What's another way to say you want to know the latest gossip?",
"How would you describe someone who is upset or bitter?",
"Mary has been sneaking off to the other room whenever her phone rings. She's so ____",
"If someone says you look ratchet, it means",
"If someone cut off all communication with you, they are",
"Name another word for doing all the boring stuff that grownups do",
"What abbreviation is used to add emphasis?",
"What milennial slang is used to address your friends?",
"What you say when you're absolutely certain about something:"
];
var answerChoices = [["It's bright", "It's amazing, awesome, or crazy", "It's boring", "It's funny"],["Stay woke", "Clap back", "Spill the tea", "FOMO"],["Salty","Bitter","Sour","Sweet"],["Thirsty","On fleek","Bae","Sus"],["You look hot","You look sad","You look like a mess","You look old"],["ghosting you","being extra","throwing shade","draking"],["Turning up","Grown-upping","Adulting","Bae"],["YAS","JOMO","TFW","AF"],["Goals","Fam","Circle","Group"],["Perf","TBH","Hundo P","Thouso P"]];
var correctAnswers = ["It's amazing, awesome, or crazy", "Spill the tea", "Salty", "Sus", "You look like a mess", "ghosting you", "Adulting", "AF", "Fam","Hundo P"];
var userAnswer;
var correctGuesses = 0;
var incorrectGuesses = 0;
var unanswered = 0;
var buttonClicked = false;
var waitTime = 3000;
var imageArrayWinner = [
    "assets/images/win.gif",
    "assets/images/win1.gif",
    "assets/images/win2.gif",
    "assets/images/win3.gif"
];
var imageArrayLoser = [
    "assets/images/lose.gif",
    "assets/images/lose1.gif",
    "assets/images/lose2.gif",
    "assets/images/lose3.gif"
];
var resultMessage;
var resultImage;


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
        loseImage();
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
        $("#question").text("SLAYYYY!");
        correctGuesses++;
        displayNextQA();
        winImage();
    } else {
        $("#question").text("I CAN'T EVEN...");
        displayAnswer();
        displayNextQA();
        loseImage();
        incorrectGuesses++;
    }
}
//display correct answer
function displayAnswer() {
    $("#feedback").html("<span class='answerFeedback'>The correct answer was:</span><br><br><span class='answer'>" + correctAnswers[questionCounter] + "</span>");
}
//display image feedback
function winImage() {
    randomNum = Math.floor(Math.random()*imageArrayWinner.length);
    $("#imageFeedback").html("<img src=" + imageArrayWinner[randomNum] + ">");
    setTimeout(resetImg, waitTime);
}
function loseImage() {
    randomNum = Math.floor(Math.random()*imageArrayLoser.length);
    $("#imageFeedback").html("<img src=" + imageArrayLoser[randomNum] + ">");
    setTimeout(resetImg, waitTime);
}
//clear previous answer buttons
function clearChoices() {
    $("#choices").empty();
}
//clear feedback
function clearFeedback() {
    $("#feedback").empty();
}
//clear image feedback
function resetImg() {
    $("#imageFeedback").empty();
}

//pause for 3 seconds, then display next set of Q&A
function displayNextQA(){
    if (questionCounter < questions.length - 1) {
        clearChoices();
        setTimeout(reset, waitTime);
        setTimeout(displayQuestion, waitTime);
        setTimeout(showChoices, waitTime);
    } else {
        stop();
        clearChoices();
        setTimeout(playAgain, waitTime);
    }
}
//reset for next question
function reset() {
    timeRemaining = 10;
    $("#timer").text("Time remaining: " + timeRemaining);
    clearFeedback();
    countdown();
    questionCounter++;
    buttonClicked = false;
}
//end game feedback
function feedback() {
if (correctGuesses > incorrectGuesses && correctGuesses > unanswered) {
    resultMessage = "OMG YASSSS SLAYYY! YOU'RE A HUNDO P WOKE AF, FAM!";
} else {
    resultMessage = "SMH..Low-key shook.";
}
}
//play again
function playAgain() {
    $("#timer").html("<button id='startOver'>Play again?</button>");
    $("#question").html("<span class='answerFeedback'>Here's how you did:</span>");
    feedback();
    $("#feedback").html("Correct: " + correctGuesses + "<br>Incorrect: " + incorrectGuesses + "<br>Unanswered: " + unanswered + "<br><br>" + resultMessage).attr("class", "answerFeedback");
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
    timeRemaining = 10;
}

// E V E N T S

//on click start button
$("#start").on("click", function() {
    $("#start").hide();
    $("#timer").text("Time remaining: " + timeRemaining);
    countdown();
    displayQuestion();
    showChoices();
});

//on click answer choice
$(document).on("click", ".choices", function() {
    userAnswer = $(this).attr("data-value");
    buttonClicked = true;
    if (buttonClicked === true) {
        stop();
    }
    checkAnswer();
});


//on click re-play button
$("#timer").on("click", function() {
    gameReset();
    $("#timer").text("Time remaining: " + timeRemaining);
    countdown();
    displayQuestion();
    showChoices();
    clearFeedback();
    resetImg();
});


});