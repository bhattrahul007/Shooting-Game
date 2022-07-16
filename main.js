const TOTAL_ROUNDS = 5;
var player1, player2, roundCounter;
var p1ScoreTable = document.getElementById("player-1-score");
var p2ScoreTable = document.getElementById("player-2-score");
var startGameBtn = document.getElementById("start-game-btn");
var gameResultBlock = document.getElementById("game-result");

init();

function roundScoreText(score){
    return ` - Won: ${score}`;
}

function generateRandomNumber(min = 0, max = 6){
    const rand = Math.floor(Math.random() * (max - min)) + min;
    return rand;
}

function gameOver(playerWon){
  const message = (playerWon == 1|| playerWon ==2 ) ?`Player ${playerWon} won the match` : "Game Draw";
  startGameBtn.disabled = true;
  startGameBtn.innerHTML = "Game Over"; 

  gameResultBlock.innerHTML = message;
}

function checkForHealthInvalidity(p1, p1){
  if(p1 <= 0 && p2 > 0) return 2;
  else if(p1 > 0 && p2 <= 0) return 1;
  else if(p1 <= 0 && p2<=0) return 3;
  
  return 0;
}

function checkForRoundInvalidity(p1, p2, roundCounter){
  let intermission = Math.floor(TOTAL_ROUNDS / 2) + 1;

  if (roundCounter < 5 && p1.score < intermission && p2.score < intermission) return 0;

  if(p1.score > p2.score) return 1;
  
  if(p2.score > p1.score) return 2;

  return 3;
}

function playRound(){
    roundCounter += 1;
    var damageGivenByP1 = generateRandomNumber();
    var damageGivenByP2 = generateRandomNumber();
    console.log(damageGivenByP1, damageGivenByP2);
    console.warn(player1, player2)

    if(damageGivenByP1 > damageGivenByP2) {
        p1ScoreTable.innerHTML = roundScoreText(player1.score + 1);
        player1.score = player1.score + 1;
    }

    if(damageGivenByP2 > damageGivenByP1) {
        p2ScoreTable.innerHTML = roundScoreText(player2.score + 1);
        player2.score = player2.score + 1;
    }

    if(damageGivenByP2>0) player1.health = player1.health - Math.pow(2, damageGivenByP2);
    if(damageGivenByP1>0) player2.health = player2.health - Math.pow(2, damageGivenByP1);

    let healthCheck = checkForHealthInvalidity(player1, player2);

    if(healthCheck){
      gameOver(healthCheck);
      return;
    }

    let roundCheck = checkForRoundInvalidity(player1, player2, roundCounter);

    if(roundCheck){
      gameOver(roundCheck);
      return;
    }

    startGameBtn.innerHTML = `Proceed  to round ${roundCounter + 1}`
}

function init(){
    player1 = {health: 100, score: 0};
    player2 = {health: 100, score: 0};
    roundCounter = 0;

    p1ScoreTable.innerHTML = roundScoreText(player1.score);
    p2ScoreTable.innerHTML = roundScoreText(player2.score);
    startGameBtn.innerHTML = "Start Game"
}

function destroy(){
  location.reload();
}
