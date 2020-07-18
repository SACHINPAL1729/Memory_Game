var buttonColor = ["red","blue","green","yellow"];
var randomChosenColor;
var gamePattern=[];
var userClickedPattern =[];
// User Click
$(".btn").click(function(){
  var UserChosenColor = $(this).attr("id");
  userClickedPattern.push(UserChosenColor);
  playSound(UserChosenColor);
  animatePress(UserChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
// js executes expression in order of their appereance.
// next Sequence
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Keyboard pressed
var start = false;
var level = 0;
$(document).keydown(function(){
  if(start == false){
    $("#level-title").text("Level "+level);
    nextSequence();
    start = true;
  }
})

// Check checkAnswer
function checkAnswer(currentLevel){
      if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
        console.log("sucess");
        setTimeout(function(){
          nextSequence();
        },1000);
        }
      }else{
        console.log("false");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any Key to restart");
        restart();
      }
}

// FUNCTIONS//

// restart game
function restart(){
  start = false;
  level = 0;
  gamePattern = [];
}
// playSound function
function playSound(name){
  var audio = new  Audio('sounds/'+name+'.mp3');
  audio.play();
}

// animate function
function animatePress(currentColour){
      $("#"+currentColour).addClass("pressed");
      setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
      },100);
}
