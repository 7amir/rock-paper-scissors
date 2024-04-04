let score = JSON.parse(localStorage.getItem("score"));
const resultElem = document.querySelector(".result-elem");
// const movedElem = document.querySelector(".movedElem");
// const movedElem2 = document.querySelector(".movedElem2");
let totalPlay = document.querySelector(".totalPlay");
const totalPlayElem = document.querySelector(".total-play");
let imgMoveDiv = document.querySelector(".img-move");

function playGame(clientMove) {
  let computerMove = pickedComputerMove();
  let result = "";

  if (clientMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "Lose";
    } else if (computerMove === "Scissors") {
      result = "Win";
    }
  } else if (clientMove === "Paper") {
    if (computerMove === "Rock") {
      result = "Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "Lose";
    }
  } else if (clientMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "Lose";
    } else if (computerMove === "paper") {
      result = "Win";
    } else if (computerMove === "Scissors") {
      result = "Tie";
    }
  }

  // update score
  if (result === "Win") {
    score.Wins++;
  } else if (result === "Lose") {
    score.Losses++;
  } else if (result === "Tie") {
    score.Ties++;
  }

  score.Total++;

  updateElem();

  // save score in localStorage
  localStorage.setItem("score", JSON.stringify(score));

  function updateElem() {
    resultElem.innerHTML = result;
    showTotalPlay();
  }

  imgMove(computerMove, clientMove);
}

function ResetScore() {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  score.Total = 0;

  alert(`You reset the match`);

  resultElem.innerHTML = "Result";
  totalPlayElem.innerHTML = "You play 0 times";

  showTotalPlay();
}

function pickedComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber <= 1 / 3) {
    computerMove = "Rock";
  } else if (1 / 3 < randomNumber && randomNumber <= 2 / 3) {
    computerMove = "paper";
  } else if (2 / 3 < randomNumber && randomNumber <= 1) {
    computerMove = "Scissors";
  }

  return computerMove;
}

function imgMove(computerMove, clientMove) {
  const html = `
  <img src="/assets/img/${clientMove}.svg" alt="paper" class="user-img">
  <img src="/assets/img/${computerMove}.svg" alt="paper" class="computer-img">`;

  imgMoveDiv.innerHTML = html;
}

function showTotalPlay() {
  localStorage.setItem("score", JSON.stringify(score));
  totalPlayElem.innerHTML = `You play ${score.Total} times`;
  console.log(score.Total);
}

function init() {
  imgMove("Paper", "Rock");
  showTotalPlay();
}

init();
