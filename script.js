//countdown timer ... 30 second quiz
//On page open, start button in body to be replaced by quiz, start button prompts timer to begin
var timeEl = document.querySelector(".time");


var secondsLeft = 30;

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds remaining";

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

function sendMessage() {
  timeEl.textContent = "Time's Up!";

  var imgEl = document.createElement("img");

  imgEl.setAttribute("src", "images/image_1.jpg");
  mainEl.appendChild(imgEl);

}
//on click start button, start time
document.getElementById("startBtn").addEventListener("click", setTime());


//options to choose from on the buttons

var Q1 = {
    qNumber: "question1",
    question: "Which is a value of a boolean?",
    C1: "Yes",
    C2: "True",
    C3: "Undefined",
    C4: "var i = 0",
    answer: "C2",
}
var Q2 = {
    qNumber: "question2",
    question: "In the array var cats = ['Meow', 'Claws', 'Hairball', 'Purr'], which index is Hairball?",
    C1: "1",
    C2: "2",
    C3: "3",
    C4: "4",
    answer: "C2",
}
var Q3 = {
    qNumber: "question3",
    question: "Which of the following is the assignment operator?",
    C1: "is",
    C2: "===",
    C3: "i++",
    C4: "=",
    answer: "C4",
}
var Q4 = {
    qNumber: "question4",
    question: "Which of the following is a JavaScript best practice.",
    C1: "Always use global variables.",
    C2: "Declare variables at the bottom of the script.",
    C3: "Use === Comparison rather than ==.",
    C4: "Always alphabetize your code.",
    answer: "C3",
}
var Q5 = {
    qNumber: "question5",
    question: "Which of the following is a type of loop?",
    C1: "for",
    C2: "for/in",
    C3: "do/while",
    C4: "All of the above.",
    answer: "C4",
}
var Q6 = {
    qNumber: "question6",
    question: "What does === mean?",
    C1: "equal value and equal type",
    C2: "equal to",
    C3: "greater than",
    C4: "not equal value or not equal type",
    answer: "C1",
}


//questions to populate - array

var questionsArray = [Q1, Q2, Q3, Q4, Q5, Q6];

//show correct or wrong with selection ... can we figure out associated sound effects to go with this?

//scoring mechanism ... number answered correct + time remaining on the clock stored in local storage

//Option to enter name when finished to store on leader board

//leader board with clear option

