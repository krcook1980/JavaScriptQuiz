//On page open, start button in body to be replaced by quiz, start button prompts timer to begin


//global variables
var timeEl = document.querySelector(".time");
var start = document.getElementById("startBtn");
var startDiv = document.getElementById("startDiv");
var quizDiv = document.getElementById("quizDiv");
var correct = document.getElementById("correct");
var endScore = document.getElementById("endScore");
var highScore = document.getElementById("highScore");
var btn1 = document.getElementById("C1");
var btn2 = document.getElementById("C2");
var btn3 = document.getElementById("C3");
var btn4 = document.getElementById("C4");
var choiceBtn = document.querySelectorAll(".choiceBtn");
var choiceButton = document.querySelectorAll(".choiceBtn");
var timerInterval;
var submit = document.querySelector(".submitBtn");
var clear = document.querySelector(".clearBtn");

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

//global var dependant on above objects
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

//toggle start div to quiz div
function visible() {
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
  if (questionIndex <= questionsArray.length-1){
  quizDisplay();
  }
  else{
    endQuiz();
    timeEl.className = "invisible";
  }
}
//function for if selected button is correct answer
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
  
  //stop timer and pause to show if correct before moving on to next question
  setTimeout(hideCorrect, 1000);
 
}
//if time is up or all questions answered, score with box

//scoring mechanism time at end, send to local storage
function endQuiz() {
  quizDiv.classList.remove("visible");
  quizDiv.className = "invisible";
  quizDiv.style = "display:none";
  endScore.classList.remove("invisible");
  endScore.classList.className = "visible";
  document.getElementById("finalScore").textContent = secondsLeft;
  //Option to enter name when finished to store on leader board
  //get class nameEntered and log to local storage with score
}

//on click start button, start time and quiz
function startQuiz() {
  setTime();
  quizDisplay();
  visible();
}

function logHighScore() {
  localStorage.setItem("name", document.querySelector(".nameEntered").value);
  localStorage.setItem("score", secondsLeft);
  
}


//SCORE JS
function highScores() {
  logHighScore();
  endScore.classList.remove("visible");
  endScore.className = "invisible";
  endScore.style = "display:none";
  highScore.classList.remove("invisible");
  highScore.classList.className = "visible";
  var retrieve = localStorage.getItem("name");
  document.querySelector("#logHigh").textContent=retrieve;  

}

function clearS () {
  localStorage.clear();
}

clear.addEventListener("click",clearS);
submit.addEventListener("click", highScores);
start.addEventListener("click", startQuiz);

//leader board with clear option