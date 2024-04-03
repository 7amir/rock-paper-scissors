let score = JSON.parse(localStorage.getItem("score"));
const resultElem = document.querySelector(".resultElem");
const movedElem = document.querySelector(".movedElem");
const movedElem2 = document.querySelector(".movedElem2");
const inputCostElem = document.querySelector(".input-cost");
let totalCostElem = document.querySelector(".total-cost");
const todoListElem = document.querySelector(".input-todo-list");
let todoListArray = [];
const divRender = document.querySelector(".div-render");
let isAutoPlay = false;
let setIntervalId;
const btnAutoPlay = document.querySelector(".btn-auto-play");

function autoPlay() {
  let computerMove = pickedComputerMove();

  if (!isAutoPlay) {
    setIntervalId = setInterval(() => {
      playGame(computerMove);
    }, 1000);

    btnAutoPlay.innerHTML = "Stop play";
    isAutoPlay = true;
  } else {
    isAutoPlay = false;
    clearInterval(setIntervalId);
    btnAutoPlay.innerHTML = "Auto play";
  }
}

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

  // change bg to green, red or white
  if (result === "Win") {
    document.body.style.background = "green";
  } else if (result === "Lose") {
    document.body.style.background = "red";
  } else {
    document.body.style.background = "#fff";
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

    movedElem.innerHTML = `You picked ${clientMove}, computer picked ${computerMove}`;

    movedElem2.innerHTML = `Wins: ${score.Wins} Losses: ${score.Losses} Ties: ${score.Ties};
    you play ${score.Total} times`;
  }
}

function ResetScore() {
  score.Wins = 0;
  score.Losses = 0;
  score.Ties = 0;
  score.Total = 0;
  document.body.style.background = "#fff";

  alert(`You reset the match`);

  resultElem.innerHTML = "";
  movedElem.innerHTML = "";
  movedElem2.innerHTML = "";
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

function costFunc(event) {
  if (event.key === "Enter") {
    costSubmit();
  }
}

function costSubmit() {
  const inputValue = Number(inputCostElem.value) + 10;

  if (inputValue) {
    totalCostElem.innerHTML = `${inputValue}$`;
  } else {
    totalCostElem.innerHTML = `Please enter a number`;
  }
}

renderTodoList();

function renderTodoList() {
  let htmlTodo = "";

  for (let i = 0; i < todoListArray.length; i++) {
    const todoListContent = todoListArray[i];
    const html = `
      <p>
      ${todoListContent}
      <button onclick="removeBtn(${i})">Delete</button>
      </p>
      `;
    htmlTodo += html;
  }

  divRender.innerHTML = htmlTodo;
}

function todoListButton() {
  if (todoListElem.value) {
    todoListArray.push(todoListElem.value);
    todoListElem.value = "";

    renderTodoList();
  } else {
    alert("Enter your todo");
  }
}

function removeBtn(index) {
  todoListArray.splice(index, 1);

  renderTodoList();
}

// const [first, second] = [1, 2, 3];
// const listArray = [
//   { id: 1, name: "Mani", age: 18 },
//   { id: 2, name: "Sami", age: 35 },
//   { id: 3, name: "Amir", age: 22 },
// ];

// for (let i = 0; i < listArray.length; i++) {
//   const objectArray = listArray[i];
//   // console.log(objectArray.name);
//   const { name, age } = objectArray;
//   console.log(name);
//   console.log(age);
// }
