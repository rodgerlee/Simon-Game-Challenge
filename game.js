var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var gameStarted = false;


$(document).keydown(function() {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePatternd.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {  
        playSound("wrong");
        $("body").addClass("game-over").delay(200).queue(function(next) {
            $(this).removeClass("game-over");
            next();
        });
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed").delay(100).queue(function(next) {
        $(this).removeClass("pressed");
        next();
    });

}

function playSound(name) {
    var sound = new Audio("sounds/" + name +  ".mp3")
    sound.play();
}





