//On page open, start button in body to be replaced by quiz, start button prompts timer to begin

//global variables
var timeEl = document.querySelector(".time");
var start = document.getElementById("startBtn");
var startDiv = document.getElementById("startDiv");
var quizDiv = document.getElementById("quizDiv");
var correct = document.getElementById("correct");
var endScore = document.getElementById("endScore");
var highScore = document.getElementById("highScores");
var highList = document.getElementById("highList");
var btn1 = document.getElementById("C1");
var btn2 = document.getElementById("C2");
var btn3 = document.getElementById("C3");
var btn4 = document.getElementById("C4");
var choiceBtn = document.querySelectorAll(".choiceBtn");
var choiceButton = document.querySelectorAll(".choiceBtn");
var timerInterval;
var submit = document.querySelector(".submitBtn");
var clear = document.querySelector(".clearBtn");
var scores = [];

//question objects
var Q1 = {
  qNumber: "Question 1",
  question: "Which is a value of a boolean?",
  C1: "Yes",
  C2: "True",
  C3: "Undefined",
  C4: "var i = 0",
  answer: "C2",
}
var Q2 = {
  qNumber: "Question 2",
  question: "In the array var cats = ['Meow', 'Claws', 'Hairball', 'Purr'], which index is Hairball?",
  C1: "1",
  C2: "2",
  C3: "3",
  C4: "4",
  answer: "C2",
}
var Q3 = {
  qNumber: "Question 3",
  question: "Which of the following is the assignment operator?",
  C1: "is",
  C2: "===",
  C3: "i++",
  C4: "=",
  answer: "C4",
}
var Q4 = {
  qNumber: "Question 4",
  question: "Which of the following is a JavaScript best practice.",
  C1: "Always use global variables.",
  C2: "Declare variables at the bottom of the script.",
  C3: "Use === Comparison rather than ==.",
  C4: "Always alphabetize your code.",
  answer: "C3",
}
var Q5 = {
  qNumber: "Question 5",
  question: "Which of the following is a type of loop?",
  C1: "for",
  C2: "for/in",
  C3: "do/while",
  C4: "All of the above.",
  answer: "C4",
}
var Q6 = {
  qNumber: "Question 6",
  question: "What does === mean?",
  C1: "equal value and equal type",
  C2: "equal to",
  C3: "greater than",
  C4: "not equal value or not equal type",
  answer: "C1",
}

//global var dependant on above objects must be below to function
var questionsArray = [Q1, Q2, Q3, Q4, Q5, Q6];
var secondsLeft = questionsArray.length * 15;
var questionIndex = 0;

//function for timer
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds remaining";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
      endQuiz();
    }

  }, 1000);
}

function sendMessage() {
  timeEl.textContent = "Time's Up!";
}

function hideCorrect() {
  correct.textContent = " ";
}

//on click start button, start time and quiz
function startQuiz() {
  setTime();
  quizDisplay();
  startDiv.className = "invisible"
  startDiv.style = "display:none";
  quizDiv.classList.remove("invisible");
  quizDiv.className = "visible";
}

//function to display each question in quiz
function quizDisplay() {

  document.getElementById("Q").innerHTML = questionsArray[questionIndex].qNumber + ": " + questionsArray[questionIndex].question;
  document.getElementById("C1").innerHTML = questionsArray[questionIndex].C1;
  document.getElementById("C2").innerHTML = questionsArray[questionIndex].C2;
  document.getElementById("C3").innerHTML = questionsArray[questionIndex].C3;
  document.getElementById("C4").innerHTML = questionsArray[questionIndex].C4;

}

//find which button is selected
for (var i = 0; i < choiceBtn.length; i++) {
  choiceBtn[i].addEventListener("click", choices);
}

function choices() {
  var btnId = this.getAttribute("id");
  isCorrect(btnId);
  questionIndex++;
  if (questionIndex <= questionsArray.length - 1) {
    quizDisplay();
  }
  else {
    endQuiz();
    timeEl.className = "invisible";
  }
}

//function for if selected button is correct or incorrect answer
function isCorrect(btnId) {

  if (btnId == questionsArray[questionIndex].answer) {
    correct.textContent = "CORRECT!";

  }
  else {
    correct.textContent = "Incorrect...";

    if (secondsLeft > 15) {
      secondsLeft = secondsLeft - 15;
    }
    else {
      endQuiz();
    }

  }

  //clear correct/incorrect message after one second
  setTimeout(hideCorrect, 1000);

}



//Close quiz div and see final score (time is up or all questions answered)
function endQuiz() {
  quizDiv.classList.remove("visible");
  quizDiv.className = "invisible";
  quizDiv.style = "display:none";
  endScore.classList.remove("invisible");
  endScore.classList.className = "visible";
  document.getElementById("finalScore").textContent = secondsLeft;

}

//push score and name to local storage
function logHighScore() {
  localStorage.setItem("scores", JSON.stringify(secondsLeft + " - " + document.querySelector(".nameEntered").value));
}

//Get scores out of local storage & add to ul
function renderScores() {
  highList.innerHTML = "";
  
  for (var i = 0; i < scores.length; i++) {
    var score = scores[i];
    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);
  }

}

//View high score list
function highScores() {
  //on submit, log high score to local storage
  logHighScore();

  //clear area and make high score list visible
  endScore.classList.remove("visible");
  endScore.className = "invisible";
  endScore.style = "display:none";
  highScore.classList.remove("invisible");
  highScore.classList.className = "visible";

  //pull local storage scores and add them to the list of high scores
  var storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    scores = storedScores;
  }

  renderScores();
}


//Click submit to log and display high scores
submit.addEventListener("click", highScores);


//Clear scores button
function clearS() {
  localStorage.clear();
  highList.innerHTML = "";
}

clear.addEventListener("click", clearS);


//Start button for quiz
start.addEventListener("click", startQuiz);

