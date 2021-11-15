// Welcome Section
var timerEl = document.getElementById("countdown");


function welcome(){
    var startEl = document.createElement("button");
    var welcomeTitle = document.createElement("h2");
    var welcomeP = document.createElement("p");
    var welcomeEl = document.querySelector("#welcome");
    startEl.setAttribute("id", "start")
    welcomeTitle.textContent = "Code Quiz Challenge"
    welcomeP.textContent ="Try to answer the following code-related questions within the itme limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    startEl.textContent = "Start Quiz"
    timerEl.textContent = "Timer: 0"

    welcomeEl.appendChild(welcomeTitle);
    welcomeEl.appendChild(welcomeP);
    welcomeEl.appendChild(startEl);
// Attach event listener to quiz start button
    startEl.addEventListener("click", function() {
        // click the start button to show questions and start countdown
        welcomeEl.innerHTML= "";
        timeLeft = 60;
        i = 0;
        score = 0;
        
        questions();
        countdown();
      });
}

welcome();



// Timer

function countdown(){
    var timeInterval = "";
    timeInterval = setInterval(function(){
        if (i === questionSt.length){
            clearInterval(timeInterval);
            return
        }
        else if (timeLeft > 0){
            timerEl.textContent = "Timer: " + timeLeft;
            timeLeft--
            // console.log(timeLeft)
        }
        else {
            timerEl.textContent = "Timer: " + timeLeft;
            clearInterval(timeInterval);
            // show results when time countdown reaches 0
            finalResult()
        }
    },1000);
}



// Questions

// Question elements
var questionContentEl = document.getElementById("questionContent");
var questionEl = document.createElement("h2");
var listEl = document.createElement("ol");
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");
var answerEl = document.createElement("p");

// Questions and choices
var question1 = "Commonly used data types DO Not Include: "
var choice1 = "strings"; var choice2 = "booleans"; var choice3 = "alerts"; var choice4 = "numbers";

var question2 = "Arrays in JavaScript can be used to store _________."
var choice5 = "numbers and strings"; var choice6 = "other arrays"; var choice7 = "booleans"; var choice8 = "all of the above";

var question3 = "A very useful tool used during dvelopment and debugging for printing content to the debugger is:"
var choice9 = "JavaScript"; var choice10 = "terminal/bash"; var choice11 = "for loops"; var choice12 = "console.log"
var questionSt = [question1, question2, question3];
var questionCh = [choice1, choice2, choice3, choice4, choice5, choice6, choice7, choice8, choice9, choice10, choice11, choice12];
var correctAns = ["alerts", "all of the above", "console.log"];
var score = 0;
var i=0;
var timeLeft = 60;
console.log(questionSt.length);

function answerCallback(evt) {
    var liEl = evt.target;
    if (liEl.textContent === correctAns[i]){
        answerEl.textContent = "Correct!"
        score = score + 20;
    }
    else {
        answerEl.textContent = "Wrong!"
        score = score - 10;
        timeLeft = timeLeft - 10;
    }
    
    liEl.removeEventListener('click', answerCallback);
    i = i + 1;
    questions();
}

function questions(){
    console.log(i)
    console.log(score)
    if (i < questionSt.length){
        questionContentEl.appendChild(questionEl);
        questionContentEl.appendChild(listEl);
        questionContentEl.appendChild(answerEl);

        listEl.appendChild(li1);
        listEl.appendChild(li2);
        listEl.appendChild(li3);
        listEl.appendChild(li4);

        
        questionEl.textContent = questionSt[i];
        li1.textContent = questionCh[4*i];
        li2.textContent = questionCh[4*i+1];
        li3.textContent = questionCh[4*i+2];
        li4.textContent = questionCh[4*i+3];

        li1.addEventListener("click", answerCallback)

        li2.addEventListener("click", answerCallback)

        li3.addEventListener("click", answerCallback)

        li4.addEventListener("click", answerCallback)   
    }
    else{
        questionEl.textContent = "";
        li1.textContent = "";
        li2.textContent = "";
        li3.textContent = "";
        li4.textContent = "";
        answerEl.textContent = "";
        finalResult();
    }   
}

// Final Result Display
var resultEl = document.querySelector("#final-result")
userScore = []; //Create Array to store user scores
function finalResult(){
    questionContentEl.innerHTML = "";
    var endingEl = document.createElement("h2");
    endingEl.textContent = "All Done!"
    var resultSt = document.createElement('p');
    var initial = document.createElement('div');
    var initialLabel = document.createElement('label')
    var initialInput = document.createElement('input')
    resultSt.textContent = "Your Final Score is: " + score;
    resultEl.appendChild(resultSt);
    resultEl.appendChild(initial);
    initial.appendChild(initialLabel);
    initial.appendChild(initialInput);
    initialLabel.textContent = "Please enter your initial: "
    initialInput.setAttribute("id", "player-initial")
    var submitButton = document.createElement('button');
    resultEl.appendChild(submitButton);
    submitButton.textContent = "Submit";

    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
    
        console.log(initialInput.value);
        playerInitial = initialInput.value;
        
        var user = {
            initial: initialInput.value.trim(),
            playerScore: score
          };
        userScore.push(user);
        // set new submission to local storage 
        localStorage.setItem("userScore", JSON.stringify(userScore));
        scoreBoard();
      });
}  

// High Scores
var scoreEl = document.querySelector("#high-score");

function scoreBoard(){
    resultEl.innerHTML = "";
    // endingEl.textContent = "";
    // resultSt.textContent = "";
    // initialLabel.textContent = "";
    // submitButton.textContent = "";
    var scoreTitle = document.createElement("h2");
    var backButton = document.createElement("button");
    var clearButton = document.createElement("button");
    var scoreList = document.createElement("ol");
    // var nameList = document.createElement("li");
    userScore = localStorage.getItem("userScore");
    userScore = JSON.parse(userScore);
    console.log(userScore);

    scoreTitle.textContent = "High scores";
    backButton.textContent = "Go back";
    clearButton.textContent = "Clear high scores";

    scoreEl.appendChild(scoreTitle);
    scoreEl.appendChild(scoreList);
    scoreEl.appendChild(backButton);
    scoreEl.appendChild(clearButton);
    // scoreList.appendChild(nameList);
    for (i=0;i<userScore.length;i++){
        var li= document.createElement("li");
        li.textContent = userScore[i].initial + " - " + userScore[i].playerScore;
        scoreList.appendChild(li);
    }

    backButton.addEventListener("click",function(){
        scoreEl.innerHTML = "";
        welcome();
    });
    clearButton.addEventListener("click", function(){
        scoreList.innerHTML = "";
        userScore = []; 
        localStorage.setItem("userScore", JSON.stringify(userScore));//clear local storage;
    })
}
