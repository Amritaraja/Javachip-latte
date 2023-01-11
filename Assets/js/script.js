// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

//Reference variables
var startButton = document.querySelector("#start-button");
var timer = document.querySelector("#timerCount");
var timeDisplay = document.querySelector("#timeDisplay");
var quizOver = document.querySelector("#quizOver");

var startSection = document.querySelector("#startSection");
var questionSection = document.querySelector("#questionSection");
var formSection = document.querySelector("#formSection");
var submitSection = document.querySelector("#submitSection");
var HighScoreSection = document.querySelector("#HighScoreSection");
var scoreList = document.getElementById("scoreList");


var questionTitle = document.querySelector("#questionTitle")
var description = document.querySelector("#description")
var answerList = document.querySelector("#answerList")


var answerA = document.getElementById("btn0");
var answerB = document.getElementById("btn1");
var answerC = document.getElementById("btn2");
var answerD = document.getElementById("btn3");
var answerIs = document.querySelector("#selection")
var correct = document.querySelector("#correct")
var wrong = document.querySelector("#wrong")

var score = document.getElementById("score");
var initials = document.getElementById("initials");


var viewScoreBtn = document.querySelector("#viewScoreBtn")
var submitBtn = document.getElementById("submitInitial");
var backBtn = document.getElementById("backBtn");
var clearBtn = document.getElementById("clearBtn");



// Other Variables
var timerCount;
var currentQuestion = 0;  // sets the order of questions
var currentScore = 0;


var questions = [
    {
        question: "1. What does DOM stand for?",
        choices: ["a. Dirty Old Mop", "b. Document Object Model", "c. Dying Old Man", "d. Data Organized Medgabytes"],
        answer: "b. Document Object Model"
    },
    {
        question: "2. Inside which HTML element do we put the JavaScript?",
        choices: ["a. <style>", "b. <java>", "c. <script>", "d. <src>"],
        answer: "c. <script>"
    },
    {
        question: "3. How do you create a function in JavaScript?",
        choices: ["a. function myFunction()", "b. var Function= true", "c. function: 'start'", "d. function = myFunction()"],
        answer: "a. function myFunction()"
    },
    {
        question: "4. What is the correct way to write a JavaScript array?",
        choices: ["a. var colors = ['red', 'green', 'blue']", "b. var colors = 'red', 'green', 'blue'", "c. var colors = ('red', 'green', 'blue')", "d. None of the Above"],
        answer: "a. var colors = ['red', 'green', 'blue']"
    },
    {
        question: "5. Which operator is used to assign a value to a variable?",
        choices: ["a. *", "b. -", "c. x", "d. ="],
        answer: "d. ="
    }
];

// FUNCTIONS

//Start game function
function startQuiz() {
    startSection.style.display = "none";
    questionSection.style.display = "block";
    currentQuestion = 0;
    HighScoreSection.style.display = "none";
    startTimer()
  }

// Timer Function
function startTimer() {
    timerCount = 90;
    timer.textContent = timerCount 
    // Sets interval in variable
    var timerInterval = setInterval(function() {
     timerCount--;
      timer.textContent = timerCount 
      if(timerCount <= 0) {
        clearInterval(timerInterval);
        if (currentQuestion < questions.length -1){
          endQuiz()
       }
      }
    }, 1000);
    showQuestion();
  }
  
  // for (iterator: testing condition: update the value of iterator)
  
  function showQuestion(){
    //Shows Question
    questionTitle.innerText = questions[currentQuestion].question;
    answerA.textContent = questions[currentQuestion].choices[0];
    answerB.textContent = questions[currentQuestion].choices[1];
    answerC.textContent = questions[currentQuestion].choices[2];
    answerD.textContent = questions[currentQuestion].choices[3];
  }

  function grade(answer) {
    // var divider = document.getElementById("divider");
    // divider.style.display = "block";
    answerIs.style.display = "block";

    if (questions[currentQuestion].answer == questions[currentQuestion].choices[answer]) {
      currentScore++;
      answerIs.textContent = "Correct, way to go!"
    }
    else{
      timerCount -= 10;
      timer.textContent = timerCount 
      answerIs.textContent = "Incorrect, 10 Seconds have been deducted! The correct answer was: " + questions[currentQuestion].answer;
    }
    console.log("You just answered question # " + (currentQuestion+1));
    // After question is answered increas the current question number
    currentQuestion++;
    // Repeat untill there are no more questions
    if (currentQuestion < questions.length) {
      showQuestion();
  } else {
      endQuiz();
      
  }
  console.log("Current score is: " + currentScore)
}

function endQuiz(){
  questionSection.style.display = "none";
  submitSection.style.display = "block";
  score.textContent = currentScore;
  timeDisplay.style.display = "none";
  quizOver.style.display = "block";
}

//Function to save score after gaem ends
function saveScore(event) {
  event.preventDefault();
  if (initials.value === ""){
    window.alert("Please enter your intitals to continue");
    return;
  }
  var saveScore = localStorage.getItem("Scores");
  var scoreList;


  if (saveScore === null) {
    scoreList = [];
} else {
    scoreList = JSON.parse(saveScore)
   }

  var playerScore = {
    initials: initials.value,
    score: currentScore
  };
  
console.log(playerScore);
scoreList.push(playerScore);

var scoreListString = JSON.stringify(scoreList);
window.localStorage.setItem("Scores", scoreListString);
console.log(scoreListString)

viewHighscore();
}

var i = 0;
function viewHighscore() {

  submitSection.style.display = "none";
  startSection.style.display = "none";
  HighScoreSection.style.display = "block";
 


  var saveScore = localStorage.getItem("Scores");

  if (saveScore === null) {
    // scoreList.textContent = "No scores to display, please save score after Quiz."
    return;
}

console.log(saveScore);

var storedScores = JSON.parse(saveScore);

for (; i < storedScores.length; i++) {
    var newScore = document.createElement("p");
    newScore.innerHTML = storedScores[i].initials + ": " + storedScores[i].score;
    scoreList.appendChild(newScore);
}
}

function selectA() { grade(0); }
function selectB() { grade(1); }
function selectC() { grade(2); }
function selectD() { grade(3); }


startButton.addEventListener("click", startQuiz);
answerA.addEventListener("click", selectA);
answerB.addEventListener("click", selectB);
answerC.addEventListener("click", selectC);
answerD.addEventListener("click", selectD);

submitBtn.addEventListener("click", saveScore);

viewScoreBtn.addEventListener("click", viewHighscore);

clearBtn.addEventListener("click", function(){
  window.localStorage.removeItem("Scores");
  scoreList.textContent = "Quiz scores erased!"
});

backBtn.addEventListener("click", function(){
  startSection.style.display = "block";
  HighScoreSection.style.display = "none";
});


// Shows what the answer the player selected in the console log
answerA.addEventListener('click', function(event) {
  console.log("[" + event.target.textContent + "] was slected");
})
answerB.addEventListener('click', function(event) {
  console.log("[" + event.target.textContent + "] was slected");
})
answerC.addEventListener('click', function(event) {
  console.log("[" + event.target.textContent + "] was slected");
})
answerD.addEventListener('click', function(event) {
  console.log("[" + event.target.textContent + "] was slected");
})




