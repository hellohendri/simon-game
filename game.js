var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameLevel = 0;
var gameStart = false;

$('.btn').click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress($('#' + userChosenColour));

    checkAnswer(userClickedPattern.length -1)
});

$(document).keypress(function () {
    if (!gameStart) {
        nextSequence();
        gameStart = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    gameLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = false;
}

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.random() * 3;
    var rounded = Math.round(randomNumber);

    var randomChosenColour = buttonColours[rounded];
    gamePattern.push(randomChosenColour);

    var lastValue = gamePattern[gamePattern.length - 1];
    $('#' + lastValue).fadeOut(150).fadeIn(150);

    playSound(lastValue);

    gameLevel++;
    $('#level-title').text('Level ' + gameLevel);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    currentColour.addClass("pressed");

    setTimeout(function () {
        currentColour.removeClass("pressed");
    }, 100);
}