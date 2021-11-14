// Welcome Section
var startEl = document.querySelector("#start");
var welcomeEl = document.querySelector("#welcome");
// Attach event listener to quiz start button
startEl.addEventListener("click", function() {
    // click the start button to show questions and start countdown
    welcomeEl.innerHTML= "";
    questions();
    countdown();
  });


// Timer
var timerEl = document.getElementById("countdown");

function countdown(){
    // var timeLeft = 5;
    var timeInterval = setInterval(function(){
        if (timeLeft > 0){
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

var questionSt = ["question1", "question2", "question3"];
var questionCh = ["choice1", "choice2", "choice3", "choice4", "choice5", "choice6", "choice7", "choice8", "choice9", "choice10", "choice11", "choice12"];
var correctAns = ["choice1", "choice6", "choice11"];
var score = 0;
var i=0;
var timeLeft = 99999;
console.log(questionSt.length);

function answerCallback(evt) {
    var liEl = evt.target;
    if (liEl.textContent == correctAns[i]){
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
        finalResult();
    }   
}

// Final Result Display
function finalResult(){
    questionEl.textContent = "All Done!"
    listEl.innerHTML = "";
    answerEl.textContent = "";
    var resultSt = document.createElement('p');
    var initial = document.createElement('div');
    resultSt.textContent = "Your Final Score is: " + score;
    questionContentEl.appendChild(resultSt);
}                