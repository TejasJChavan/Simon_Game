var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  $("#" + userChosenColour).toggleClass("pressed");
  setTimeout(function () {
    $("#" + userChosenColour).toggleClass("pressed");
  }, 100);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentIndex) {
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    console.log("sucess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    new Audio("./sounds/wrong.mp3").play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").toggleClass("game-over");
    setTimeout(function () {
      $("body").toggleClass("game-over");
    }, 300);
    startOver();
  }
}

function playSound(color) {
  new Audio("./sounds/" + color + ".mp3").play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var rng = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[rng];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).keydown(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});
