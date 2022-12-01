// var  userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;
function nextSequence(){
  userClickedPattern = [];
var randomNumber=Math.floor(Math.random()*4);
var randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
playSound(randomChosenColor);
$("#"+randomChosenColor).fadeOut().fadeIn();
level++;
$("#level-title").text("Level " + level);
}

$(".btn").click(function(){
 var userChosenColor=$(this).attr("id");
 userClickedPattern.push(userChosenColor);
 playSound(userChosenColor);
 animatePress(userChosenColor);
 var pattern=userClickedPattern.length-1;
checkAnswer(pattern);
})
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
function animatePress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function(){
      $("#"+currentcolor).removeClass("pressed");
  },100)
}
$(document).keypress(function(){
  if(!started){
    $("#level-title").html("level "+level);
    nextSequence();
    started=true;

  }
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
}
else{
  var audio = new Audio("sounds/wrong.mp3");
    audio.play();
$("#level-title").html("Game over, press any key to restart");
$("body").addClass("game-over");
setTimeout(function(){
  $("body").removeClass("game-over");
},200);
startOver();

}

}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;

}
